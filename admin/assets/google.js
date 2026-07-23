// ==========================================================================
// ROTA CDE TRANSFER - GOOGLE CALENDAR API INTEGRATION
// ==========================================================================

const GOOGLE_DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const GOOGLE_SCOPES = 'https://www.googleapis.com/auth/calendar.events';

let tokenClient;
let gapiInited = false;
let gisInited = false;

// Carrega as chaves do Google salvas nas Configurações
function getGoogleConfig() {
    const config = localStorage.getItem('rota_google_config');
    if (config) {
        try {
            return JSON.parse(config);
        } catch (e) {}
    }
    return { clientId: "", apiKey: "" };
}

// Inicializa a GAPI (Google API Client)
function gapiLoad() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    const config = getGoogleConfig();
    if (!config.apiKey) return;
    
    try {
        await gapi.client.init({
            apiKey: config.apiKey,
            discoveryDocs: [GOOGLE_DISCOVERY_DOC],
        });
        gapiInited = true;
        checkGoogleAuthStatus();
    } catch (err) {
        console.error("Erro ao inicializar GAPI Client:", err);
    }
}

// Inicializa o GIS (Google Identity Services) para OAuth 2.0
function gisLoad() {
    const config = getGoogleConfig();
    if (!config.clientId) return;

    try {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: config.clientId,
            scope: GOOGLE_SCOPES,
            callback: (resp) => {
                if (resp.error !== undefined) {
                    console.error("Erro na autenticação do Google:", resp);
                    alert("Erro ao conectar Google Agenda:\n" + (resp.error_description || resp.error || JSON.stringify(resp)));
                    return;
                }
                // Salva o token de acesso no localStorage
                localStorage.setItem('gcal_access_token', JSON.stringify({
                    token: resp.access_token,
                    expiresAt: Date.now() + (resp.expires_in * 1000)
                }));
                if (typeof gapi !== 'undefined' && gapi.client) {
                    gapi.client.setToken({ access_token: resp.access_token });
                }
                checkGoogleAuthStatus();
                alert("✅ Google Agenda conectado com sucesso!");
            },
        });
        gisInited = true;
        checkGoogleAuthStatus();
    } catch (err) {
        console.error("Erro ao inicializar GIS Token Client:", err);
    }
}

// Verifica se existe um token ativo e atualiza a interface
function checkGoogleAuthStatus() {
    const tokenDataStr = localStorage.getItem('gcal_access_token');
    const btn = document.getElementById('connect-google-btn');
    const statusText = document.getElementById('google-status-text');

    if (tokenDataStr) {
        try {
            const tokenData = JSON.parse(tokenDataStr);
            if (Date.now() < tokenData.expiresAt) {
                // Token válido!
                if (typeof gapi !== 'undefined' && gapi.client) {
                    gapi.client.setToken({ access_token: tokenData.token });
                }
                if (btn) {
                    btn.innerText = "Google Agenda Conectado ✓";
                    btn.classList.add('btn-success');
                }
                if (statusText) statusText.innerText = "Status: Conectado e Sincronizando.";
                return true;
            }
        } catch (e) {}
    }

    // Desconectado
    if (btn) {
        btn.innerText = "Conectar Google Agenda";
        btn.classList.remove('btn-success');
    }
    if (statusText) statusText.innerText = "Status: Desconectado.";
    return false;
}

// Ação de Clique para Conectar/Autorizar
function handleGoogleAuthClick() {
    const config = getGoogleConfig();
    if (!config.clientId || !config.apiKey) {
        alert("Por favor, preencha e salve o Client ID e a API Key do Google primeiro nas Configurações!");
        return;
    }

    if (typeof google === 'undefined' || typeof google.accounts === 'undefined') {
        alert("Os serviços do Google ainda estão carregando. Por favor, aguarde alguns segundos e clique novamente.");
        setupGoogleCalendarClient();
        return;
    }

    if (!tokenClient) {
        gisLoad();
    }

    if (!tokenClient) {
        alert("Não foi possível inicializar o cliente Google OAuth. Verifique se o Client ID é válido.");
        return;
    }

    try {
        const hasToken = (typeof gapi !== 'undefined' && gapi.client && gapi.client.getToken && gapi.client.getToken() !== null);
        if (!hasToken) {
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            tokenClient.requestAccessToken({ prompt: '' });
        }
    } catch (err) {
        console.error("Erro ao abrir janela de login do Google:", err);
        alert("Erro ao iniciar login do Google: " + err.message);
    }
}

// Desconectar Google Agenda
function handleGoogleSignout() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token, () => {
            gapi.client.setToken('');
            localStorage.removeItem('gcal_access_token');
            checkGoogleAuthStatus();
        });
    } else {
        localStorage.removeItem('gcal_access_token');
        checkGoogleAuthStatus();
    }
}

// Sincronizar Viagem com Google Agenda
async function syncEventToGoogleCalendar(viagem) {
    if (!checkGoogleAuthStatus()) {
        console.log("Google Agenda não conectado. Pulando sincronização.");
        return;
    }

    // Calcula duração estimada baseado no tipo de serviço
    let durationHours = 1.5; // Padrão
    if (viagem.tipoServico.includes('4h')) durationHours = 4.5;
    else if (viagem.tipoServico.includes('6h')) durationHours = 6.5;
    
    const startHourStr = viagem.horario; // ex: "14:30"
    const [h, m] = startHourStr.split(':').map(Number);
    
    // Calcula horário final
    const endHour = h + Math.floor(durationHours);
    const endMin = m + Math.round((durationHours % 1) * 60);
    const dateObj = new Date(`${viagem.data}T00:00:00`);
    
    const startDateTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), h, m, 0).toISOString();
    const endDateTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), endHour, endMin, 0).toISOString();

    const event = {
        summary: `🚗 Transfer — ${viagem.nomeCliente}`,
        description: `Cliente: ${viagem.nomeCliente}\nWhatsApp: ${viagem.telefone}\nRota: ${viagem.tipoServico}\nEmbarque: ${viagem.enderecoEmbarque}\nDestino: ${viagem.enderecoDestino}\nPassageiros: ${viagem.passageiros} | Malas: ${viagem.malas}\nValor: R$ ${viagem.valor}\nForma de Pagamento: ${viagem.formaPagamento}\nObs: ${viagem.observacoes || ''}`,
        start: {
            dateTime: startDateTime,
            timeZone: "America/Sao_Paulo"
        },
        end: {
            dateTime: endDateTime,
            timeZone: "America/Sao_Paulo"
        },
        reminders: {
            useDefault: false,
            overrides: [
                { method: "popup", minutes: 120 }, // 2h antes
                { method: "popup", minutes: 30 }   // 30min antes
            ]
        }
    };

    try {
        if (viagem.googleEventId) {
            // Atualiza evento existente
            await gapi.client.calendar.events.update({
                calendarId: 'primary',
                eventId: viagem.googleEventId,
                resource: event
            });
            console.log(`Evento Google Agenda atualizado: ${viagem.googleEventId}`);
        } else {
            // Cria novo evento
            const response = await gapi.client.calendar.events.insert({
                calendarId: 'primary',
                resource: event
            });
            
            // Salva o googleEventId na viagem no Firestore/localStorage
            viagem.googleEventId = response.result.id;
            
            // Re-salva a viagem no banco para guardar o googleEventId
            // Para evitar loop infinito de sincronização, chamamos dbSaveViagem direto bypassando gcal se detectado
            if (db) {
                await db.collection('viagens').doc(viagem.id).update({ googleEventId: viagem.googleEventId });
            } else {
                let viagens = JSON.parse(localStorage.getItem('rota_viagens') || '[]');
                const idx = viagens.findIndex(v => v.id === viagem.id);
                if (idx !== -1) {
                    viagens[idx].googleEventId = viagem.googleEventId;
                    localStorage.setItem('rota_viagens', JSON.stringify(viagens));
                }
            }
            console.log(`Novo evento criado no Google Agenda: ${response.result.id}`);
        }
    } catch (e) {
        console.error("Falha ao sincronizar com Google Agenda:", e);
    }
}

// Remover Evento do Google Agenda
async function deleteEventFromGoogleCalendar(googleEventId) {
    if (!googleEventId || !checkGoogleAuthStatus()) return;

    try {
        await gapi.client.calendar.events.delete({
            calendarId: 'primary',
            eventId: googleEventId
        });
        console.log(`Evento ${googleEventId} removido do Google Agenda.`);
    } catch (e) {
        console.error("Falha ao remover evento do Google Agenda:", e);
    }
}

// Função utilitária para inicialização dinâmica nas páginas
function setupGoogleCalendarClient() {
    const config = getGoogleConfig();
    if (config.clientId && config.apiKey) {
        // Carrega scripts dinamicamente se não carregados
        if (typeof gapi === 'undefined') {
            const scriptGapi = document.createElement('script');
            scriptGapi.src = "https://apis.google.com/js/api.js";
            scriptGapi.onload = gapiLoad;
            document.body.appendChild(scriptGapi);
        } else {
            gapiLoad();
        }

        if (typeof google === 'undefined' || typeof google.accounts === 'undefined') {
            const scriptGis = document.createElement('script');
            scriptGis.src = "https://accounts.google.com/gsi/client";
            scriptGis.onload = gisLoad;
            document.body.appendChild(scriptGis);
        } else {
            gisLoad();
        }
    }
}

// Auto setup se estiver na página de dashboard ou configuracoes
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('configuracoes.html')) {
        setTimeout(setupGoogleCalendarClient, 1000); // pequeno delay para garantir carregamento base
    }
});
