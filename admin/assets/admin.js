// ==========================================================================
// ROTA CDE TRANSFER - MOTOR LÓGICO DO PAINEL ADMINISTRATIVO
// ==========================================================================

// --- Globais e Inicialização ---
let db = null;
let auth = null;
let messaging = null;

// Senha Padrão de Acesso
const DEFAULT_PASSWORD = "rota123";
// Limpa hash incorreto antigo do localStorage
localStorage.removeItem('rota_admin_password_hash');

// --- Inicialização do Firebase se Habilitado ---
function initFirebase() {
    if (isFirebaseEnabled()) {
        const config = getFirebaseConfig();
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        db = firebase.firestore();
        auth = firebase.auth();
        try {
            if (firebase.messaging.isSupported()) {
                messaging = firebase.messaging();
            }
        } catch (e) {
            console.warn("Firebase Messaging não suportado neste ambiente.", e);
        }
        console.log("Firebase inicializado com sucesso!");
    } else {
        console.log("Firebase desabilitado. Utilizando LocalStorage como banco de dados.");
    }
}

// --- Controle de Sessão ---
function verifySession() {
    const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/admin/') || window.location.pathname.endsWith('/admin');
    const session = localStorage.getItem('rota_admin_session');
    
    if (session) {
        try {
            const sessionData = JSON.parse(session);
            if (Date.now() < sessionData.expireAt) {
                // Sessão válida
                if (isLoginPage) {
                    window.location.href = 'dashboard.html';
                }
                return;
            }
        } catch (e) {}
    }
    
    // Sessão inválida ou ausente
    if (!isLoginPage) {
        localStorage.removeItem('rota_admin_session');
        window.location.href = 'index.html';
    }
}

// Criar Sessão de 8 horas
function createSession() {
    const sessionData = {
        loginAt: Date.now(),
        expireAt: Date.now() + (8 * 60 * 60 * 1000) // 8 horas
    };
    localStorage.setItem('rota_admin_session', JSON.stringify(sessionData));
}

// Finalizar Sessão
function logout() {
    localStorage.removeItem('rota_admin_session');
    if (auth) {
        auth.signOut().finally(() => {
            window.location.href = 'index.html';
        });
    } else {
        window.location.href = 'index.html';
    }
}

// --- Controle de Rate Limit (Tentativas de Login) ---
function checkLoginRateLimit() {
    const attempts = JSON.parse(localStorage.getItem('rota_login_attempts') || '{"count": 0, "blockedUntil": 0}');
    if (Date.now() < attempts.blockedUntil) {
        const remainingTime = Math.ceil((attempts.blockedUntil - Date.now()) / 1000);
        return { blocked: true, remaining: remainingTime };
    }
    return { blocked: false };
}

function registerLoginAttempt(success) {
    let attempts = JSON.parse(localStorage.getItem('rota_login_attempts') || '{"count": 0, "blockedUntil": 0}');
    if (success) {
        localStorage.removeItem('rota_login_attempts');
    } else {
        attempts.count++;
        if (attempts.count >= 5) {
            attempts.blockedUntil = Date.now() + (60 * 1000); // 1 minuto de bloqueio
            attempts.count = 0;
        }
        localStorage.setItem('rota_login_attempts', JSON.stringify(attempts));
    }
}

// --- Autenticação ---
async function login(password, email = "") {
    const rateLimit = checkLoginRateLimit();
    if (rateLimit.blocked) {
        throw new Error(`Muitas tentativas. Bloqueado por mais ${rateLimit.remaining} segundos.`);
    }

    if (isFirebaseEnabled() && email) {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            createSession();
            registerLoginAttempt(true);
            return true;
        } catch (e) {
            registerLoginAttempt(false);
            throw new Error("E-mail ou senha incorretos no Firebase.");
        }
    } else {
        // Validação local direta
        const trimmedPassword = password.trim();
        const storedPassword = localStorage.getItem('rota_admin_password') || DEFAULT_PASSWORD;
        
        if (trimmedPassword === storedPassword) {
            createSession();
            registerLoginAttempt(true);
            return true;
        } else {
            registerLoginAttempt(false);
            throw new Error("Senha de acesso incorreta.");
        }
    }
}

// --- Operações CRUD no Banco de Dados (Viagens) ---

// Obter Viagens
async function dbGetViagens() {
    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('viagens').select('*');
            if (error) {
                console.error("Erro ao buscar viagens do Supabase:", error);
            } else if (data) {
                // Auto-migração: Se o Supabase estiver vazio, mas o localStorage tiver dados, migra para o Supabase
                const localViagens = JSON.parse(localStorage.getItem('rota_viagens') || '[]');
                if (data.length === 0 && localViagens.length > 0) {
                    console.log("Migrando viagens locais para o Supabase...");
                    for (const v of localViagens) {
                        await supabaseClient.from('viagens').upsert(v, { onConflict: 'id' });
                    }
                    return localViagens.sort((a, b) => new Date(`${a.data}T${a.horario}`) - new Date(`${b.data}T${b.horario}`));
                }

                // Atualiza cache local
                localStorage.setItem('rota_viagens', JSON.stringify(data));
                return data.sort((a, b) => new Date(`${a.data}T${a.horario}`) - new Date(`${b.data}T${b.horario}`));
            }
        } catch (e) {
            console.warn("Falha de conexão com Supabase, usando LocalStorage:", e);
        }
    }

    if (db) {
        const snapshot = await db.collection('viagens').get();
        const viagens = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            viagens.push(data);
        });
        return viagens.sort((a, b) => new Date(`${a.data}T${a.horario}`) - new Date(`${b.data}T${b.horario}`));
    } else {
        const viagens = JSON.parse(localStorage.getItem('rota_viagens') || '[]');
        return viagens.sort((a, b) => new Date(`${a.data}T${a.horario}`) - new Date(`${b.data}T${b.horario}`));
    }
}

// Salvar Viagem (Novo ou Edição)
async function dbSaveViagem(viagem) {
    if (!viagem.id) {
        viagem.id = 'v_' + Math.random().toString(36).substr(2, 9);
        viagem.createdAt = new Date().toISOString();
    }
    viagem.updatedAt = new Date().toISOString();

    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
        try {
            const { error } = await supabaseClient.from('viagens').upsert(viagem, { onConflict: 'id' });
            if (error) {
                console.error("Erro ao salvar viagem no Supabase:", error);
            } else {
                console.log("Viagem salva no Supabase com sucesso:", viagem.id);
            }
        } catch (e) {
            console.warn("Erro ao salvar no Supabase:", e);
        }
    }

    if (db) {
        const id = viagem.id;
        await db.collection('viagens').doc(id).set(viagem);
    }

    // Sempre salva em LocalStorage para disponibilidade offline
    let viagens = JSON.parse(localStorage.getItem('rota_viagens') || '[]');
    const idx = viagens.findIndex(v => v.id === viagem.id);
    if (idx !== -1) {
        viagens[idx] = viagem;
    } else {
        viagens.push(viagem);
    }
    localStorage.setItem('rota_viagens', JSON.stringify(viagens));
    
    // Atualizar Google Agenda se conectado
    if (typeof syncEventToGoogleCalendar === 'function') {
        try {
            await syncEventToGoogleCalendar(viagem);
        } catch (e) {
            console.error("Erro ao sincronizar com Google Agenda:", e);
        }
    }

    return viagem;
}

// Excluir Viagem
async function dbDeleteViagem(id) {
    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
        try {
            const { error } = await supabaseClient.from('viagens').delete().eq('id', id);
            if (error) {
                console.error("Erro ao excluir viagem no Supabase:", error);
            } else {
                console.log("Viagem excluída no Supabase:", id);
            }
        } catch (e) {
            console.warn("Erro ao deletar no Supabase:", e);
        }
    }

    if (db) {
        await db.collection('viagens').doc(id).delete();
    }

    let viagens = JSON.parse(localStorage.getItem('rota_viagens') || '[]');
    viagens = viagens.filter(v => v.id !== id);
    localStorage.setItem('rota_viagens', JSON.stringify(viagens));
    
    // Remover do Google Agenda se necessário
    if (typeof deleteEventFromGoogleCalendar === 'function') {
        try {
            await deleteEventFromGoogleCalendar(id);
        } catch (e) {
            console.error("Erro ao remover do Google Agenda:", e);
        }
    }
}

// --- CRM (Clientes) ---
async function dbGetClientes() {
    const viagens = await dbGetViagens();
    const clientesMap = {};

    viagens.forEach(v => {
        if (!v.telefone) return;
        
        const telClean = v.telefone.replace(/\D/g, '');
        if (!telClean) return;

        const val = parseFloat(v.valor) || 0;
        
        if (!clientesMap[telClean]) {
            clientesMap[telClean] = {
                nome: v.nomeCliente,
                telefone: v.telefone,
                email: v.emailCliente || '',
                totalViagens: 0,
                totalGasto: 0,
                ultimaViagem: v.data,
                observacoes: v.observacoes || '',
                historico: []
            };
        }

        const c = clientesMap[telClean];
        c.totalViagens++;
        if (v.status === 'Confirmado' || v.status === 'Concluído') {
            c.totalGasto += val;
        }
        c.historico.push(v);
        
        // Atualiza para a data mais recente
        if (new Date(v.data) > new Date(c.ultimaViagem)) {
            c.ultimaViagem = v.data;
        }
    });

    return Object.values(clientesMap);
}

// --- Relatório Financeiro e Dashboard ---
async function dbGetStats() {
    const viagens = await dbGetViagens();
    const hoje = new Date().toISOString().split('T')[0];
    
    // Obter data de início da semana
    const dataAtual = new Date();
    const diaSemana = dataAtual.getDay();
    const dif = dataAtual.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1);
    const inicioSemana = new Date(dataAtual.setDate(dif)).toISOString().split('T')[0];
    
    const mesAtual = new Date().toISOString().substring(0, 7); // YYYY-MM

    let viagensHoje = 0;
    let viagensSemana = 0;
    let receitaMes = 0;
    const clientesMes = new Set();

    viagens.forEach(v => {
        const val = parseFloat(v.valor) || 0;
        const statusValido = (v.status === 'Confirmado' || v.status === 'Concluído');

        if (v.data === hoje) {
            viagensHoje++;
        }
        if (v.data >= inicioSemana && v.data <= hoje) {
            viagensSemana++;
        }
        if (v.data.startsWith(mesAtual)) {
            if (statusValido) {
                receitaMes += val;
            }
            if (v.telefone) {
                clientesMes.add(v.telefone.replace(/\D/g, ''));
            }
        }
    });

    return {
        viagensHoje,
        viagensSemana,
        receitaMes,
        clientesAtendidosMes: clientesMes.size
    };
}

// --- Lembretes de WhatsApp ---
function getWhatsAppMessage(viagem) {
    const configMsg = localStorage.getItem('rota_lembrete_template');
    const template = configMsg || 
`Olá, [Nome]! 👋 Tudo bem?

Aqui é da Rota CDE Transfer. Passando para confirmar seu transfer agendado:

📍 Embarque: [Embarque]
📍 Destino: [Destino]
🕐 Horário: [Horario]
📅 Data: [Data]
👥 Passageiros: [Passageiros]

Confirme sua presença respondendo esta mensagem. Em caso de dúvidas, estou à disposição! Obrigado! 🙏`;

    let msg = template
        .replace('[Nome]', viagem.nomeCliente)
        .replace('[Embarque]', viagem.enderecoEmbarque)
        .replace('[Destino]', viagem.enderecoDestino)
        .replace('[Horario]', viagem.horario)
        .replace('[Data]', formatDate(viagem.data))
        .replace('[Passageiros]', viagem.passageiros);

    return encodeURIComponent(msg);
}

function formatDate(dateStr) {
    try {
        const parts = dateStr.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    } catch (e) {
        return dateStr;
    }
}

function enviarLembreteWhatsApp(viagem) {
    const telClean = viagem.telefone.replace(/\D/g, '');
    const msg = getWhatsAppMessage(viagem);
    const url = `https://wa.me/${telClean}?text=${msg}`;
    window.open(url, '_blank');
}

// --- Notificações Locais Push ---
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            console.log("Permissão de notificação:", permission);
            localStorage.setItem('rota_push_permission', permission);
        });
    }
}

function triggerLocalNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: 'assets/logo_icon.png'
        });
    }
}

// Monitoramento ativo de viagens próximas em segundo plano
function startLocalTripMonitoring() {
    // Roda a cada 2 minutos
    setInterval(async () => {
        try {
            const viagens = await dbGetViagens();
            const hoje = new Date().toISOString().split('T')[0];
            const agora = new Date();
            const notifiedKey = 'rota_notified_trips';
            let notified = JSON.parse(localStorage.getItem(notifiedKey) || '{}');
            
            viagens.forEach(v => {
                if (v.data !== hoje || v.status !== 'Confirmado') return;
                
                const viagemHora = new Date(`${v.data}T${v.horario}`);
                const difMin = Math.round((viagemHora - agora) / 60000);
                
                // Notificação de 2 horas (entre 110 e 120 minutos antes)
                if (difMin > 110 && difMin <= 120) {
                    const id2h = `${v.id}_2h`;
                    if (!notified[id2h]) {
                        triggerLocalNotification(
                            `⏰ Transfer em 2h: ${v.nomeCliente}`,
                            `Horário: ${v.horario} - Rota: ${v.enderecoEmbarque} para ${v.enderecoDestino}`
                        );
                        notified[id2h] = true;
                    }
                }
                
                // Notificação de 30 minutos (entre 25 e 30 minutos antes)
                if (difMin > 25 && difMin <= 30) {
                    const id30m = `${v.id}_30m`;
                    if (!notified[id30m]) {
                        triggerLocalNotification(
                            `🚗 Sair em 30min para buscar ${v.nomeCliente}`,
                            `Endereço: ${v.enderecoEmbarque} às ${v.horario}`
                        );
                        notified[id30m] = true;
                    }
                }
            });
            
            localStorage.setItem(notifiedKey, JSON.stringify(notified));
        } catch (e) {
            console.error("Erro ao monitorar viagens:", e);
        }
    }, 120000);
}

// --- Executa Configuração Padrão na Inicialização de Página ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar sessões ativas
    verifySession();
    
    // 2. Inicializar Supabase (Banco de dados principal)
    if (typeof initSupabase === 'function') {
        initSupabase();
    }

    // 3. Inicializar Firebase se chaves estiverem presentes (fallback)
    initFirebase();
    
    // 4. Monitoramento de alarmes no cliente
    if (!window.location.pathname.endsWith('index.html')) {
        startLocalTripMonitoring();
    }
});
