/* ==========================================================================
   ROTA CDE TRANSFER - COOKIE CONSENT BANNER & GOOGLE CONSENT MODE V2
   ========================================================================== */

(function () {
    // 1. Translations Definition
    const translations = {
        pt: {
            title: "Valorizamos sua Privacidade",
            desc: "Usamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar anúncios em conformidade com a nossa Política de Privacidade.",
            acceptAll: "Aceitar Todos",
            rejectAll: "Rejeitar",
            customize: "Personalizar",
            saveChoice: "Salvar Preferências",
            close: "Fechar",
            preferencesTitle: "Preferências de Cookies",
            essentialTitle: "Essenciais (Obrigatório)",
            essentialDesc: "Necessários para o funcionamento básico do site e segurança.",
            analyticsTitle: "Análise de Desempenho",
            analyticsDesc: "Nos ajudam a entender como os visitantes interagem com o site (Google Analytics).",
            marketingTitle: "Marketing e Anúncios",
            marketingDesc: "Usados para veicular anúncios mais relevantes para você e seus interesses."
        },
        es: {
            title: "Valoramos tu Privacidad",
            desc: "Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar anuncios de acuerdo con nuestra Política de Privacidad.",
            acceptAll: "Aceptar Todo",
            rejectAll: "Rechazar",
            customize: "Personalizar",
            saveChoice: "Guardar Preferencias",
            close: "Cerrar",
            preferencesTitle: "Preferencias de Cookies",
            essentialTitle: "Esenciales (Obligatorio)",
            essentialDesc: "Necesarios para el funcionamiento básico del sitio y la seguridad.",
            analyticsTitle: "Análisis y Rendimiento",
            analyticsDesc: "Nos ayudan a comprender cómo interactúan los visitantes con el sitio (Google Analytics).",
            marketingTitle: "Marketing y Anuncios",
            marketingDesc: "Utilizados para mostrar anuncios más relevantes para ti y tus intereses."
        },
        en: {
            title: "We Value Your Privacy",
            desc: "We use cookies to improve your experience, analyze site traffic, and personalize ads in accordance with our Privacy Policy.",
            acceptAll: "Accept All",
            rejectAll: "Reject All",
            customize: "Customize",
            saveChoice: "Save Preferences",
            close: "Close",
            preferencesTitle: "Cookie Preferences",
            essentialTitle: "Essential (Required)",
            essentialDesc: "Necessary for the basic functioning of the website and security.",
            analyticsTitle: "Analytics & Performance",
            analyticsDesc: "Help us understand how visitors interact with our website (Google Analytics).",
            marketingTitle: "Marketing & Ads",
            marketingDesc: "Used to deliver more relevant advertisements tailored to your interests."
        }
    };

    // 2. Detect Language
    let lang = 'pt';
    const htmlLang = document.documentElement.lang;
    if (htmlLang && htmlLang.startsWith('es')) {
        lang = 'es';
    } else if (htmlLang && htmlLang.startsWith('en')) {
        lang = 'en';
    } else {
        // Fallback checks
        const path = window.location.pathname;
        if (path.includes('/es/') || path.includes('_es')) {
            lang = 'es';
        } else if (path.includes('/en/') || path.includes('_en')) {
            lang = 'en';
        }
    }
    const t = translations[lang] || translations.pt;

    // 3. Inject CSS
    const css = `
        .cc-banner {
            position: fixed;
            bottom: 24px;
            right: 24px;
            max-width: 420px;
            background: rgba(14, 26, 47, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(197, 155, 39, 0.3);
            border-radius: 16px;
            padding: 24px;
            color: #ffffff;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(197, 155, 39, 0.1);
            z-index: 999999;
            font-family: 'Inter', 'Outfit', sans-serif;
            display: none;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .cc-banner.cc-show {
            display: block;
            opacity: 1;
            transform: translateY(0);
        }
        .cc-banner h3 {
            margin-top: 0;
            margin-bottom: 8px;
            font-family: 'Outfit', sans-serif;
            font-size: 18px;
            font-weight: 600;
            color: #c59b27;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .cc-banner p {
            font-size: 13.5px;
            line-height: 1.5;
            color: #9ba8bc;
            margin-bottom: 20px;
        }
        .cc-btn-group {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .cc-btn {
            padding: 10px 18px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: 'Inter', sans-serif;
            border: none;
            outline: none;
        }
        .cc-btn-accept {
            background: linear-gradient(135deg, #c59b27 0%, #e5c158 100%);
            color: #050B14;
            flex: 1 1 auto;
        }
        .cc-btn-accept:hover {
            box-shadow: 0 4px 12px rgba(197, 155, 39, 0.3);
            transform: translateY(-1px);
        }
        .cc-btn-reject {
            background: transparent;
            color: #9ba8bc;
            border: 1px solid rgba(155, 168, 188, 0.3);
        }
        .cc-btn-reject:hover {
            background: rgba(255, 255, 255, 0.05);
            color: #ffffff;
        }
        .cc-btn-settings {
            background: transparent;
            color: #c59b27;
            text-decoration: underline;
            padding: 10px 8px;
        }
        .cc-btn-settings:hover {
            color: #e5c158;
        }
        
        /* Modal Preferences */
        .cc-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(5, 11, 20, 0.8);
            backdrop-filter: blur(5px);
            z-index: 1000000;
            display: none;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .cc-modal.cc-show {
            display: flex;
            opacity: 1;
        }
        .cc-modal-content {
            background: #0e1a2f;
            border: 1px solid rgba(197, 155, 39, 0.3);
            width: 90%;
            max-width: 480px;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            position: relative;
            transform: scale(0.95);
            transition: transform 0.3s ease;
        }
        .cc-modal.cc-show .cc-modal-content {
            transform: scale(1);
        }
        .cc-modal h3 {
            margin-top: 0;
            margin-bottom: 16px;
            font-family: 'Outfit', sans-serif;
            color: #c59b27;
            font-size: 20px;
        }
        .cc-preference-item {
            border-bottom: 1px solid rgba(155, 168, 188, 0.1);
            padding: 14px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
        }
        .cc-preference-item:last-of-type {
            border-bottom: none;
            margin-bottom: 16px;
        }
        .cc-pref-text {
            flex: 1;
        }
        .cc-pref-text h4 {
            margin: 0 0 4px 0;
            font-size: 14px;
            color: #ffffff;
        }
        .cc-pref-text p {
            margin: 0;
            font-size: 12px;
            color: #9ba8bc;
            line-height: 1.4;
        }
        
        /* Custom Switch */
        .cc-switch {
            position: relative;
            display: inline-block;
            width: 42px;
            height: 24px;
            flex-shrink: 0;
        }
        .cc-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .cc-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #1a2a47;
            transition: .3s;
            border-radius: 24px;
            border: 1px solid rgba(155, 168, 188, 0.2);
        }
        .cc-slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 3px;
            bottom: 3px;
            background-color: #9ba8bc;
            transition: .3s;
            border-radius: 50%;
        }
        input:checked + .cc-slider {
            background-color: #c59b27;
        }
        input:checked + .cc-slider:before {
            transform: translateX(18px);
            background-color: #050B14;
        }
        input:disabled + .cc-slider {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .cc-close-modal {
            position: absolute;
            top: 16px;
            right: 16px;
            background: transparent;
            border: none;
            color: #9ba8bc;
            font-size: 20px;
            cursor: pointer;
        }
        .cc-close-modal:hover {
            color: #ffffff;
        }

        @media (max-width: 480px) {
            .cc-banner {
                bottom: 12px;
                left: 12px;
                right: 12px;
                max-width: calc(100% - 24px);
                padding: 16px;
            }
            .cc-btn-group {
                flex-direction: column;
            }
            .cc-btn {
                width: 100%;
                text-align: center;
            }
        }
    `;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

    // 4. Update Consent Mode Helper
    function updateConsent(preferences) {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': preferences.ad_storage,
                'ad_user_data': preferences.ad_user_data,
                'ad_personalization': preferences.ad_personalization,
                'analytics_storage': preferences.analytics_storage
            });
            
            // Push event to dataLayer
            window.dataLayer.push({
                event: 'consent_updated',
                consent_preferences: preferences
            });
        }
    }

    // 5. Render Banner and Modal
    function init() {
        const hasChoice = localStorage.getItem('cookie_consent');
        if (hasChoice) {
            // Already configured, do not show banner
            return;
        }

        // Create Banner Markup
        const banner = document.createElement('div');
        banner.className = 'cc-banner';
        banner.innerHTML = `
            <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                ${t.title}
            </h3>
            <p>${t.desc}</p>
            <div class="cc-btn-group">
                <button class="cc-btn cc-btn-accept" id="cc-accept-all">${t.acceptAll}</button>
                <button class="cc-btn cc-btn-reject" id="cc-reject-all">${t.rejectAll}</button>
                <button class="cc-btn cc-btn-settings" id="cc-open-settings">${t.customize}</button>
            </div>
        `;
        document.body.appendChild(banner);

        // Create Preferences Modal Markup
        const modal = document.createElement('div');
        modal.className = 'cc-modal';
        modal.id = 'cc-modal';
        modal.innerHTML = `
            <div class="cc-modal-content">
                <button class="cc-close-modal" id="cc-close-modal">&times;</button>
                <h3>${t.preferencesTitle}</h3>
                
                <div class="cc-preference-item">
                    <div class="cc-pref-text">
                        <h4>${t.essentialTitle}</h4>
                        <p>${t.essentialDesc}</p>
                    </div>
                    <label class="cc-switch">
                        <input type="checkbox" checked disabled>
                        <span class="cc-slider"></span>
                    </label>
                </div>
                
                <div class="cc-preference-item">
                    <div class="cc-pref-text">
                        <h4>${t.analyticsTitle}</h4>
                        <p>${t.analyticsDesc}</p>
                    </div>
                    <label class="cc-switch">
                        <input type="checkbox" id="cc-analytics-toggle" checked>
                        <span class="cc-slider"></span>
                    </label>
                </div>
                
                <div class="cc-preference-item">
                    <div class="cc-pref-text">
                        <h4>${t.marketingTitle}</h4>
                        <p>${t.marketingDesc}</p>
                    </div>
                    <label class="cc-switch">
                        <input type="checkbox" id="cc-marketing-toggle" checked>
                        <span class="cc-slider"></span>
                    </label>
                </div>
                
                <button class="cc-btn cc-btn-accept" id="cc-save-settings" style="width:100%; margin-top:10px;">${t.saveChoice}</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Trigger presentation with animations
        setTimeout(() => {
            banner.classList.add('cc-show');
        }, 1000);

        // --- Event Listeners ---
        
        // Accept All
        document.getElementById('cc-accept-all').addEventListener('click', () => {
            const preferences = {
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
                analytics_storage: 'granted'
            };
            localStorage.setItem('cookie_consent', JSON.stringify(preferences));
            updateConsent(preferences);
            banner.classList.remove('cc-show');
            setTimeout(() => banner.remove(), 400);
        });

        // Reject All
        document.getElementById('cc-reject-all').addEventListener('click', () => {
            const preferences = {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied'
            };
            localStorage.setItem('cookie_consent', JSON.stringify(preferences));
            updateConsent(preferences);
            banner.classList.remove('cc-show');
            setTimeout(() => banner.remove(), 400);
        });

        // Open settings modal
        document.getElementById('cc-open-settings').addEventListener('click', () => {
            modal.classList.add('cc-show');
        });

        // Close modal
        document.getElementById('cc-close-modal').addEventListener('click', () => {
            modal.classList.remove('cc-show');
        });

        // Save Custom Settings
        document.getElementById('cc-save-settings').addEventListener('click', () => {
            const isAnalytics = document.getElementById('cc-analytics-toggle').checked;
            const isMarketing = document.getElementById('cc-marketing-toggle').checked;
            
            const preferences = {
                ad_storage: isMarketing ? 'granted' : 'denied',
                ad_user_data: isMarketing ? 'granted' : 'denied',
                ad_personalization: isMarketing ? 'granted' : 'denied',
                analytics_storage: isAnalytics ? 'granted' : 'denied'
            };
            
            localStorage.setItem('cookie_consent', JSON.stringify(preferences));
            updateConsent(preferences);
            
            modal.classList.remove('cc-show');
            banner.classList.remove('cc-show');
            setTimeout(() => {
                modal.remove();
                banner.remove();
            }, 400);
        });
    }

    // Run on DOMContentLoaded or immediately if already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
