// Configuração Padrão do Firebase para o Painel Rota CDE Transfer
// Caso queira configurar via código, preencha o objeto abaixo.
// Alternativamente, as chaves podem ser configuradas diretamente na tela de configurações do painel.

const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Carrega a configuração salva no localStorage ou usa a padrão
function getFirebaseConfig() {
    const savedConfig = localStorage.getItem('rota_firebase_config');
    if (savedConfig) {
        try {
            return JSON.parse(savedConfig);
        } catch (e) {
            console.error("Erro ao ler configuração do Firebase do localStorage", e);
        }
    }
    return DEFAULT_FIREBASE_CONFIG;
}

// Verifica se o Firebase está configurado e pronto para uso
function isFirebaseEnabled() {
    const config = getFirebaseConfig();
    return config && config.apiKey && config.projectId;
}
