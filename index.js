/* ==========================================================================
   ROTA CDE TRANSFER - JAVASCRIPT LOGIC
   Dynamic Pricing, Admin Panel, Form Validation & WhatsApp Integration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- State & Default Data ---
    const DEFAULT_PHONE = "595973953874";
    const DEFAULT_PRICES = [
        { id: "foz_cde",    name: "Foz Centro / Hotel / Airbnb ⇄ Ciudad del Este", desc: "Transfer privativo (ida ou volta)",          price: 150 },
        { id: "igu_cde",    name: "Aeroporto IGU ⇄ Ciudad del Este",                desc: "Recepção no desembarque (ida ou volta)",    price: 180 },
        { id: "rod_cde",    name: "Rodoviária Foz ⇄ Ciudad del Este",              desc: "Recepção na plataforma (ida ou volta)",      price: 160 },
        { id: "compras_4h", name: "Compras no Paraguai (Até 4 Horas)",             desc: "Ida, espera de 4h e retorno inclusos",       price: 280 },
        { id: "compras_6h", name: "Compras no Paraguai (Até 6 Horas)",             desc: "Ida, espera de 6h e retorno inclusos",       price: 350 },
        { id: "assuncao",   name: "Foz do Iguaçu ⇄ Assunção (Asunción)",          desc: "Transfer longa distância (aprox. 6h de viagem)", price: 0 },
        { id: "santa_rita", name: "Foz do Iguaçu ⇄ Santa Rita",                   desc: "Transfer longa distância",                   price: 0 },
        { id: "encarnacao", name: "Foz do Iguaçu ⇄ Encarnação (Encarnación)",    desc: "Transfer longa distância",                   price: 0 },
        { id: "personalizado", name: "Transfer Personalizado / Outras Rotas",      desc: "Rotas especiais e destinos sob consulta",    price: 0 }
    ];

    let currentPhone = localStorage.getItem('rota_cde_phone') || DEFAULT_PHONE;
    let prices = [];

    // Load prices from LocalStorage or use defaults
    try {
        const storedPrices = localStorage.getItem('rota_cde_prices');
        if (storedPrices) {
            prices = JSON.parse(storedPrices);
            // Sync in case we added new price items in code
            if (prices.length !== DEFAULT_PRICES.length) {
                prices = DEFAULT_PRICES;
                localStorage.setItem('rota_cde_prices', JSON.stringify(prices));
            }
        } else {
            prices = DEFAULT_PRICES;
            localStorage.setItem('rota_cde_prices', JSON.stringify(prices));
        }
    } catch (e) {
        prices = DEFAULT_PRICES;
    }

    // --- UI Selectors ---
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const quoteForm = document.getElementById('quoteForm');
    const quoteResult = document.getElementById('quoteResult');
    const resultPrice = document.getElementById('resultPrice');
    const btnContinueWhatsApp = document.getElementById('btnContinueWhatsApp');
    const pricingTableBody = document.getElementById('pricingTableBody');
    const whatsappFloatingBtn = document.getElementById('whatsappFloatingBtn');
    const langSelector = document.getElementById('langSelector');
    
    // Admin Selectors
    const adminTrigger = document.getElementById('adminTrigger');
    const adminModal = document.getElementById('adminModal');
    const adminModalClose = document.getElementById('adminModalClose');
    const adminAuthSection = document.getElementById('adminAuthSection');
    const adminEditSection = document.getElementById('adminEditSection');
    const adminPasswordInput = document.getElementById('adminPassword');
    const btnAdminAuth = document.getElementById('btnAdminAuth');
    const authErrorMsg = document.getElementById('authErrorMsg');
    const adminInputsContainer = document.getElementById('adminInputsContainer');
    const adminPhoneInput = document.getElementById('adminPhone');
    const adminPriceForm = document.getElementById('adminPriceForm');
    const btnAdminCancel = document.getElementById('btnAdminCancel');

    // --- Translations Map ---
    const TRANSLATIONS = {
        pt: {
            nav_servicos: "Serviços",
            nav_como_funciona: "Como Funciona",
            nav_diferenciais: "Diferenciais",
            nav_precos: "Preços",
            nav_faq: "Dúvidas",
            header_wa: "Falar no WhatsApp",
            hero_badge: "Sua conexão premium Brasil ⇄ Paraguai",
            hero_title: "Transfer Privativo entre Foz do Iguaçu e Ciudad del Este",
            hero_subtitle: "Compras, Aeroporto, Rodoviária e Airbnbs com conforto, segurança e atendimento personalizado.",
            hero_btn_quote: "Solicitar Orçamento",
            hero_btn_wa: "Falar no WhatsApp",
            quote_title: "Cotação Rápida",
            quote_desc: "Calcule agora o valor estimado do seu transfer.",
            label_origem: "Origem",
            opt_select_origem: "Selecione a origem",
            opt_foz_centro: "Foz do Iguaçu (Centro)",
            opt_hotel_foz: "Hotel / Airbnb em Foz",
            opt_aeroporto_foz: "Aeroporto de Foz (IGU)",
            opt_rodoviaria_foz: "Rodoviária de Foz do Iguaçu",
            opt_cde: "Ciudad del Este",
            opt_hotel_cde: "Hotel / Airbnb em Ciudad del Este",
            opt_assuncao: "Assunção (Asunción)",
            opt_santa_rita: "Santa Rita",
            opt_encarnacao: "Encarnação (Encarnación)",
            opt_outro: "Outro local (Personalizado)",
            label_destino: "Destino",
            opt_select_destino: "Selecione o destino",
            opt_compras_6h: "Compras Paraguai — até 6 horas",
            opt_compras_4h: "Compras Paraguai — até 4 horas",
            label_data: "Data",
            label_passageiros: "Passageiros",
            label_malas: "Malas",
            btn_calculate: "Calcular Valor",
            result_label: "Valor Estimado:",
            result_note: "Valor aproximado. Consulte nossa equipe pelo WhatsApp para receber uma cotação personalizada.",
            btn_whatsapp_submit: "Confirmar e Reservar no WhatsApp",
            services_tagline: "Nossas Rotas & Serviços",
            services_title: "Soluções de Transporte Sob Medida",
            services_desc: "Conectando o Brasil e o Paraguai com a comodidade e agilidade que você merece.",
            srv1_title: "Compras em Ciudad del Este",
            srv1_desc: "Vá fazer suas compras com tranquilidade. Levamos você aos principais shoppings e buscamos com segurança, sem preocupações com estacionamento ou trânsito da fronteira.",
            srv2_title: "Aeroporto IGU → Ciudad del Este",
            srv2_desc: "Chegando pelo Aeroporto Internacional de Foz do Iguaçu? Nosso motorista estará aguardando no desembarque para te levar direto ao seu destino no Paraguai.",
            srv3_title: "Rodoviária de Foz → Ciudad del Este",
            srv3_desc: "Transfer prático a partir do terminal rodoviário de Foz do Iguaçu. Pontualidade garantida para que você não perca tempo na sua viagem.",
            srv4_title: "Hotéis → Ciudad del Este",
            srv4_desc: "Buscamos você na porta do seu hotel em Foz do Iguaçu e realizamos o transfer de ida e volta para hotéis ou pontos comerciais de Ciudad del Este.",
            srv5_title: "Transfer para Airbnbs",
            srv5_desc: "Alugou uma casa ou apartamento por temporada? Oferecemos um serviço especializado de transfer para buscar você e seus acompanhantes com todas as bagagens, deixando vocês na porta do seu Airbnb com tranquilidade.",
            srv6_title: "Transporte Executivo",
            srv6_desc: "Veículo confortável com ar condicionado e motorista discreto para viagens de negócios, eventos corporativos ou turismo executivo.",
            how_tagline: "Passo a Passo",
            how_title: "Como Funciona Nosso Serviço?",
            how_desc: "Um processo simples, rápido e transparente do início ao fim.",
            step1_title: "Solicite seu orçamento",
            step1_desc: "Utilize nosso simulador rápido ou nos chame diretamente para preencher os dados do seu trajeto.",
            step2_title: "Receba o valor",
            step2_desc: "Veja instantaneamente a estimativa de tarifa calculada de forma justa e transparente.",
            step3_title: "Confirme via WhatsApp",
            step3_desc: "Seus dados são enviados prontos. Um consultor confirma seu agendamento e tira dúvidas em segundos.",
            step4_title: "Embarque com Segurança",
            step4_desc: "O motorista local credenciado aguarda você no local e horário combinados, com total pontualidade.",
            diff_tagline: "Por Que Nos Escolher?",
            diff_title: "Diferenciais que Garantem sua Paz de Espírito",
            diff_desc: "Focamos na máxima qualidade de atendimento e segurança na travessia da ponte internacional.",
            diff1_title: "Preço Fixo",
            diff1_desc: "Sem surpresas desagradáveis na hora de pagar. A tarifa combinada inclui todas as taxas de aduana e fronteira.",
            diff2_title: "Atendimento Rápido",
            diff2_desc: "Suporte ágil 100% humanizado via WhatsApp para agendar, reagendar ou tirar dúvidas a qualquer hora.",
            diff3_title: "Porta-Malas Flexível",
            diff3_desc: "Contamos com bancos rebatíveis que liberam o espaço máximo para malas e compras em viagens de até 5 passageiros. Para grupos de 6 pessoas, priorizamos o conforto dos assentos a bordo.",
            diff4_title: "Veículos Confortáveis",
            diff4_desc: "Frota moderna com ar-condicionado potente, assentos limpos e higienizados para uma viagem agradável.",
            diff5_title: "Suporte Bilíngue",
            diff5_desc: "Atendimento completo em Português e Espanhol para facilitar a comunicação e trâmites na aduana.",
            diff6_title: "Motorista Local Experiente",
            diff6_desc: "Profissional que conhece perfeitamente as melhores rotas, horários de trânsito e atalhos na região da Ponte da Amizade.",
            diff7_title: "Segurança e Pontualidade",
            diff7_desc: "Compromisso rígido com seus horários de voo ou compromissos. Condução segura, defensiva e responsável.",
            pricing_tagline: "Tabela de Preços",
            pricing_title: "Valores de Referência",
            pricing_intro: "Tarifas estimadas para transfer privativo (veículo exclusivo). Os valores podem ser atualizados a qualquer momento.",
            th_route: "Origem / Destino",
            th_details: "Serviço / Detalhes",
            th_val: "Valor Estimado",
            th_action: "Ação",
            pricing_footer_text: "💡 Precisa de outra rota? Solicite um orçamento personalizado no simulador do topo ou converse conosco diretamente.",
            testimonials_tagline: "Depoimentos",
            testimonials_title: "O Que Nossos Clientes Dizem",
            testimonials_desc: "A satisfação e segurança de quem já viajou conosco na fronteira.",
            test1_text: "\"Excelente serviço! O motorista estava nos aguardando no aeroporto IGU com uma plaquinha. Carro super limpo, com ar-condicionado maravilhoso. Nos levou direto para o hotel em Ciudad del Este e deu ótimas dicas de compras. Recomendo muito!\"",
            test1_user_role: "Turista de São Paulo / SP",
            test2_text: "\"Contratei para fazer minha mudança de Foz para o Paraguai, pois passei em medicina. Fiquei preocupada com a quantidade de malas, mas o veículo era super amplo e o motorista ajudou com tudo, inclusive nos trâmites da aduana. Muito atencioso!\"",
            test2_user_role: "Estudante de Medicina em CDE",
            test3_text: "\"Utilizo sempre que vou fazer compras de eletrônicos no Paraguai. Deixo meu carro no hotel em Foz e vou com a Rota CDE. Preço justo, motorista educado e nos busca exatamente no local combinado na hora do retorno. Agilidade nota 10.\"",
            test3_user_role: "Comerciante de Curitiba / PR",
            faq_tagline: "Dúvidas Frequentes",
            faq_title: "Perguntas Frequentes",
            faq_desc: "Tire suas dúvidas rápidas sobre a travessia e nossos serviços de transfer.",
            faq1_q: "Posso levar malas?",
            faq1_a: "Sim, com certeza! Nossos veículos possuem porta-malas amplos e adequados para acomodar malas e caixas de compras de forma segura. Certifique-se apenas de preencher a quantidade de malas no formulário de cotação para que enviemos o veículo ideal para você.",
            faq2_q: "Posso fazer compras e retornar no mesmo dia?",
            faq2_a: "Sim! Temos o serviço de \"Compras no Paraguai\" com franquia de até 6 horas. O motorista leva você, aguarda ou combina um ponto de encontro e traz de volta com segurança para o seu hotel em Foz do Iguaçu no mesmo dia.",
            faq3_q: "Aceitam reais e guaranis?",
            faq3_a: "Sim, aceitamos pagamento em Reais (BRL), Pix, Dólares (USD) e Guaranis (PYG). A cotação da moeda estrangeira é feita no dia da viagem com base no câmbio local de turismo.",
            faq4_q: "Atendem aos finais de semana?",
            faq4_a: "Sim, atendemos todos os dias da semana, incluindo sábados, domingos e feriados. Recomendamos apenas reservar com antecedência para garantir a disponibilidade de veículos nos dias de maior movimento na fronteira.",
            faq5_q: "Fazem transporte para quem está se mudando para o Paraguai?",
            faq5_a: "Sim. Temos ampla experiência no transporte de estudantes e profissionais que estão se mudando para o Paraguai (Ciudad del Este, Presidente Franco, Hernandarias). Ajudamos no deslocamento de malas grandes e caixas e orientamos quanto aos documentos exigidos na aduana.",
            cta_title: "Reserve seu transfer agora",
            cta_subtitle: "Atendimento rápido, cotação sem compromisso e confirmação imediata pelo WhatsApp.",
            btn_cta_whatsapp: "Falar com Atendente no WhatsApp",
            footer_slogan: "\"Sua conexão entre Foz e Ciudad del Este.\"",
            footer_nav_title: "Navegação",
            footer_contact_title: "Contato e Reservas",
            footer_contact_loc: "📍 Atendimento em Foz do Iguaçu / PR e Ciudad del Este / PY",
            footer_contact_email: "✉️ Email: contato@rotacdetransfer.com.br",
            footer_rights: "© 2026 Rota CDE Transfer. Todos os direitos reservados.",
            footer_dev: "Site feito por GDS Design",
            btn_reserve: "Reservar",
            val_sob_consulta: "Sob Consulta"
        },
        es: {
            nav_servicos: "Servicios",
            nav_como_funciona: "Cómo Funciona",
            nav_diferenciais: "Diferenciales",
            nav_precos: "Precios",
            nav_faq: "Dudas",
            header_wa: "Hablar por WhatsApp",
            hero_badge: "Su conexión premium Brasil ⇄ Paraguay",
            hero_title: "Transfer Privado entre Foz de Iguazú y Ciudad del Este",
            hero_subtitle: "Compras, Aeropuerto, Terminal y Airbnbs con comodidad, seguridad y atención personalizada.",
            hero_btn_quote: "Solicitar Presupuesto",
            hero_btn_wa: "Hablar por WhatsApp",
            quote_title: "Cotización Rápida",
            quote_desc: "Calcule ahora el valor estimado de su transfer.",
            label_origem: "Origen",
            opt_select_origem: "Seleccione el origen",
            opt_foz_centro: "Foz de Iguazú (Centro)",
            opt_hotel_foz: "Hotel / Airbnb en Foz",
            opt_aeroporto_foz: "Aeropuerto de Foz (IGU)",
            opt_rodoviaria_foz: "Terminal de Foz de Iguazú",
            opt_cde: "Ciudad del Este",
            opt_hotel_cde: "Hotel / Airbnb en Ciudad del Este",
            opt_assuncao: "Asunción",
            opt_santa_rita: "Santa Rita",
            opt_encarnacao: "Encarnación",
            opt_outro: "Otro lugar (Personalizado)",
            label_destino: "Destino",
            opt_select_destino: "Seleccione el destino",
            opt_compras_6h: "Compras Paraguay — hasta 6 horas",
            opt_compras_4h: "Compras Paraguay — hasta 4 horas",
            label_data: "Fecha",
            label_passageiros: "Pasajeros",
            label_malas: "Maletas",
            btn_calculate: "Calcular Valor",
            result_label: "Valor Estimado:",
            result_note: "Valor aproximado. Consulte con nuestro equipo por WhatsApp para obtener una cotización personalizada.",
            btn_whatsapp_submit: "Confirmar y Reservar en WhatsApp",
            services_tagline: "Nuestras Rutas y Servicios",
            services_title: "Soluciones de Transporte a Medida",
            services_desc: "Conectando Brasil y Paraguay con la comodidad y rapidez que usted se merece.",
            srv1_title: "Compras en Ciudad del Este",
            srv1_desc: "Vaya de compras con total tranquilidad. Lo llevamos a los principales centros comerciales y lo buscamos de manera segura, sin preocuparse por estacionamiento o el tráfico de la frontera.",
            srv2_title: "Aeropuerto IGU → Ciudad del Este",
            srv2_desc: "¿Llega por el Aeropuerto Internacional de Foz de Iguazú? Nuestro conductor lo estará esperando en la salida para llevarlo directo a su destino en Paraguay.",
            srv3_title: "Terminal de Foz → Ciudad del Este",
            srv3_desc: "Transfer práctico desde la terminal de ómnibus de Foz de Iguazú. Puntualidad garantizada para que no pierda tiempo en su viaje.",
            srv4_title: "Hoteles → Ciudad del Este",
            srv4_desc: "Lo buscamos en la puerta de su hotel en Foz de Iguazú y realizamos el traslado de ida y vuelta a hoteles o puntos comerciales de Ciudad del Este.",
            srv5_title: "Transfer para Airbnbs",
            srv5_desc: "¿Alquiló una casa o apartamento por temporada? Ofrecemos un servicio especializado de transfer para buscarlo a usted y a sus acompañantes con todo el equipaje, dejándolos en la puerta de su Airbnb con total tranquilidad.",
            srv6_title: "Transporte Ejecutivo",
            srv6_desc: "Vehículo confortable con aire acondicionado potente y conductor discreto para viajes de negocios, eventos corporativos o turismo ejecutivo.",
            how_tagline: "Paso a Paso",
            how_title: "¿Cómo Funciona Nuestro Servicio?",
            how_desc: "Un proceso simple, rápido y transparente de principio a fin.",
            step1_title: "Solicite su presupuesto",
            step1_desc: "Utilice nuestro simulador rápido o llámenos directamente para completar los datos de su trayecto.",
            step2_title: "Reciba el valor",
            step2_desc: "Vea instantáneamente la estimación de la tarifa calculada de forma justa y transparente.",
            step3_title: "Confirme por WhatsApp",
            step3_desc: "Sus datos se envían listos. Un asesor confirma su reserva y aclara sus dudas en segundos.",
            step4_title: "Viaje con Seguridad",
            step4_desc: "El conductor local autorizado lo espera en el lugar y horario acordados, con total puntualidad.",
            diff_tagline: "¿Por Qué Elegirnos?",
            diff_title: "Diferenciales que Garantizan su Tranquilidad",
            diff_desc: "Nos enfocamos en la máxima calidad de servicio y seguridad en el cruce del puente internacional.",
            diff1_title: "Precio Fijo",
            diff1_desc: "Sin sorpresas desagradables al pagar. La tarifa acordada incluye todas las tasas de aduana y frontera.",
            diff2_title: "Atención Rápida",
            diff2_desc: "Soporte rápido 100% humanizado a través de WhatsApp para reservar, reprogramar o aclarar dudas en cualquier momento.",
            diff3_title: "Equipaje Flexible",
            diff3_desc: "Contamos con asientos abatibles que liberan el máximo espacio para maletas y compras en viajes de hasta 5 pasajeros. Para grupos de 6 personas, priorizamos la comodidad de los asientos a bordo.",
            diff4_title: "Vehículos Cómodos",
            diff4_desc: "Flota moderna con potente aire acondicionado, asientos limpos e higienizados para un viaje placentero.",
            diff5_title: "Soporte Bilingüe",
            diff5_desc: "Atención completa en Portugués y Español para facilitar la comunicación y los trámites en la aduana.",
            diff6_title: "Conductor Local Experto",
            diff6_desc: "Profesional que conoce perfectamente las mejores rutas, horarios de tráfico y atajos en la región del Puente de la Amistad.",
            diff7_title: "Seguridad y Puntualidad",
            diff7_desc: "Compromiso estricto con sus horarios de vuelo o citas. Conducción segura, defensiva y responsable.",
            pricing_tagline: "Tabla de Precios",
            pricing_title: "Valores de Referencia",
            pricing_intro: "Tarifas estimadas para transfer privado (vehículo exclusivo). Los valores pueden actualizarse en cualquier momento.",
            th_route: "Origen / Destino",
            th_details: "Servicio / Detalles",
            th_val: "Valor Estimado",
            th_action: "Acción",
            pricing_footer_text: "💡 ¿Necesita otra ruta? Solicite un presupuesto personalizado en el simulador de arriba o hable directamente con nosotros.",
            testimonials_tagline: "Testimonios",
            testimonials_title: "Lo Que Dicen Nuestros Clientes",
            testimonials_desc: "La satisfacción y seguridad de quienes ya viajaron con nosotros en la frontera.",
            test1_text: "\"¡Excelente servicio! El conductor nos estaba esperando en el aeropuerto IGU con un cartel. Auto súper limpio, con aire acondicionado maravilloso. Nos llevó directo al hotel en Ciudad del Este y nos dio excelentes consejos de compra. ¡Lo recomiendo mucho!\"",
            test1_user_role: "Turista de São Paulo / SP",
            test2_text: "\"Lo contraté para hacer mi mudanza de Foz a Paraguay, ya que entré a estudiar medicina. Estaba preocupada por la cantidad de maletas, pero el vehículo era súper espacioso y el conductor ayudó con todo, incluso con los trámites de aduana. ¡Muy atento!\"",
            test2_user_role: "Estudiante de Medicina en CDE",
            test3_text: "\"Lo uso cada vez que voy a comprar productos electrónicos en Paraguay. Dejo mi auto en el hotel en Foz y voy con Rota CDE. Precio justo, conductor educado y nos busca exactamente en el lugar acordado al regresar. Agilidad de 10.\"",
            test3_user_role: "Comerciante de Curitiba / PR",
            faq_tagline: "Preguntas Frecuentes",
            faq_title: "Preguntas Frecuentes",
            faq_desc: "Aclare sus dudas rápidas sobre el cruce y nuestros servicios de traslado.",
            faq1_q: "¿Puedo llevar equipaje?",
            faq1_a: "¡Sí, por supuesto! Nuestros vehículos tienen maleteros amplios y adecuados para acomodar equipaje y cajas de compras de forma segura. Asegúrese de indicar la cantidad de maletas en el formulario de cotización para que le enviemos el vehículo ideal.",
            faq2_q: "¿Puedo comprar y regresar el mismo día?",
            faq2_a: "¡Sí! Contamos con el servicio de \"Compras en Paraguay\" con un tiempo de espera de hasta 6 horas. El conductor lo lleva, espera o coordina un punto de encuentro y lo trae de regreso con seguridad a su hotel en Foz de Iguazú el mismo día.",
            faq3_q: "¿Aceptan reales y guaraníes?",
            faq3_a: "Sí, aceptamos pagos en Reais (BRL), Pix, Dólares (USD) y Guaraníes (PYG). La cotización de la moneda extranjera se calcula el día del viaje con base en el tipo de cambio turístico local.",
            faq4_q: "¿Atienden los fines de semana?",
            faq4_a: "Sí, atendemos todos los días de la semana, incluidos sábados, domingos y feriados. Recomendamos reservar con anticipación para garantizar la disponibilidad del vehículo en los días de mayor movimiento en la frontera.",
            faq5_q: "¿Realizan transporte para quienes se mudan a Paraguay?",
            faq5_a: "Sí. Tenemos amplia experiencia en el traslado de estudiantes y profesionales que se mudan a Paraguay (Ciudad del Este, Presidente Franco, Hernandarias). Ayudamos con el traslado de maletas grandes y cajas y orientamos sobre los documentos requeridos en la aduana.",
            cta_title: "Reserve su transfer ahora",
            cta_subtitle: "Atención rápida, cotización sin compromiso y confirmación inmediata por WhatsApp.",
            btn_cta_whatsapp: "Hablar con un Agente por WhatsApp",
            footer_slogan: "\"Su conexión entre Foz y Ciudad del Este.\"",
            footer_nav_title: "Navegación",
            footer_contact_title: "Contacto y Reservas",
            footer_contact_loc: "📍 Atención en Foz de Iguazú / PR y Ciudad del Este / PY",
            footer_contact_email: "✉️ Correo: contato@rotacdetransfer.com.br",
            footer_rights: "© 2026 Rota CDE Transfer. Todos los derechos reservados.",
            footer_dev: "Sitio hecho por GDS Design",
            btn_reserve: "Reservar",
            val_sob_consulta: "Bajo Consulta"
        },
        en: {
            nav_servicos: "Services",
            nav_como_funciona: "How It Works",
            nav_diferenciais: "Differentiators",
            nav_precos: "Prices",
            nav_faq: "FAQ",
            header_wa: "Talk on WhatsApp",
            hero_badge: "Your premium connection Brazil ⇄ Paraguay",
            hero_title: "Private Transfer between Foz do Iguaçu and Ciudad del Este",
            hero_subtitle: "Shopping, Airport, Bus Station, and Airbnbs with comfort, safety, and personalized service.",
            hero_btn_quote: "Request a Quote",
            hero_btn_wa: "Talk on WhatsApp",
            quote_title: "Quick Quote",
            quote_desc: "Calculate the estimated value of your transfer now.",
            label_origem: "Origin",
            opt_select_origem: "Select origin",
            opt_foz_centro: "Foz do Iguaçu (Downtown)",
            opt_hotel_foz: "Hotel / Airbnb in Foz",
            opt_aeroporto_foz: "Foz Airport (IGU)",
            opt_rodoviaria_foz: "Foz do Iguaçu Bus Station",
            opt_cde: "Ciudad del Este",
            opt_hotel_cde: "Hotel / Airbnb in Ciudad del Este",
            opt_assuncao: "Asunción",
            opt_santa_rita: "Santa Rita",
            opt_encarnacao: "Encarnación",
            opt_outro: "Other location (Custom)",
            label_destino: "Destination",
            opt_select_destino: "Select destination",
            opt_compras_6h: "Paraguay Shopping — up to 6 hours",
            opt_compras_4h: "Paraguay Shopping — up to 4 hours",
            label_data: "Date",
            label_passageiros: "Passengers",
            label_malas: "Baggage",
            btn_calculate: "Calculate Value",
            result_label: "Estimated Value:",
            result_note: "Approximate value. Contact our team on WhatsApp to receive a personalized quote.",
            btn_whatsapp_submit: "Confirm and Book on WhatsApp",
            services_tagline: "Our Routes & Services",
            services_title: "Tailored Transportation Solutions",
            services_desc: "Connecting Brazil and Paraguay with the convenience and speed you deserve.",
            srv1_title: "Shopping in Ciudad del Este",
            srv1_desc: "Go shopping with peace of mind. We take you to the main shopping malls and pick you up safely, without worrying about parking or border traffic.",
            srv2_title: "IGU Airport → Ciudad del Este",
            srv2_desc: "Arriving via Foz do Iguaçu International Airport? Our driver will be waiting at arrivals to take you directly to your destination in Paraguay.",
            srv3_title: "Foz Bus Station → Ciudad del Este",
            srv3_desc: "Practical transfer from Foz do Iguaçu bus terminal. Guaranteed punctuality so you don't waste time on your trip.",
            srv4_title: "Hotels → Ciudad del Este",
            srv4_desc: "We pick you up at your hotel door in Foz do Iguaçu and perform the round trip transfer to hotels or shopping areas in Ciudad del Este.",
            srv5_title: "Transfer for Airbnbs",
            srv5_desc: "Rented a house or apartment for the season? We offer a specialized transfer service to pick you and your companions up with all the luggage, dropping you at your Airbnb door with ease.",
            srv6_title: "Executive Transport",
            srv6_desc: "Comfortable vehicle with powerful air conditioning and a discrete driver for business trips, corporate events, or executive tourism.",
            how_tagline: "Step by Step",
            how_title: "How Does Our Service Work?",
            how_desc: "A simple, fast, and transparent process from start to finish.",
            step1_title: "Request your quote",
            step1_desc: "Use our quick simulator or call us directly to fill in your route details.",
            step2_title: "Get the price",
            step2_desc: "Instantly see the estimated fare calculated in a fair and transparent way.",
            step3_title: "Confirm via WhatsApp",
            step3_desc: "Your data is sent ready. A consultant confirms your booking and answers questions in seconds.",
            step4_title: "Board Safely",
            step4_desc: "The credentialed local driver awaits you at the agreed time and place, with total punctuality.",
            diff_tagline: "Why Choose Us?",
            diff_title: "Differentiators that Guarantee Your Peace of Mind",
            diff_desc: "We focus on maximum service quality and safety when crossing the international bridge.",
            diff1_title: "Fixed Price",
            diff1_desc: "No unpleasant surprises when paying. The agreed fare includes all customs and border fees.",
            diff2_title: "Fast Support",
            diff2_desc: "Responsive 100% human support via WhatsApp to book, reschedule, or ask questions at any time.",
            diff3_title: "Flexible Trunk",
            diff3_desc: "We have folding seats that free up maximum space for luggage and shopping on trips of up to 5 passengers. For groups of 6 people, we prioritize the comfort of the seats on board.",
            diff4_title: "Comfortable Vehicles",
            diff4_desc: "Modern fleet with powerful air conditioning, clean and sanitized seats for a pleasant trip.",
            diff5_title: "Bilingual Support",
            diff5_desc: "Full assistance in Portuguese and Spanish to facilitate communication and customs procedures.",
            diff6_title: "Experienced Local Driver",
            diff6_desc: "Professional who knows perfectly the best routes, traffic times, and shortcuts in the Friendship Bridge area.",
            diff7_title: "Safety and Punctuality",
            diff7_desc: "Strict commitment to your flight schedules or appointments. Safe, defensive, and responsible driving.",
            pricing_tagline: "Pricing Table",
            pricing_title: "Reference Values",
            pricing_intro: "Estimated rates for private transfer (exclusive vehicle). Values can be updated at any time.",
            th_route: "Origin / Destination",
            th_details: "Service / Details",
            th_val: "Estimated Value",
            th_action: "Action",
            pricing_footer_text: "💡 Need another route? Request a custom quote in the simulator above or chat with us directly.",
            testimonials_tagline: "Testimonials",
            testimonials_title: "What Our Clients Say",
            testimonials_desc: "The satisfaction and security of those who have already traveled with us at the border.",
            test1_text: "\"Excellent service! The driver was waiting for us at IGU airport with a sign. Super clean car, with wonderful air conditioning. Took us straight to the hotel in Ciudad del Este and gave great shopping tips. Highly recommended!\"",
            test1_user_role: "Tourist from São Paulo / SP",
            test2_text: "\"I hired them to make my move from Foz to Paraguay, as I passed for medical school. I was worried about the amount of luggage, but the vehicle was super spacious and the driver helped with everything, including customs procedures. Very attentive!\"",
            test2_user_role: "Medical Student in CDE",
            test3_text: "\"I use them every time I buy electronics in Paraguay. I leave my car at the hotel in Foz and go with Rota CDE. Fair price, polite driver, and picks us up exactly at the agreed location upon return. 10/10 speed.\"",
            test3_user_role: "Merchant from Curitiba / PR",
            faq_tagline: "FAQ",
            faq_title: "Frequently Asked Questions",
            faq_desc: "Get quick answers to your questions about the crossing and our transfer services.",
            faq1_q: "Can I bring luggage?",
            faq1_a: "Yes, definitely! Our vehicles have large, suitable trunks to safely accommodate luggage and shopping boxes. Just make sure to fill in the amount of baggage on the quote form so we send the ideal vehicle for you.",
            faq2_q: "Can I shop and return on the same day?",
            faq2_a: "Yes! We have the \"Paraguay Shopping\" service with a franchise of up to 6 hours. The driver takes you, waits or coordinates a meeting point, and brings you back safely to your hotel in Foz do Iguaçu on the same day.",
            faq3_q: "Do you accept reals and guaranis?",
            faq3_a: "Yes, we accept payment in Reais (BRL), Pix, US Dollars (USD), and Guaranis (PYG). The foreign currency quote is calculated on the day of travel based on the local tourist exchange rate.",
            faq4_q: "Do you serve on weekends?",
            faq4_a: "Yes, we serve every day of the week, including Saturdays, Sundays, and holidays. We only recommend booking in advance to guarantee vehicle availability on the busiest border days.",
            faq5_q: "Do you transport people moving to Paraguay?",
            faq5_a: "Yes. We have extensive experience in transporting students and professionals moving to Paraguay (Ciudad del Este, President Franco, Hernandarias). We help with moving large bags and boxes and guide you on the documents required at customs.",
            cta_title: "Book your transfer now",
            cta_subtitle: "Fast service, free quote, and immediate confirmation via WhatsApp.",
            btn_cta_whatsapp: "Talk to an Agent on WhatsApp",
            footer_slogan: "\"Your connection between Foz and Ciudad del Este.\"",
            footer_nav_title: "Navigation",
            footer_contact_title: "Contact and Bookings",
            footer_contact_loc: "📍 Services in Foz do Iguaçu / BR and Ciudad del Este / PY",
            footer_contact_email: "✉️ Email: contato@rotacdetransfer.com.br",
            footer_rights: "© 2026 Rota CDE Transfer. All rights reserved.",
            footer_dev: "Site made by GDS Design",
            btn_reserve: "Book",
            val_sob_consulta: "On Request"
        }
    };

    let currentLang = localStorage.getItem('rota_lang') || 'pt';

    function translatePage(lang) {
        currentLang = lang;
        localStorage.setItem('rota_lang', lang);
        
        if (langSelector) {
            langSelector.value = lang;
        }

        // Translate HTML document attribute
        document.documentElement.lang = lang === 'en' ? 'en' : (lang === 'es' ? 'es' : 'pt-BR');

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = TRANSLATIONS[lang][key];
            if (translation) {
                if (el.tagName === 'OPTION') {
                    el.textContent = translation;
                } else if (el.tagName === 'INPUT' && (el.type === 'submit' || el.type === 'button')) {
                    el.value = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
        
        renderPricingTable();
        updateWhatsAppLinks();
    }

    if (langSelector) {
        langSelector.value = currentLang;
        langSelector.addEventListener('change', (e) => {
            translatePage(e.target.value);
        });
    }

    // --- Scroll & Header Style ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-item');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Format Currency Helper ---
    function formatCurrency(value) {
        if (value === 0) {
            return TRANSLATIONS[currentLang]['val_sob_consulta'] || "Sob Consulta";
        }
        const locale = currentLang === 'en' ? 'en-US' : (currentLang === 'es' ? 'es-ES' : 'pt-BR');
        return new Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' }).format(value);
    }

    // --- Update Dynamic WhatsApp Links on the Page ---
    function updateWhatsAppLinks() {
        let textDefault = "Olá! Gostaria de informações sobre o transfer para Ciudad del Este.";
        let textReserve = "Olá! Gostaria de fazer uma reserva de transfer agora.";

        if (currentLang === 'es') {
            textDefault = "¡Hola! Me gustaría obtener información sobre el traslado a Ciudad del Este.";
            textReserve = "¡Hola! Me gustaría hacer una reserva de traslado ahora.";
        } else if (currentLang === 'en') {
            textDefault = "Hello! I would like information about the transfer to Ciudad del Este.";
            textReserve = "Hello! I would like to make a transfer booking now.";
        }

        const textDefaultEnc = encodeURIComponent(textDefault);
        const textReserveEnc = encodeURIComponent(textReserve);
        
        // Update header nav link
        const navWaBtn = document.querySelector('.btn-nav');
        if (navWaBtn) navWaBtn.href = `https://wa.me/${currentPhone}?text=${textDefaultEnc}`;

        // Update hero floating buttons and CTAs
        const heroWaBtn = document.querySelector('.hero-buttons .btn-secondary');
        if (heroWaBtn) heroWaBtn.href = `https://wa.me/${currentPhone}?text=${textDefaultEnc}`;

        const ctaWaBtn = document.querySelector('.btn-cta-whatsapp');
        if (ctaWaBtn) ctaWaBtn.href = `https://wa.me/${currentPhone}?text=${textReserveEnc}`;

        // Update floating button
        if (whatsappFloatingBtn) whatsappFloatingBtn.href = `https://wa.me/${currentPhone}?text=${textDefaultEnc}`;
    }

    // --- Render Pricing Table ---
    function renderPricingTable() {
        if (!pricingTableBody) return;
        pricingTableBody.innerHTML = "";

        const btnText = TRANSLATIONS[currentLang]['btn_reserve'] || "Reservar";

        prices.forEach(item => {
            const tr = document.createElement('tr');
            
            const priceDisplay = formatCurrency(item.price);
            
            // Build custom wa link for this specific item
            let itemWaTextVal = `Olá! Gostaria de reservar o transfer: ${item.name} (${priceDisplay}).`;
            if (currentLang === 'es') {
                itemWaTextVal = `¡Hola! Me gustaría reservar el traslado: ${item.name} (${priceDisplay}).`;
            } else if (currentLang === 'en') {
                itemWaTextVal = `Hello! I would like to book the transfer: ${item.name} (${priceDisplay}).`;
            }

            const itemWaText = encodeURIComponent(itemWaTextVal);
            const waUrl = `https://wa.me/${currentPhone}?text=${itemWaText}`;

            tr.innerHTML = `
                <td class="td-route">${item.name}</td>
                <td>${item.desc}</td>
                <td class="td-price text-right">${priceDisplay}</td>
                <td class="text-center">
                    <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-table-cta">${btnText}</a>
                </td>
            `;
            pricingTableBody.appendChild(tr);
        });
    }

    // --- Quote Calculator Logic ---
    if (quoteForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('data');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            dateInput.value = today;
        }

        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const origem = document.getElementById('origem').value;
            const destino = document.getElementById('destino').value;
            const dataVal = document.getElementById('data').value;
            const passageiros = document.getElementById('passageiros').value;
            const malas = document.getElementById('malas').value;

            let finalPrice = 0;
            let routeKey = "";

            // Normalize: treat Hotel/Airbnb options as their base city for routing
            const isFozSide = (
                origem === "Foz Centro" || origem === "Hotel/Airbnb Foz" ||
                destino === "Foz Centro" || destino === "Hotel/Airbnb Foz"
            );
            const isAeroporto = (origem === "Aeroporto IGU" || destino === "Aeroporto IGU");
            const isRodoviaria = (origem === "Rodoviária de Foz" || destino === "Rodoviária de Foz");
            const isCdeSide = (
                origem === "Ciudad del Este" || origem === "Hotel/Airbnb CDE" ||
                destino === "Ciudad del Este" || destino === "Hotel/Airbnb CDE"
            );
            const isCompras6h = (destino === "Compras 6h" || origem === "Compras 6h");
            const isCompras4h = (destino === "Compras 4h" || origem === "Compras 4h");
            const isLongRoute = (
                origem === "Assunção" || destino === "Assunção" ||
                origem === "Santa Rita" || destino === "Santa Rita" ||
                origem === "Encarnação" || destino === "Encarnação"
            );

            // Avoid same place transfer
            if (origem === destino && origem !== "outro") {
                let alertMsg = "Por favor, selecione origem e destino diferentes.";
                if (currentLang === 'es') {
                    alertMsg = "Por favor, seleccione origen y destino diferentes.";
                } else if (currentLang === 'en') {
                    alertMsg = "Please select a different origin and destination.";
                }
                alert(alertMsg);
                return;
            }

            // Map to price key
            if (isCompras6h) {
                routeKey = "compras_6h";
            } else if (isCompras4h) {
                routeKey = "compras_4h";
            } else if (origem === "Assunção" || destino === "Assunção") {
                routeKey = "assuncao";
            } else if (origem === "Santa Rita" || destino === "Santa Rita") {
                routeKey = "santa_rita";
            } else if (origem === "Encarnação" || destino === "Encarnação") {
                routeKey = "encarnacao";
            } else if (isCdeSide) {
                if (isFozSide) {
                    routeKey = "foz_cde";
                } else if (isAeroporto) {
                    routeKey = "igu_cde";
                } else if (isRodoviaria) {
                    routeKey = "rod_cde";
                }
            }

            // Find price in state
            const priceItem = prices.find(p => p.id === routeKey);
            if (priceItem && priceItem.price > 0) {
                finalPrice = priceItem.price;
            }

            let estimateText = "";
            let basePrice = finalPrice;
            if (basePrice > 0) {
                if (parseInt(passageiros) > 4) {
                    finalPrice = Math.round(basePrice * 1.6);
                    let vanSuffix = " (Veículo Grande/Van)";
                    if (currentLang === 'es') vanSuffix = " (Vehículo Grande/Van)";
                    if (currentLang === 'en') vanSuffix = " (Large Vehicle/Van)";
                    estimateText = `R$ ${finalPrice},00${vanSuffix}`;
                } else {
                    estimateText = `R$ ${finalPrice},00`;
                }
            } else {
                estimateText = TRANSLATIONS[currentLang]['val_sob_consulta'] || "Sob Consulta";
            }


            // Format date for the message (pt-BR format)
            let formattedDate = dataVal;
            if (dataVal) {
                const parts = dataVal.split('-');
                if (parts.length === 3) {
                    formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
            }

            // Show Results
            resultPrice.textContent = estimateText;
            quoteResult.style.display = "block";

            // Get selected option texts for localized message
            const origemSelect = document.getElementById('origem');
            const destinoSelect = document.getElementById('destino');
            const origemLabel = origemSelect.options[origemSelect.selectedIndex].text;
            const destinoLabel = destinoSelect.options[destinoSelect.selectedIndex].text;

            // Prepare WhatsApp message
            let message = "";
            if (currentLang === 'es') {
                message = `¡Hola Rota CDE Transfer! Me gustaría reservar un traslado. Aquí están los datos de la cotización:
*Origen:* ${origemLabel}
*Destino:* ${destinoLabel}
*Fecha:* ${formattedDate}
*Pasajeros:* ${passageiros}
*Maletas:* ${malas}
*Valor Estimado:* ${estimateText}`;
            } else if (currentLang === 'en') {
                message = `Hello Rota CDE Transfer! I would like to book a transfer. Here are the details of the quote:
*Origin:* ${origemLabel}
*Destination:* ${destinoLabel}
*Date:* ${formattedDate}
*Passengers:* ${passageiros}
*Baggage:* ${malas}
*Estimated Value:* ${estimateText}`;
            } else {
                message = `Olá Rota CDE Transfer! Gostaria de reservar um transfer. Seguem os dados da cotação:
*Origem:* ${origemLabel}
*Destino:* ${destinoLabel}
*Data:* ${formattedDate}
*Passageiros:* ${passageiros}
*Malas:* ${malas}
*Valor Estimado:* ${estimateText}`;
            }

            btnContinueWhatsApp.href = `https://wa.me/${currentPhone}?text=${encodeURIComponent(message)}`;
            
            // Scroll result into view smoothly
            setTimeout(() => {
                quoteResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });
    }

    // --- FAQ Accordion Logic ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // --- Admin Modal Logic ---
    if (adminTrigger) {
        adminTrigger.addEventListener('click', () => {
            adminModal.classList.add('open');
            adminAuthSection.style.display = "block";
            adminEditSection.style.display = "none";
            adminPasswordInput.value = "";
            authErrorMsg.style.display = "none";
        });
    }

    if (adminModalClose) {
        adminModalClose.addEventListener('click', () => {
            adminModal.classList.remove('open');
        });
    }

    // Close modal when clicking outside contents
    window.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            adminModal.classList.remove('open');
        }
    });

    // Handle Authentication
    if (btnAdminAuth) {
        btnAdminAuth.addEventListener('click', () => {
            const password = adminPasswordInput.value;
            if (password === "rota123") {
                authSuccess();
            } else {
                authErrorMsg.style.display = "block";
            }
        });

        // Trigger on enter key
        adminPasswordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btnAdminAuth.click();
            }
        });
    }

    function authSuccess() {
        adminAuthSection.style.display = "none";
        adminEditSection.style.display = "block";
        
        // Populate form inputs
        adminInputsContainer.innerHTML = "";
        prices.forEach((item, index) => {
            // Do not show customizable text or allow edit for customized item if it's dynamic
            const container = document.createElement('div');
            container.className = "form-group admin-price-row";
            
            container.innerHTML = `
                <label for="price_${item.id}">${item.name}</label>
                <input type="number" id="price_${item.id}" name="${item.id}" value="${item.price}" min="0" class="form-control" required>
            `;
            adminInputsContainer.appendChild(container);
        });

        // Populate phone number field
        if (adminPhoneInput) {
            adminPhoneInput.value = currentPhone;
        }
    }

    // Save Admin Changes
    if (adminPriceForm) {
        adminPriceForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Read prices
            prices = prices.map(item => {
                const input = document.getElementById(`price_${item.id}`);
                if (input) {
                    return {
                        ...item,
                        price: parseFloat(input.value) || 0
                    };
                }
                return item;
            });

            // Read phone
            if (adminPhoneInput) {
                let phoneVal = adminPhoneInput.value.replace(/\D/g, ""); // Keep only numbers
                if (phoneVal.length >= 10) {
                    currentPhone = phoneVal;
                    localStorage.setItem('rota_cde_phone', currentPhone);
                } else {
                    alert("Por favor, digite um número de WhatsApp válido contendo DDI e DDD (somente números).");
                    return;
                }
            }

            // Save to LocalStorage
            localStorage.setItem('rota_cde_prices', JSON.stringify(prices));
            
            // Re-render and notify
            renderPricingTable();
            updateWhatsAppLinks();
            
            alert("Alterações salvas com sucesso!");
            adminModal.classList.remove('open');

            // Force recalculate if form was calculated
            if (quoteResult.style.display === "block") {
                quoteForm.dispatchEvent(new Event('submit'));
            }
        });
    }

    if (btnAdminCancel) {
        btnAdminCancel.addEventListener('click', () => {
            adminModal.classList.remove('open');
        });
    }

    // --- Initialization ---
    translatePage(currentLang);
});
