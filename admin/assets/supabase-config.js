// Configuração Padrão do Supabase para o Rota CDE Transfer
const DEFAULT_SUPABASE_CONFIG = {
    url: "https://dafveurgzqysybznmzqg.supabase.co",
    key: "sb_publishable_btB8gU9_GLIOKMTzOrMoJw_kBUeIQjH"
};

let supabaseClient = null;

// Carrega a configuração do Supabase
function getSupabaseConfig() {
    const saved = localStorage.getItem('rota_supabase_config');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Erro ao ler configuração do Supabase do localStorage", e);
        }
    }
    return DEFAULT_SUPABASE_CONFIG;
}

// Inicializa o cliente Supabase se o SDK estiver carregado
function initSupabase() {
    if (typeof window.supabase !== 'undefined') {
        const config = getSupabaseConfig();
        if (config && config.url && config.key) {
            try {
                supabaseClient = window.supabase.createClient(config.url, config.key);
                console.log("Supabase inicializado com sucesso!", config.url);
                return supabaseClient;
            } catch (e) {
                console.error("Erro ao instanciar Supabase client:", e);
            }
        }
    } else {
        console.warn("SDK do Supabase (@supabase/supabase-js) não encontrado.");
    }
    return null;
}

function isSupabaseEnabled() {
    const config = getSupabaseConfig();
    return Boolean(config && config.url && config.key);
}
