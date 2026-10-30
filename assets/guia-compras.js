// ============================================================================
// ROTA CDE TRANSFER - GUIA DE COMPRAS NO PARAGUAI (MOTOR PRINCIPAL REFINADO)
// ============================================================================

const LOCAL_STORAGE_ROUTE_KEY = "transfer_shopping_route";

// Lista fallback de categorias padronizadas
const FALLBACK_CATEGORIES = [
    { id: "cat-1", name: "Eletrônicos", slug: "eletronicos", icon: "📱", description: "Celulares, câmeras, áudio e eletrodomésticos" },
    { id: "cat-2", name: "Informática", slug: "informatica", icon: "💻", description: "Notebooks, hardware e periféricos" },
    { id: "cat-3", name: "Games", slug: "games", icon: "🎮", description: "Consoles, jogos e acessórios gamer" },
    { id: "cat-4", name: "Perfumes e Beleza", slug: "perfumes-e-beleza", icon: "💄", description: "Perfumes importados e cosméticos" },
    { id: "cat-5", name: "Moda", slug: "moda", icon: "👕", description: "Roupas e marcas internacionais" },
    { id: "cat-6", name: "Calçados", slug: "calcados", icon: "👟", description: "Tênis esportivos e sapatos" },
    { id: "cat-7", name: "Casa e Decoração", slug: "casa-e-decoracao", icon: "🏠", description: "Utensílios domésticos e decoração" },
    { id: "cat-8", name: "Bebidas", slug: "bebidas", icon: "🥃", description: "Vinhos, whiskies e bebidas finas" },
    { id: "cat-9", name: "Loja de Departamento", slug: "loja-de-departamento", icon: "🛒", description: "Lojas completas com múltiplos setores" },
    { id: "cat-10", name: "Variedades", slug: "variedades", icon: "📦", description: "Presentes, brinquedos e utilidades" },
    { id: "cat-11", name: "Destaques", slug: "destaques", icon: "⭐", description: "Lojas mais recomendadas em CDE" }
];

// Lista fallback de lojas com localizações reais verificadas no Google Maps
const FALLBACK_STORES = [
    {
        id: "store-1",
        name: "Shopping China",
        slug: "shopping-china",
        short_description: "A maior e mais premiada loja de departamentos da América Latina em Ciudad del Este.",
        description: "O Shopping China é referência mundial em compras no Paraguai. Localizado no 3º piso do Shopping Paris, oferece produtos 100% originais divididos em setores de eletrônicos, cosméticos, bebidas, moda, informática e utilidades.",
        address: "Av. Luis Maria Argaña, Shopping Paris - 3º Piso",
        city: "Ciudad del Este",
        neighborhood: "Centro",
        latitude: -25.5132,
        longitude: -54.6064,
        phone: "+595 61 501 400",
        whatsapp: "+595 983 501 400",
        website: "https://www.shoppingchina.com.py",
        instagram: "@shoppingchinaparaguay",
        opening_hours: "Segunda a Domingo: 07:00 às 19:00",
        image_url: "https://100fronteiras.com/wp-content/uploads/2022/12/Fachada-Shopping-China-CDE-OFICIAL-e1672146116149.jpeg",
        active: true,
        featured: true,
        category_slugs: ["loja-de-departamento", "eletronicos", "perfumes-e-beleza", "destaques"]
    },
    {
        id: "store-2",
        name: "Nissei",
        slug: "nissei",
        short_description: "Especialista em tecnologia, celulares, câmeras e eletrônicos de ponta.",
        description: "A Nissei é uma das lojas mais tradicionais de Ciudad del Este, reconhecida pelo excelente atendimento, garantia e variedade em marcas renomadas como Apple, Samsung, Sony, Canon e Xiaomi.",
        address: "Av. Adrián Jara esquina Regimiento Piribebuy",
        city: "Ciudad del Este",
        neighborhood: "Centro",
        latitude: -25.5101,
        longitude: -54.6095,
        phone: "+595 61 500 111",
        whatsapp: "+595 983 500 111",
        website: "https://nissei.com",
        instagram: "@nisseiparaguay",
        opening_hours: "Segunda a Sábado: 06:30 às 16:00 | Domingo: 08:00 às 16:00",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjR5Nk78wE0zq2nH3S_0MKhZ-3IV26ZX_Zvibcm6HMTalt8RhX9p0lhug&s=10",
        active: true,
        featured: true,
        category_slugs: ["eletronicos", "informatica", "games", "destaques"]
    },
    {
        id: "store-3",
        name: "Cellshop Importados",
        slug: "cellshop",
        short_description: "Ampla variedade de eletrônicos, perfumes, bebidas e artigos esportivos.",
        description: "Com vários andares dedicados ao consumo inteligente, a Cellshop traz o melhor da tecnologia, moda esportiva, suplementos, brinquedos e perfumes das marcas mais desejadas do mundo.",
        address: "Av. Carlos Antonio López esquina Monseñor Rodríguez",
        city: "Ciudad del Este",
        neighborhood: "Centro",
        latitude: -25.5104,
        longitude: -54.6107,
        phone: "+595 61 501 000",
        whatsapp: "+595 983 600 000",
        website: "https://www.cellshop.com",
        instagram: "@cellshoppy",
        opening_hours: "Segunda a Sábado: 06:30 às 16:00 | Domingo: 08:00 às 14:00",
        image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
        active: true,
        featured: true,
        category_slugs: ["loja-de-departamento", "eletronicos", "bebidas", "destaques"]
    },
    {
        id: "store-4",
        name: "Elegancia Perfumaria",
        slug: "elegancia-perfumaria",
        short_description: "Referência em perfumes importados, maquiagem e cosméticos originais.",
        description: "A Elegancia Perfumaria oferece os últimos lançamentos em alta perfumaria internacional, tratamentos para a pele e maquiagens exclusivas com atestado de procedência original.",
        address: "Edifício Victoria, Av. Adrián Jara esquina Calle Abay",
        city: "Ciudad del Este",
        neighborhood: "Centro",
        latitude: -25.5110,
        longitude: -54.6115,
        phone: "+595 61 512 345",
        whatsapp: "+595 983 512 345",
        website: "https://eleganciaparaguay.com",
        instagram: "@eleganciaperfumaria",
        opening_hours: "Segunda a Sábado: 07:00 às 15:30",
        image_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
        active: true,
        featured: false,
        category_slugs: ["perfumes-e-beleza"]
    },
    {
        id: "store-5",
        name: "S.A. Shop",
        slug: "sa-shop",
        short_description: "Loja com departamento completo de roupas, calçados e maquiagens.",
        description: "Localizada estrategicamente no Shopping Galeria e com filial no Shopping Paris, a SA Shop combina moda de marcas internacionais com promoções diárias imbatíveis.",
        address: "Av. Monseñor Rodríguez, Shopping Galeria",
        city: "Ciudad del Este",
        neighborhood: "Centro",
        latitude: -25.5112,
        longitude: -54.6085,
        phone: "+595 61 500 999",
        whatsapp: "+595 983 500 999",
        website: "https://sashop.com.py",
        instagram: "@sashopparaguay",
        opening_hours: "Segunda a Sábado: 07:00 às 16:00",
        image_url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
        active: true,
        featured: false,
        category_slugs: ["moda", "calcados", "variedades"]
    },
    {
        id: "store-6",
        name: "La Petisquera (Matriz)",
        slug: "la-petisquera-tienda-la-petisquera-tienda-1",
        short_description: "Tradicional loja de perfumes, bebidas nobres e artigos de luxo importados.",
        description: "La Petisquera é um dos pontos mais tradicionais de compras no Paraguai desde 1970, especializada em whiskies raros, vinhos importados, charutos e perfumaria fina.",
        address: "Av. Monseñor Rodríguez esquina Av. Adrián Jara",
        city: "Ciudad del Este",
        neighborhood: "Centro",
        latitude: -25.5096,
        longitude: -54.6091,
        phone: "+595 61 500 120",
        whatsapp: "",
        website: "https://lapetisquera.com.py/",
        instagram: "@lapetisqueraoficial",
        opening_hours: "Segunda a Sábado: 06:30 às 16:30",
        image_url: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnhfYF0u2LlEMdWEm9G4LN32YPURkud4WOUsIyDyEQPnZT7Fgz-wjpTOxjY8GEk2QgpAoYX5HdDhmbg-VbzrN92c_JWO--zjGfKBmbDH8OlcmWvZ7ojr4a_7RI-OjSsdorsV4tVU8OzNEk=w408-h544-k-no",
        active: true,
        featured: true,
        category_slugs: ["bebidas", "perfumes-e-beleza", "destaques"]
    },
    {
        id: "store-7",
        name: "Shopping Itaipu",
        slug: "shopping-itaipu",
        short_description: "Centro comercial com variedade em eletrônicos, cosméticos e utilidades.",
        description: "Localizado no coração comercial de CDE, oferece diversas lojas e boxes com eletrônicos, vestuário e produtos de beleza a preços acessíveis.",
        address: "Av. Adrián Jara esquina Calle Rubio Ñu",
        city: "Ciudad del Este",
        neighborhood: "Centro",
        latitude: -25.5119,
        longitude: -54.6074,
        phone: "",
        whatsapp: "",
        website: "https://www.instagram.com/shoppingitaipuoficial",
        instagram: "@shoppingitaipuoficial",
        opening_hours: "Segunda a Sábado: 06:00 às 17:00",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUErDM0mk7fAzrHgowSl4c0OXGgxeAcUrQ4LwEaTYtjULnzY80qWqzjw&s=10",
        active: true,
        featured: false,
        category_slugs: ["variedades", "eletronicos"]
    },
    {
        id: "store-8",
        name: "28 de Julio Autoservicio",
        slug: "28-de-julio-autoservicio",
        short_description: "Artigos do cotidiano, utilidades para o lar e presentes com preços populares.",
        description: "Excelente para garimpar utilidades domésticas, itens de cozinha, artigos para bebês e presentes com excelente custo-benefício.",
        address: "Av. Adrián Jara esquina Av. Monseñor Rodríguez",
        city: "Ciudad del Este",
        neighborhood: "Centro",
        latitude: -25.5113,
        longitude: -54.6062,
        phone: "+595 61 505075",
        whatsapp: "+595 0981 468954",
        website: "https://28dejulio.com.py/",
        instagram: "@28dejuliopy",
        opening_hours: "Segunda a Sábado: 06:00 às 16:00",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6mtc-ASPjMtEYz-6cpMxBdkNgMXy0_1lDjqqJkS6FzhjmP5pznix-BNRy&s=10",
        active: true,
        featured: false,
        category_slugs: ["casa-e-decoracao", "variedades"]
    }
];

// Helper para obter URL direta de localização real no Google Maps
function getGoogleMapsUrl(store) {
    if (!store) return 'https://www.google.com/maps/search/?api=1&query=Ciudad+del+Este+Paraguay';
    if (store.latitude && store.longitude) {
        let lat = parseFloat(store.latitude);
        let lng = parseFloat(store.longitude);
        if (!isNaN(lng) && Math.abs(lng) > 180) {
            const s = String(store.longitude).replace('-', '');
            lng = -parseFloat(s.slice(0, 2) + '.' + s.slice(2));
        }
        if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
            return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        }
    }
    const q = store.address ? `${store.name}, ${store.address}, Ciudad del Este` : `${store.name}, Ciudad del Este`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

// Abre o roteiro completo no Google Maps (com waypoints ordenados a pé)
function openRouteInGoogleMaps() {
    if (selectedRouteStores.length === 0) {
        showToast("Adicione pelo menos uma loja ao seu roteiro para abrir no Google Maps.");
        return;
    }
    if (selectedRouteStores.length === 1) {
        window.open(getGoogleMapsUrl(selectedRouteStores[0]), '_blank');
        return;
    }
    const origin = encodeURIComponent(`${selectedRouteStores[0].name}, Ciudad del Este`);
    const destination = encodeURIComponent(`${selectedRouteStores[selectedRouteStores.length - 1].name}, Ciudad del Este`);
    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
    if (selectedRouteStores.length > 2) {
        const waypoints = selectedRouteStores.slice(1, -1).map(s => encodeURIComponent(`${s.name}, Ciudad del Este`)).join('|');
        url += `&waypoints=${waypoints}`;
    }
    window.open(url, '_blank');
}

// Estado Global
let allCategories = [];
let allStores = [];
let activeCategoryFilter = "todos";
let searchQuery = "";
let selectedRouteStores = [];
let leafletMap = null;
let mapMarkers = [];

// --- LOCALSTORAGE DO ROTEIRO ---
function loadRouteFromLocalStorage() {
    try {
        const saved = localStorage.getItem(LOCAL_STORAGE_ROUTE_KEY);
        if (saved) {
            selectedRouteStores = JSON.parse(saved);
        } else {
            selectedRouteStores = [];
        }
    } catch (e) {
        console.error("Erro ao carregar roteiro do LocalStorage:", e);
        selectedRouteStores = [];
    }
    updateRouteUI();
}

function saveRouteToLocalStorage() {
    try {
        localStorage.setItem(LOCAL_STORAGE_ROUTE_KEY, JSON.stringify(selectedRouteStores));
    } catch (e) {
        console.error("Erro ao salvar roteiro no LocalStorage:", e);
    }
    updateRouteUI();
}

function isStoreInRoute(storeIdOrSlug) {
    return selectedRouteStores.some(item => item.id === storeIdOrSlug || item.slug === storeIdOrSlug);
}

function addStoreToRoute(store) {
    if (!isStoreInRoute(store.id || store.slug)) {
        selectedRouteStores.push({
            id: store.id,
            name: store.name,
            slug: store.slug,
            address: store.address || '',
            neighborhood: store.neighborhood || 'Centro',
            image_url: store.image_url || ''
        });
        saveRouteToLocalStorage();
        triggerRouteBadgePulse();
        showToast(`"<strong>${store.name}</strong>" adicionada ao roteiro! <button class="toast-action-btn" onclick="openRouteDrawer()">Ver Roteiro ➔</button>`);
        
        // Abre automaticamente o painel do roteiro para o usuário ver o item adicionado
        openRouteDrawer();
    }
}

function triggerRouteBadgePulse() {
    const bar = document.getElementById('floatingRouteBar');
    if (bar) {
        bar.classList.remove('pulse');
        void bar.offsetWidth; // Trigger reflow
        bar.classList.add('pulse');
    }
    const headerBtn = document.getElementById('headerRouteBtn');
    if (headerBtn) {
        headerBtn.style.transform = 'scale(1.15)';
        setTimeout(() => { headerBtn.style.transform = 'scale(1)'; }, 300);
    }
}

function openRouteDrawer() {
    const drawer = document.getElementById('routeDrawer');
    const overlay = document.getElementById('routeDrawerOverlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateRouteUI();
}

function closeRouteDrawer() {
    const drawer = document.getElementById('routeDrawer');
    const overlay = document.getElementById('routeDrawerOverlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = 'auto';
}

function scrollToMapFromDrawer() {
    closeRouteDrawer();
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            if (leafletMap) {
                leafletMap.invalidateSize();
                updateMapMarkers(allStores);
            }
        }, 450);
    }
}

function removeStoreFromRoute(storeIdOrSlug) {
    const store = selectedRouteStores.find(item => item.id === storeIdOrSlug || item.slug === storeIdOrSlug);
    selectedRouteStores = selectedRouteStores.filter(item => item.id !== storeIdOrSlug && item.slug !== storeIdOrSlug);
    saveRouteToLocalStorage();
    if (store) {
        showToast(`"<strong>${store.name}</strong>" removida do roteiro.`);
    }
}

function moveRouteStore(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= selectedRouteStores.length) return;
    const temp = selectedRouteStores[index];
    selectedRouteStores[index] = selectedRouteStores[newIndex];
    selectedRouteStores[newIndex] = temp;
    saveRouteToLocalStorage();
}

function clearRoute() {
    if (confirm("Tem certeza que deseja limpar todo o seu roteiro de compras?")) {
        selectedRouteStores = [];
        saveRouteToLocalStorage();
        showToast("Seu roteiro foi limpo.");
    }
}

// --- BUSCA DE DADOS ---
async function fetchShoppingData() {
    let categoriesLoaded = false;
    let storesLoaded = false;

    // Inicialização garantida do Supabase
    if (typeof initSupabase === 'function') {
        try { initSupabase(); } catch(e) {}
    }

    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
        try {
            const { data: catData, error: catError } = await supabaseClient
                .from('shopping_categories')
                .select('*')
                .eq('active', true)
                .order('name');
            
            if (!catError && catData && catData.length > 0) {
                allCategories = catData;
                categoriesLoaded = true;
            }

            // Tenta consulta de lojas ativas
            let { data: storeData, error: storeError } = await supabaseClient
                .from('shopping_stores')
                .select('*')
                .eq('active', true)
                .order('name');

            // Busca os relacionamentos de categorias do Supabase
            let storeRelations = [];
            try {
                const { data: relData, error: relError } = await supabaseClient
                    .from('shopping_store_categories')
                    .select('*');
                if (!relError && relData) {
                    storeRelations = relData;
                }
            } catch (rErr) {
                console.warn("Aviso ao buscar relações de categorias no Supabase:", rErr);
            }

            if (!storeError && storeData && storeData.length > 0) {
                const catMapById = {};
                allCategories.forEach(c => { catMapById[c.id] = c; });

                allStores = storeData.map(s => {
                    let slugs = [];
                    let cats = [];

                    if (storeRelations.length > 0 && s.id) {
                        const rels = storeRelations.filter(r => r.store_id === s.id);
                        slugs = rels.map(r => catMapById[r.category_id]?.slug).filter(Boolean);
                        cats = rels.map(r => catMapById[r.category_id]).filter(Boolean);
                    }

                    // Fallback se a loja não tiver relação no banco
                    if (slugs.length === 0) {
                        const fb = (typeof FALLBACK_STORES !== 'undefined') ? FALLBACK_STORES.find(f => f.slug === s.slug) : null;
                        if (fb && fb.category_slugs) {
                            slugs = [...fb.category_slugs];
                            cats = allCategories.filter(c => slugs.includes(c.slug));
                        } else if (s.featured) {
                            slugs = ['destaques'];
                        }
                    }

                    return {
                        ...s,
                        category_slugs: slugs,
                        categories: cats
                    };
                });
                storesLoaded = true;
            }
        } catch (err) {
            console.warn("Falha ao consultar Supabase. Usando dados fallback:", err);
        }
    }

    if (!categoriesLoaded) allCategories = FALLBACK_CATEGORIES;
    if (!storesLoaded) {
        allStores = FALLBACK_STORES.map(s => ({
            ...s,
            categories: allCategories.filter(c => (s.category_slugs || []).includes(c.slug))
        }));
    }

    renderCategoryChips();
    filterAndRenderStores();
    initLeafletMap();
}

// --- ROTEIRO VIA URL ---
function checkSharedRouteURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedParam = urlParams.get('roteiro') || urlParams.get('lojas');
    if (sharedParam) {
        const slugs = sharedParam.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
        if (slugs.length > 0) {
            let addedCount = 0;
            slugs.forEach(slug => {
                const foundStore = allStores.find(s => s.slug === slug || s.id === slug);
                if (foundStore && !isStoreInRoute(foundStore.id || foundStore.slug)) {
                    selectedRouteStores.push({
                        id: foundStore.id,
                        name: foundStore.name,
                        slug: foundStore.slug,
                        address: foundStore.address || '',
                        neighborhood: foundStore.neighborhood || 'Centro',
                        image_url: foundStore.image_url || ''
                    });
                    addedCount++;
                }
            });
            if (addedCount > 0) {
                saveRouteToLocalStorage();
                showToast(`Roteiro compartilhado carregado! <strong>${addedCount} lojas</strong> adicionadas ao seu planejamento.`);
            }
        }
    }
}

// --- CATEGORIAS (CHIPS) ---
function renderCategoryChips() {
    const container = document.getElementById('category-chips-container');
    if (!container) return;

    let html = `
        <button class="chip-btn ${activeCategoryFilter === 'todos' ? 'active' : ''}" onclick="setCategoryFilter('todos')">
            ✨ TODAS AS LOJAS
        </button>
    `;

    allCategories.forEach(cat => {
        html += `
            <button class="chip-btn ${activeCategoryFilter === cat.slug ? 'active' : ''}" onclick="setCategoryFilter('${cat.slug}')">
                ${cat.icon || '🛍️'} ${cat.name.toUpperCase()}
            </button>
        `;
    });

    container.innerHTML = html;
}

function setCategoryFilter(slug) {
    activeCategoryFilter = slug;
    renderCategoryChips();
    filterAndRenderStores();
}

// --- GRID DE LOJAS ---
function filterAndRenderStores() {
    const container = document.getElementById('stores-grid-container');
    const emptyState = document.getElementById('stores-empty-state');
    if (!container) return;

    const query = searchQuery.toLowerCase().trim();

    const filteredStores = allStores.filter(store => {
        const matchesCategory = activeCategoryFilter === 'todos' || 
            (store.category_slugs && store.category_slugs.includes(activeCategoryFilter)) ||
            (activeCategoryFilter === 'destaques' && store.featured);

        const matchesSearch = !query || 
            store.name.toLowerCase().includes(query) ||
            (store.short_description && store.short_description.toLowerCase().includes(query)) ||
            (store.description && store.description.toLowerCase().includes(query)) ||
            (store.neighborhood && store.neighborhood.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
    });

    if (filteredStores.length === 0) {
        container.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        updateMapMarkers([]);
        return;
    }

    container.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    let html = '';
    filteredStores.forEach(store => {
        const inRoute = isStoreInRoute(store.id || store.slug);

        const categoryBadgesHtml = (store.categories && store.categories.length > 0)
            ? store.categories.slice(0, 2).map(c => `<span class="store-category-badge" title="${c.name}">${c.icon || '🏷️'} ${c.name}</span>`).join('') + (store.categories.length > 2 ? `<span class="store-category-badge-more">+${store.categories.length - 2}</span>` : '')
            : (store.category_slugs && store.category_slugs.length > 0)
                ? store.category_slugs.slice(0, 2).map(slug => {
                    const foundCat = allCategories.find(c => c.slug === slug);
                    return `<span class="store-category-badge">${foundCat ? (foundCat.icon + ' ' + foundCat.name) : slug}</span>`;
                }).join('') + (store.category_slugs.length > 2 ? `<span class="store-category-badge-more">+${store.category_slugs.length - 2}</span>` : '')
                : '';

        html += `
            <div class="store-card">
                <div class="store-card-image">
                    <img src="${store.image_url || 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80'}" alt="${store.name}" loading="lazy">
                    ${store.featured ? '<span class="badge-featured">⭐ DESTAQUE</span>' : ''}
                </div>
                <div class="store-card-body">
                    <div class="store-badges-row">
                        <span class="store-location-badge">📍 ${store.neighborhood || 'Centro'}</span>
                        ${categoryBadgesHtml}
                    </div>
                    <h3 class="store-card-title">${store.name}</h3>
                    <p class="store-card-desc">${store.short_description || store.description || ''}</p>
                    
                    <div class="store-card-actions">
                        <button class="btn btn-outline-gold btn-sm" onclick="openStoreModal('${store.slug}')">
                            ℹ️ Detalhes
                        </button>
                        <a href="${getGoogleMapsUrl(store)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-gold btn-sm" title="Abrir localização real no Google Maps" style="padding: 7px 10px; display: inline-flex; align-items: center; gap: 4px;">
                            📍 Maps
                        </a>
                        <button class="btn ${inRoute ? 'btn-success' : 'btn-primary'} btn-sm" onclick="toggleRouteStore('${store.slug}')">
                            ${inRoute ? '✓ No Roteiro' : '+ Roteiro'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    updateMapMarkers(filteredStores);
}

function toggleRouteStore(slug) {
    const store = allStores.find(s => s.slug === slug);
    if (!store) return;
    if (isStoreInRoute(store.id || store.slug)) {
        removeStoreFromRoute(store.id || store.slug);
    } else {
        addStoreToRoute(store);
    }
    filterAndRenderStores();
}

// --- MODAL DE DETALHES ---
function openStoreModal(slug) {
    const store = allStores.find(s => s.slug === slug);
    if (!store) return;

    const modal = document.getElementById('store-detail-modal');
    const modalContent = document.getElementById('store-modal-content');
    if (!modal || !modalContent) return;

    const inRoute = isStoreInRoute(store.id || store.slug);

    const modalCategoryBadgesHtml = (store.categories && store.categories.length > 0)
        ? store.categories.map(c => `<span class="store-category-badge" style="font-size: 0.75rem; padding: 3px 10px;">${c.icon || '🏷️'} ${c.name}</span>`).join('')
        : (store.category_slugs || []).map(slug => {
            const found = allCategories.find(c => c.slug === slug);
            return `<span class="store-category-badge" style="font-size: 0.75rem; padding: 3px 10px;">${found ? (found.icon + ' ' + found.name) : slug}</span>`;
        }).join('');

    const modalCategoryNames = (store.categories && store.categories.length > 0)
        ? store.categories.map(c => `${c.icon || '🏷️'} ${c.name}`).join(', ')
        : (store.category_slugs || []).map(slug => {
            const found = allCategories.find(c => c.slug === slug);
            return found ? `${found.icon || '🏷️'} ${found.name}` : slug;
        }).join(', ');

    modalContent.innerHTML = `
        <div class="modal-header-image">
            <img src="${store.image_url || 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80'}" alt="${store.name}">
            <button class="modal-close-btn" onclick="closeStoreModal()">&times;</button>
        </div>
        <div class="modal-body-content">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
                <div>
                    <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.6rem; color: #fff; margin-bottom: 4px;">${store.name}</h2>
                    <p style="color: var(--primary-gold); font-weight: 600; font-size: 0.9rem;">📍 ${store.address || store.neighborhood || 'Ciudad del Este'}</p>
                </div>
                ${store.featured ? '<span class="badge-featured" style="position: static;">⭐ DESTAQUE</span>' : ''}
            </div>

            ${modalCategoryBadgesHtml ? `<div style="display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0 6px 0;">${modalCategoryBadgesHtml}</div>` : ''}

            <p style="color: rgba(255,255,255,0.85); line-height: 1.6; margin: 16px 0;">${store.description || store.short_description || ''}</p>

            <div class="modal-info-grid">
                ${modalCategoryNames ? `<div class="modal-info-item"><strong>🏷️ Categorias:</strong> <span>${modalCategoryNames}</span></div>` : ''}
                ${store.opening_hours ? `<div class="modal-info-item"><strong>🕒 Horário:</strong> <span>${store.opening_hours}</span></div>` : ''}
                ${store.phone ? `<div class="modal-info-item"><strong>📞 Telefone:</strong> <a href="tel:${store.phone}" style="color: var(--primary-gold);">${store.phone}</a></div>` : ''}
                ${store.whatsapp ? `<div class="modal-info-item"><strong>💬 WhatsApp:</strong> <a href="https://wa.me/${store.whatsapp.replace(/\D/g,'')}?text=Olá! Encontrei sua loja no Guia Rota CDE." target="_blank" style="color: #4caf50;">${store.whatsapp}</a></div>` : ''}
                ${store.instagram ? `<div class="modal-info-item"><strong>📸 Instagram:</strong> <a href="https://instagram.com/${store.instagram.replace('@','')}" target="_blank" style="color: #e1306c;">${store.instagram}</a></div>` : ''}
                ${store.website ? `<div class="modal-info-item"><strong>🌐 Website:</strong> <a href="${store.website}" target="_blank" style="color: #64b5f6;">${store.website.replace('https://','')}</a></div>` : ''}
            </div>

            <div style="display: flex; gap: 10px; margin-top: 24px; flex-wrap: wrap;">
                <button class="btn ${inRoute ? 'btn-success' : 'btn-primary'}" style="flex: 1; min-width: 170px;" onclick="toggleRouteStore('${store.slug}'); openStoreModal('${store.slug}');">
                    ${inRoute ? '✓ No Meu Roteiro' : '+ Adicionar ao Meu Roteiro'}
                </button>
                <a href="${getGoogleMapsUrl(store)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-gold" style="flex: 1; min-width: 170px; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                    📍 Abrir no Google Maps ↗
                </a>
                <a href="index.html?destino=Ciudad+del+Este&loja=${encodeURIComponent(store.name)}#cotacao" class="btn btn-gold" style="flex: 1; min-width: 170px; text-align: center;">
                    🚗 Ir com Transfer
                </a>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeStoreModal() {
    const modal = document.getElementById('store-detail-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// --- MAPA GOOGLE MAPS FOCADO EM CIUDAD DEL ESTE ---
const CDE_CENTER = [-25.5112, -54.6085]; // Centro comercial de Ciudad del Este
const CDE_DEFAULT_ZOOM = 16;

function initLeafletMap() {
    const mapElement = document.getElementById('mapa-compras');
    if (!mapElement || typeof L === 'undefined') return;

    if (!leafletMap) {
        leafletMap = L.map('mapa-compras', {
            center: CDE_CENTER,
            zoom: CDE_DEFAULT_ZOOM,
            zoomControl: true,
            minZoom: 12,
            maxZoom: 19,
            maxBounds: [
                [-25.560, -54.760],
                [-25.470, -54.560]
            ],
            maxBoundsViscosity: 0.9
        });

        // Camada Google Maps Roadmap (Oficial com nomes reais das lojas, shoppings e ruas de Ciudad del Este)
        L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; Google Maps',
            noWrap: true
        }).addTo(leafletMap);

        // Garante renderização perfeita sem cortes de tiles
        setTimeout(() => {
            if (leafletMap) {
                leafletMap.invalidateSize();
                leafletMap.setView(CDE_CENTER, CDE_DEFAULT_ZOOM);
            }
        }, 300);
    }

    updateMapMarkers(allStores);
}

function updateMapMarkers(storesToDisplay) {
    if (!leafletMap || typeof L === 'undefined') return;

    mapMarkers.forEach(m => leafletMap.removeLayer(m));
    mapMarkers = [];

    const bounds = L.latLngBounds();
    let validMarkersCount = 0;

    storesToDisplay.forEach(store => {
        if (store.latitude && store.longitude) {
            const lat = parseFloat(store.latitude);
            let lng = parseFloat(store.longitude);
            
            // Tratamento defensivo caso a longitude tenha vindo sem ponto decimal do banco
            if (!isNaN(lng) && Math.abs(lng) > 180) {
                const s = String(store.longitude).replace('-', '');
                lng = -parseFloat(s.slice(0, 2) + '.' + s.slice(2));
            }
            
            // Filtra coordenadas válidas na região de Ciudad del Este
            if (!isNaN(lat) && !isNaN(lng) && (lat !== 0 || lng !== 0)) {
                if (lat < -25.45 && lat > -25.56 && lng < -54.55 && lng > -54.78) {
                    const inRouteIndex = selectedRouteStores.findIndex(s => s.id === store.id || s.slug === store.slug);
                    const inRoute = inRouteIndex !== -1;

                    let marker;
                    if (inRoute) {
                        // Marcador Especial Dourado Numerado para Lojas no Roteiro
                        const routeIcon = L.divIcon({
                            className: 'custom-route-pin',
                            html: `<div style="background: linear-gradient(135deg, #e6b83b, #c59b27); color: #050B14; font-weight: 800; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2.5px solid #ffffff; box-shadow: 0 4px 16px rgba(197,155,39,0.85); font-size: 14px; font-family: Outfit, sans-serif;">${inRouteIndex + 1}</div>`,
                            iconSize: [34, 34],
                            iconAnchor: [17, 17]
                        });
                        marker = L.marker([lat, lng], { icon: routeIcon, zIndexOffset: 1000 }).addTo(leafletMap);
                    } else {
                        marker = L.marker([lat, lng]).addTo(leafletMap);
                    }

                    const gMapsLink = getGoogleMapsUrl(store);
                    const popupHtml = `
                        <div style="font-family: 'Inter', sans-serif; padding: 6px; min-width: 190px;">
                            ${inRoute ? `<div style="color: var(--primary-gold, #c59b27); font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 3px;">⭐ ${inRouteIndex + 1}ª Parada do Roteiro</div>` : ''}
                            <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0e1a2f;">${store.name}</h4>
                            <p style="margin: 0 0 6px 0; font-size: 12px; color: #555;">📍 ${store.address || store.neighborhood || 'Centro, Ciudad del Este'}</p>
                            <div style="margin-bottom: 8px;">
                                <a href="${gMapsLink}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 4px; color: #1a73e8; font-size: 12px; font-weight: 700; text-decoration: none;">
                                    📍 Abrir no Google Maps ↗
                                </a>
                            </div>
                            <button onclick="toggleRouteStore('${store.slug}')" style="background: var(--primary-gold, #c59b27); border: none; color: #050B14; padding: 7px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; cursor: pointer; width: 100%;">
                                ${inRoute ? '✕ Remover do Roteiro' : '+ Adicionar ao Roteiro'}
                            </button>
                        </div>
                    `;

                    marker.bindPopup(popupHtml);
                    mapMarkers.push(marker);
                    bounds.extend([lat, lng]);
                    validMarkersCount++;
                }
            }
        }
    });

    if (validMarkersCount > 1 && leafletMap) {
        leafletMap.fitBounds(bounds, { padding: [35, 35], maxZoom: 17, minZoom: 14 });
    } else if (leafletMap) {
        leafletMap.setView(CDE_CENTER, CDE_DEFAULT_ZOOM);
    }
}

// --- UI DO ROTEIRO (SINCRONIZAÇÃO COMPLETA: SEÇÃO, DRAWER, HEADER E MAPA) ---
function updateRouteUI() {
    const count = selectedRouteStores.length;

    // 1. Contadores nos cabeçalhos e badges
    const routeBadge = document.getElementById('route-badge-count');
    const headerBadge = document.getElementById('header-route-count');
    const floatingBadge = document.getElementById('floating-route-badge-count');
    const drawerCount = document.getElementById('drawer-store-count');
    const floatingSummary = document.getElementById('floating-route-summary');

    if (routeBadge) routeBadge.innerText = count;
    if (headerBadge) headerBadge.innerText = count;
    if (floatingBadge) floatingBadge.innerText = count;
    if (drawerCount) {
        drawerCount.innerText = count === 1 ? '1 loja selecionada' : `${count} lojas selecionadas`;
    }
    if (floatingSummary) {
        floatingSummary.innerText = count === 0 ? 'Nenhuma loja' : (count === 1 ? '1 loja selecionada' : `${count} lojas selecionadas`);
    }

    // 2. Seção Na Página (#meu-roteiro)
    const container = document.getElementById('route-items-container');
    const emptyView = document.getElementById('route-empty-view');
    const filledView = document.getElementById('route-filled-view');

    if (count === 0) {
        if (emptyView) emptyView.style.display = 'block';
        if (filledView) filledView.style.display = 'none';
    } else {
        if (emptyView) emptyView.style.display = 'none';
        if (filledView) filledView.style.display = 'block';
    }

    if (container) {
        let html = '';
        selectedRouteStores.forEach((store, index) => {
            html += `
                <div class="route-item-card">
                    <span class="route-item-number">${index + 1}</span>
                    <div class="route-item-info">
                        <strong class="route-item-title">${store.name}</strong>
                        <span class="route-item-sub">📍 ${store.neighborhood || 'Ciudad del Este'}</span>
                    </div>
                    <div class="route-item-controls">
                        <button class="btn-icon" onclick="moveRouteStore(${index}, -1)" ${index === 0 ? 'disabled' : ''} title="Mover para cima">▲</button>
                        <button class="btn-icon" onclick="moveRouteStore(${index}, 1)" ${index === count - 1 ? 'disabled' : ''} title="Mover para baixo">▼</button>
                        <button class="btn-icon btn-icon-danger" onclick="removeStoreFromRoute('${store.slug}')" title="Remover">✕</button>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    // 3. Painel Lateral / Drawer (#routeDrawer)
    const drawerList = document.getElementById('drawer-items-list');
    const drawerEmpty = document.getElementById('drawer-empty-state');
    const drawerFooter = document.getElementById('drawer-footer');

    if (drawerList && drawerEmpty && drawerFooter) {
        if (count === 0) {
            drawerEmpty.style.display = 'block';
            drawerList.style.display = 'none';
            drawerFooter.style.display = 'none';
        } else {
            drawerEmpty.style.display = 'none';
            drawerList.style.display = 'flex';
            drawerFooter.style.display = 'block';

            let drawerHtml = '';
            selectedRouteStores.forEach((store, index) => {
                drawerHtml += `
                    <div class="drawer-item-card">
                        <span style="background: var(--primary-gold); color: #050B14; font-weight: 800; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0;">
                            ${index + 1}
                        </span>
                        <div style="flex: 1; min-width: 0;">
                            <strong style="display: block; color: #fff; font-size: 0.92rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${store.name}</strong>
                            <small style="color: var(--text-light-muted); font-size: 0.76rem;">📍 ${store.neighborhood || 'Centro'}</small>
                        </div>
                        <div style="display: flex; gap: 4px;">
                            <button class="btn-icon" onclick="moveRouteStore(${index}, -1)" ${index === 0 ? 'disabled' : ''} title="Mover para cima" style="width: 24px; height: 24px; font-size: 0.7rem;">▲</button>
                            <button class="btn-icon" onclick="moveRouteStore(${index}, 1)" ${index === count - 1 ? 'disabled' : ''} title="Mover para baixo" style="width: 24px; height: 24px; font-size: 0.7rem;">▼</button>
                            <button class="btn-icon btn-icon-danger" onclick="removeStoreFromRoute('${store.slug}')" title="Remover" style="width: 24px; height: 24px; font-size: 0.75rem;">✕</button>
                        </div>
                    </div>
                `;
            });
            drawerList.innerHTML = drawerHtml;
        }
    }

    // 4. Estado dos Botões de Download do Planejamento em PDF
    const pdfBtnSection = document.getElementById('btn-download-pdf-plan-section');
    const pdfBtnDrawer = document.getElementById('btn-download-pdf-plan-drawer');

    if (pdfBtnSection) {
        pdfBtnSection.disabled = (count === 0);
        if (count === 0) pdfBtnSection.classList.add('is-disabled');
        else pdfBtnSection.classList.remove('is-disabled');
    }
    if (pdfBtnDrawer) {
        pdfBtnDrawer.disabled = (count === 0);
        if (count === 0) pdfBtnDrawer.classList.add('is-disabled');
        else pdfBtnDrawer.classList.remove('is-disabled');
    }
}

// --- LAZY LOAD DA BIBLIOTECA jsPDF ---
let jsPdfPromise = null;
function loadJsPdfLibrary() {
    if (window.jspdf && window.jspdf.jsPDF) {
        return Promise.resolve(window.jspdf.jsPDF);
    }
    if (jsPdfPromise) return jsPdfPromise;

    jsPdfPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            if (window.jspdf && window.jspdf.jsPDF) {
                resolve(window.jspdf.jsPDF);
            } else {
                reject(new Error("Biblioteca jsPDF não inicializada."));
            }
        };
        script.onerror = () => {
            jsPdfPromise = null;
            reject(new Error("Falha de conexão ao carregar jsPDF. Verifique sua internet."));
        };
        document.head.appendChild(script);
    });
    return jsPdfPromise;
}

// Converte a logo oficial para base64 via Canvas para inserção sem distorção
function getLogoBase64() {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            try {
                const canvas = document.createElement('canvas');
                const w = img.naturalWidth || img.width;
                const h = img.naturalHeight || img.height;
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/png');
                resolve({ dataURL, width: w, height: h, ratio: w / h });
            } catch (err) {
                console.warn("Aviso ao converter logo para base64:", err);
                resolve(null);
            }
        };
        img.onerror = function() {
            console.warn("Logo não encontrada para o PDF.");
            resolve(null);
        };
        img.src = 'assets/logo.png';
    });
}

// Sanitizador rigoroso para jsPDF: remove emojis e caracteres não suportados, preservando acentos em português
function sanitizePdfText(str) {
    if (!str) return '';
    return String(str)
        .replace(/\p{Extended_Pictographic}/gu, '')
        .replace(/[\uFE00-\uFE0F]/g, '')
        .replace(/\s+,/g, ',')
        .replace(/\s+/g, ' ')
        .trim();
}

// --- GERADOR OFICIAL: MEU PLANEJAMENTO EM PDF ---
async function generateShoppingPlanPdf(triggerButton) {
    if (!selectedRouteStores || selectedRouteStores.length === 0) {
        showToast("Adicione pelo menos uma loja ao seu roteiro para gerar o PDF.");
        return;
    }

    // Previne duplo clique e atualiza estado visual do botão
    const buttons = [
        document.getElementById('btn-download-pdf-plan-section'),
        document.getElementById('btn-download-pdf-plan-drawer'),
        triggerButton
    ].filter(Boolean);

    const originalContents = buttons.map(b => b.innerHTML);
    buttons.forEach(b => {
        b.disabled = true;
        b.classList.add('is-disabled');
        const titleEl = b.querySelector('.btn-pdf-title');
        if (titleEl) titleEl.innerText = "GERANDO SEU PDF...";
    });

    try {
        // Registra evento no Google Analytics se disponível
        if (typeof gtag === 'function') {
            try {
                gtag('event', 'download_pdf_planejamento', {
                    event_category: 'engagement',
                    event_label: 'Meu Planejamento em PDF',
                    value: selectedRouteStores.length
                });
            } catch (e) {}
        }

        // Lazy load do jsPDF e carregamento da logo em paralelo
        const [jsPDFClass, logoInfo] = await Promise.all([
            loadJsPdfLibrary(),
            getLogoBase64()
        ]);

        const doc = new jsPDFClass({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        // Dimensões da página A4
        const pageWidth = 210;
        const pageHeight = 297;
        const marginL = 14;
        const marginR = 14;
        const contentWidth = pageWidth - marginL - marginR; // 182mm
        const bottomLimit = pageHeight - 20; // 277mm limite antes do rodapé

        // Paleta de Cores Oficial Rota CDE
        const COLOR_NAVY = [14, 26, 47];       // #0e1a2f
        const COLOR_GOLD = [197, 155, 39];      // #c59b27
        const COLOR_TEXT = [33, 37, 41];
        const COLOR_MUTED = [100, 116, 139];
        const COLOR_CARD_BG = [248, 250, 252];
        const COLOR_BORDER = [226, 232, 240];

        let currentY = 16;

        // Cabeçalho da Primeira Página
        function drawFirstPageHeader() {
            doc.setFillColor(...COLOR_NAVY);
            doc.rect(0, 0, pageWidth, 4, 'F'); // Barra superior azul marinho

            const headerTop = 11;
            let titleStartX = marginL;

            if (logoInfo && logoInfo.dataURL) {
                const logoH = 15;
                const logoW = logoH * (logoInfo.ratio || 1.06);
                doc.addImage(logoInfo.dataURL, 'PNG', marginL, headerTop, logoW, logoH);
                titleStartX = marginL + logoW + 5;
            } else {
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(13);
                doc.setTextColor(...COLOR_GOLD);
                doc.text("ROTA CDE TRANSFER", marginL, headerTop + 6);
                titleStartX = marginL;
            }

            // Título Principal
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14.5);
            doc.setTextColor(...COLOR_NAVY);
            doc.text("MEU PLANO DE COMPRAS NO PARAGUAI", titleStartX, headerTop + (logoInfo ? 6 : 13));

            // Subtítulo
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8.5);
            doc.setTextColor(...COLOR_MUTED);
            doc.text("Seu planejamento personalizado para Ciudad del Este", titleStartX, headerTop + (logoInfo ? 11 : 18));

            // Data de emissão brasileira à direita
            const hoje = new Date().toLocaleDateString('pt-BR');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(...COLOR_MUTED);
            doc.text(`Data: ${hoje}`, pageWidth - marginR, headerTop + 6, { align: 'right' });

            // Linha divisória dourada
            const dividerY = headerTop + (logoInfo ? 18 : 22);
            doc.setDrawColor(...COLOR_GOLD);
            doc.setLineWidth(0.6);
            doc.line(marginL, dividerY, pageWidth - marginR, dividerY);

            currentY = dividerY + 7;
        }

        // Cabeçalho Compacto das Páginas Seguintes
        function drawCompactHeader() {
            doc.setFillColor(...COLOR_NAVY);
            doc.rect(0, 0, pageWidth, 3, 'F');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(...COLOR_NAVY);
            doc.text("ROTA CDE TRANSFER  |  Meu Plano de Compras no Paraguai", marginL, 10);

            const hoje = new Date().toLocaleDateString('pt-BR');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.5);
            doc.setTextColor(...COLOR_MUTED);
            doc.text(`Data: ${hoje}`, pageWidth - marginR, 10, { align: 'right' });

            doc.setDrawColor(...COLOR_BORDER);
            doc.setLineWidth(0.3);
            doc.line(marginL, 13, pageWidth - marginR, 13);

            currentY = 19;
        }

        // Título de Seção
        function drawSectionTitle(title, subtitle) {
            if (currentY + 14 > bottomLimit) {
                doc.addPage();
                drawCompactHeader();
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10.5);
            doc.setTextColor(...COLOR_NAVY);
            doc.text(sanitizePdfText(title), marginL, currentY);

            if (subtitle) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(7.5);
                doc.setTextColor(...COLOR_MUTED);
                doc.text(sanitizePdfText(subtitle), marginL, currentY + 4);
                currentY += 8;
            } else {
                currentY += 6;
            }
        }

        // Inicia primeira página
        drawFirstPageHeader();

        // SEÇÃO 1: MINHAS LOJAS SELECIONADAS
        drawSectionTitle("1. MINHAS LOJAS SELECIONADAS", "Ordem de visita planejada para o seu roteiro de compras");

        // Enriquece os dados de cada loja com allStores
        const enrichedStores = selectedRouteStores.map((item, idx) => {
            const full = (typeof allStores !== 'undefined' && Array.isArray(allStores))
                ? allStores.find(s => s.slug === item.slug || s.id === item.id)
                : null;

            let catNames = '';
            if (full && full.categories && full.categories.length > 0) {
                catNames = full.categories.map(c => c.name).filter(Boolean).join(', ');
            } else if (full && full.category_slugs && full.category_slugs.length > 0) {
                catNames = full.category_slugs.map(slug => {
                    const found = (typeof allCategories !== 'undefined') ? allCategories.find(c => c.slug === slug) : null;
                    return found ? found.name : slug;
                }).filter(Boolean).join(', ');
            }

            return {
                index: idx + 1,
                name: sanitizePdfText(item.name || full?.name || 'Loja'),
                categories: sanitizePdfText(catNames),
                address: sanitizePdfText(full?.address || item.address || ''),
                neighborhood: sanitizePdfText(full?.neighborhood || item.neighborhood || 'Centro'),
                description: sanitizePdfText(full?.short_description || full?.description || '')
            };
        });

        // Desenha os cards das lojas (garantindo que NENHUM card seja dividido entre páginas)
        enrichedStores.forEach((store) => {
            const cardInnerWidth = contentWidth - 16;
            const storeName = store.name;
            const categoryText = store.categories ? `Categoria: ${store.categories}` : '';
            
            let fullAddress = store.address;
            if (fullAddress && store.neighborhood && !fullAddress.toLowerCase().includes(store.neighborhood.toLowerCase())) {
                fullAddress += ` - ${store.neighborhood}`;
            }
            if (fullAddress && !fullAddress.toLowerCase().includes('ciudad del este')) {
                fullAddress += ', Ciudad del Este';
            }
            const addressLines = fullAddress ? doc.splitTextToSize(`Localização: ${fullAddress}`, cardInnerWidth) : [];
            const descLines = store.description ? doc.splitTextToSize(store.description, cardInnerWidth) : [];

            // Altura total dinâmica do card
            let cardHeight = 8;
            if (categoryText) cardHeight += 4;
            if (addressLines.length > 0) cardHeight += (addressLines.length * 3.8);
            if (descLines.length > 0) cardHeight += (Math.min(descLines.length, 3) * 3.6) + 1;
            cardHeight += 9;
            cardHeight = Math.max(cardHeight, 26);

            // Se o card não couber inteiro na página atual, move para a próxima página
            if (currentY + cardHeight > bottomLimit) {
                doc.addPage();
                drawCompactHeader();
            }

            const cardY = currentY;

            // Fundo do card
            doc.setFillColor(...COLOR_CARD_BG);
            doc.setDrawColor(...COLOR_BORDER);
            doc.setLineWidth(0.3);
            doc.roundedRect(marginL, cardY, contentWidth, cardHeight, 2, 2, 'FD');

            // Barra vertical dourada de destaque à esquerda
            doc.setFillColor(...COLOR_GOLD);
            doc.roundedRect(marginL, cardY, 2.5, cardHeight, 1, 1, 'F');

            // Número de ordem da loja
            doc.setFillColor(...COLOR_GOLD);
            doc.circle(marginL + 7, cardY + 6.5, 3.5, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(...COLOR_NAVY);
            doc.text(String(store.index), marginL + 7, cardY + 7.7, { align: 'center' });

            // Nome da loja
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(...COLOR_NAVY);
            doc.text(storeName, marginL + 13, cardY + 7.5);

            let innerY = cardY + 11.5;

            // Categoria
            if (categoryText) {
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(7.5);
                doc.setTextColor(...COLOR_GOLD);
                doc.text(categoryText, marginL + 13, innerY);
                innerY += 4;
            }

            // Endereço
            if (addressLines.length > 0) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(7.8);
                doc.setTextColor(...COLOR_TEXT);
                doc.text(addressLines, marginL + 13, innerY);
                innerY += (addressLines.length * 3.8);
            }

            // Descrição
            if (descLines.length > 0) {
                doc.setFont('helvetica', 'italic');
                doc.setFontSize(7.5);
                doc.setTextColor(...COLOR_MUTED);
                const cappedDesc = descLines.slice(0, 3);
                doc.text(cappedDesc, marginL + 13, innerY);
                innerY += (cappedDesc.length * 3.6) + 1;
            }

            // Checklist da Loja (caixas de seleção desenhadas)
            const checkY = cardY + cardHeight - 5.5;
            const items = [
                "Visitei a loja",
                "Encontrei o produto",
                "Pesquisei o preço",
                "Realizei a compra"
            ];
            
            const checkSpacing = (contentWidth - 14) / items.length;
            doc.setDrawColor(140, 150, 165);
            doc.setLineWidth(0.3);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            doc.setTextColor(70, 80, 95);

            items.forEach((itemText, i) => {
                const itemX = marginL + 13 + (i * checkSpacing);
                doc.rect(itemX, checkY - 2.8, 3, 3);
                doc.text(itemText, itemX + 4.2, checkY - 0.4);
            });

            currentY = cardY + cardHeight + 4;
        });

        currentY += 2;

        // SEÇÃO 2: MINHA LISTA DE COMPRAS (Linhas em branco para anotações manuais)
        const listaSectionHeight = 40;
        if (currentY + listaSectionHeight > bottomLimit) {
            doc.addPage();
            drawCompactHeader();
        }

        drawSectionTitle("2. MINHA LISTA DE COMPRAS", "Espaço para preenchimento manual dos produtos planejados e valores");

        const tableStartY = currentY;
        const colWidths = [80, 48, 36, 18]; // Total = 182mm
        const colHeaders = ["Item / Produto Desejado", "Loja Pretendida", "Preço Estimado", "Comprado"];

        // Cabeçalho da tabela
        doc.setFillColor(238, 242, 248);
        doc.rect(marginL, tableStartY, contentWidth, 5.5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(...COLOR_NAVY);

        let hX = marginL + 2;
        colHeaders.forEach((hText, i) => {
            doc.text(hText, hX, tableStartY + 3.8);
            hX += colWidths[i];
        });

        // 5 Linhas em branco com caixas de marcação
        let rowY = tableStartY + 5.5;
        for (let r = 0; r < 5; r++) {
            doc.setDrawColor(...COLOR_BORDER);
            doc.setLineWidth(0.25);
            doc.line(marginL, rowY + 5.5, marginL + contentWidth, rowY + 5.5);

            const chkX = marginL + colWidths[0] + colWidths[1] + colWidths[2] + 6;
            doc.setDrawColor(150, 160, 175);
            doc.rect(chkX, rowY + 1.4, 3, 3);

            rowY += 5.5;
        }

        currentY = rowY + 6;

        // SEÇÃO 3: CHECKLIST GERAL DA VIAGEM
        const checklistHeight = 30;
        if (currentY + checklistHeight > bottomLimit) {
            doc.addPage();
            drawCompactHeader();
        }

        drawSectionTitle("3. CHECKLIST GERAL DA VIAGEM", "Itens essenciais para garantir um dia tranquilo em Ciudad del Este");

        const generalChecks = [
            "Documento de Identidade: RG original em bom estado (menos de 10 anos) ou Passaporte válido.",
            "Moeda / Pagamento: Dinheiro em espécie (Dólar ou Real) e/ou cartão com função internacional habilitada.",
            "Horário de Saída: Combinado previamente para chegar cedo aos principais shoppings de CDE.",
            "Horário de Retorno: Planejado para evitar o fluxo mais intenso na Ponte da Amizade.",
            "Transporte Seguro: Transfer privativo agendado com a Rota CDE Transfer."
        ];

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.8);
        doc.setTextColor(...COLOR_TEXT);

        generalChecks.forEach((checkText) => {
            doc.setDrawColor(140, 150, 165);
            doc.setLineWidth(0.3);
            doc.rect(marginL, currentY - 2.8, 3.2, 3.2);

            const lines = doc.splitTextToSize(checkText, contentWidth - 6);
            doc.text(lines, marginL + 5.5, currentY - 0.4);
            currentY += (lines.length * 4) + 1;
        });

        currentY += 4;

        // SEÇÃO 4: DICAS DE COMPRA SEGURA EM CIUDAD DEL ESTE
        const safetyHeight = 35;
        if (currentY + safetyHeight > bottomLimit) {
            doc.addPage();
            drawCompactHeader();
        }

        drawSectionTitle("4. DICAS PARA COMPRA SEGURA EM CIUDAD DEL ESTE", "");

        const safetyBoxY = currentY - 2;
        const safetyBoxH = 31;

        // Box com fundo suave e borda dourada
        doc.setFillColor(255, 252, 242);
        doc.setDrawColor(...COLOR_GOLD);
        doc.setLineWidth(0.4);
        doc.roundedRect(marginL, safetyBoxY, contentWidth, safetyBoxH, 2, 2, 'FD');

        const tips = [
            "1. Pesquise Preços: Consulte lojas oficiais antes de comprar. Desconfie sempre de ofertas muito abaixo do padrão.",
            "2. Teste Tudo: Abra as embalagens e teste os produtos eletrônicos no setor de testes da própria loja.",
            "3. Exija Nota Fiscal: Solicite sempre a factura legal com descrição clara do item e número de série legível.",
            "4. Cuidado nas Ruas: Evite abordagens de guias informais e panfleteiros. Dirija-se sempre às lojas do seu roteiro."
        ];

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(50, 55, 65);

        let tipY = safetyBoxY + 5.5;
        tips.forEach(t => {
            doc.text(t, marginL + 4, tipY);
            tipY += 5;
        });

        // Aviso legal
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(6.8);
        doc.setTextColor(...COLOR_MUTED);
        doc.text("Informações sujeitas a alterações sem aviso prévio. Este documento é um planejamento pessoal de viagem.", marginL + 4, tipY + 1);

        // RODAPÉ EM TODAS AS PÁGINAS (Com numeração completa)
        const totalPages = doc.internal.getNumberOfPages();
        for (let p = 1; p <= totalPages; p++) {
            doc.setPage(p);

            const footerY = pageHeight - 14;

            // Linha divisória fina
            doc.setDrawColor(...COLOR_BORDER);
            doc.setLineWidth(0.3);
            doc.line(marginL, footerY - 2.5, pageWidth - marginR, footerY - 2.5);

            // Linha 1: Marca, site e WhatsApp
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7.5);
            doc.setTextColor(...COLOR_NAVY);
            doc.text("ROTA CDE TRANSFER", marginL, footerY + 1);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.5);
            doc.setTextColor(...COLOR_MUTED);
            doc.text("— Seu parceiro na viagem ao Paraguai  |  Site: https://www.rotacde.site  |  WhatsApp: +595 973 953874", marginL + 31, footerY + 1);

            // Numeração de páginas à direita
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7.5);
            doc.setTextColor(...COLOR_MUTED);
            doc.text(`Página ${p} de ${totalPages}`, pageWidth - marginR, footerY + 1, { align: 'right' });

            // Linha 2: Chamada comercial do transfer e frase de encerramento
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(7);
            doc.setTextColor(...COLOR_GOLD);
            doc.text("Reserve seu transfer privativo para suas compras em Ciudad del Este.", marginL, footerY + 5.2);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            doc.setTextColor(...COLOR_MUTED);
            doc.text("Planeje suas compras. Aproveite sua viagem.", marginL + 78, footerY + 5.2);
        }

        // SALVA / DISPARA DOWNLOAD
        const fileName = 'meu-planejamento-de-compras-rota-cde.pdf';

        // Disparo otimizado (compatível com Safari / Mobile / Chrome)
        try {
            doc.save(fileName);
        } catch (saveErr) {
            console.warn("doc.save() falhou, tentando blob URL:", saveErr);
            const blob = doc.output('blob');
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
            }, 1000);
        }

        showToast("Seu planejamento está pronto! Agora você pode levar sua lista de compras para Ciudad del Este.");
    } catch (err) {
        console.error("Erro ao gerar PDF do roteiro:", err);
        alert("Não foi possível gerar o PDF. Verifique sua conexão e tente novamente.");
    } finally {
        // Restaura botões
        buttons.forEach((b, idx) => {
            b.disabled = false;
            b.classList.remove('is-disabled');
            b.innerHTML = originalContents[idx];
        });
    }
}

// --- COMPARTILHAR ---
function shareMyRoute() {
    if (selectedRouteStores.length === 0) {
        showToast("Adicione pelo menos uma loja ao seu roteiro para compartilhar.");
        return;
    }

    const slugs = selectedRouteStores.map(s => s.slug).join(',');
    const shareURL = `${window.location.origin}${window.location.pathname}?roteiro=${slugs}`;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareURL).then(() => {
            showToast("Link do seu roteiro copiado para a área de transferência! 📋");
        }).catch(() => {
            prompt("Copie o link do seu roteiro:", shareURL);
        });
    } else {
        prompt("Copie o link do seu roteiro:", shareURL);
    }
}

// --- RESERVA TRANSFER ---
function reserveTransferWithRoute() {
    if (selectedRouteStores.length > 0) {
        const storeNames = selectedRouteStores.map(s => s.name).join(', ');
        sessionStorage.setItem('transfer_shopping_route_notes', storeNames);
        window.location.href = `index.html?destino=Ciudad+del+Este&roteiro_lojas=${encodeURIComponent(storeNames)}#cotacao`;
    } else {
        window.location.href = 'index.html#cotacao';
    }
}

// --- TOAST ---
function showToast(message) {
    let toast = document.getElementById('guiacompras-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'guiacompras-toast';
        toast.className = 'guiacompras-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-store-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterAndRenderStores();
        });
    }

    if (typeof initSupabase === 'function') {
        initSupabase();
    }

    loadRouteFromLocalStorage();
    fetchShoppingData().then(() => {
        checkSharedRouteURL();
    });
});
