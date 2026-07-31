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

// Lista fallback de lojas
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
        latitude: -25.5173,
        longitude: -54.6105,
        phone: "+595 61 501 400",
        whatsapp: "+595 983 501 400",
        website: "https://www.shoppingchina.com.py",
        instagram: "@shoppingchinaparaguay",
        opening_hours: "Segunda a Domingo: 07:00 às 19:00",
        image_url: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
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
        latitude: -25.5142,
        longitude: -54.6128,
        phone: "+595 61 500 111",
        whatsapp: "+595 983 500 111",
        website: "https://nissei.com",
        instagram: "@nisseiparaguay",
        opening_hours: "Segunda a Sábado: 06:30 às 15:30",
        image_url: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80",
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
        latitude: -25.5150,
        longitude: -54.6115,
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
        address: "Edifício Central, Av. Adrián Jara",
        city: "Ciudad del Este",
        neighborhood: "Centro",
        latitude: -25.5138,
        longitude: -54.6135,
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
        description: "Localizada estrategicamente no Shopping Galeria e com filial no Shopping Jebai, a SA Shop combina moda de marcas internacionais com promoções diárias imbatíveis.",
        address: "Av. Monseñor Rodríguez, Shopping Galeria",
        city: "Ciudad del Este",
        neighborhood: "Centro",
        latitude: -25.5160,
        longitude: -54.6120,
        phone: "+595 61 500 999",
        whatsapp: "+595 983 500 999",
        website: "https://sashop.com.py",
        instagram: "@sashopparaguay",
        opening_hours: "Segunda a Sábado: 07:00 às 16:00",
        image_url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
        active: true,
        featured: false,
        category_slugs: ["moda", "calcados", "variedades"]
    }
];

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
        showToast(`"<strong>${store.name}</strong>" adicionada ao seu roteiro! 🎉`);
    }
}

function triggerRouteBadgePulse() {
    const badge = document.getElementById('floating-route-badge');
    if (badge) {
        badge.classList.remove('pulse');
        void badge.offsetWidth;
        badge.classList.add('pulse');
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

            // Tenta consulta completa primeiro
            let { data: storeData, error: storeError } = await supabaseClient
                .from('shopping_stores')
                .select('*')
                .eq('active', true)
                .order('name');

            if (!storeError && storeData && storeData.length > 0) {
                allStores = storeData.map(s => {
                    return {
                        ...s,
                        category_slugs: s.category_slugs || (s.featured ? ['destaques'] : ['loja-de-departamento'])
                    };
                });
                storesLoaded = true;
            }
        } catch (err) {
            console.warn("Falha ao consultar Supabase. Usando dados fallback:", err);
        }
    }

    if (!categoriesLoaded) allCategories = FALLBACK_CATEGORIES;
    if (!storesLoaded) allStores = FALLBACK_STORES;

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

        html += `
            <div class="store-card">
                <div class="store-card-image">
                    <img src="${store.image_url || 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80'}" alt="${store.name}" loading="lazy">
                    ${store.featured ? '<span class="badge-featured">⭐ DESTAQUE</span>' : ''}
                </div>
                <div class="store-card-body">
                    <span class="store-location-badge">📍 ${store.neighborhood || 'Centro'}</span>
                    <h3 class="store-card-title">${store.name}</h3>
                    <p class="store-card-desc">${store.short_description || store.description || ''}</p>
                    
                    <div class="store-card-actions">
                        <button class="btn btn-outline-gold btn-sm" onclick="openStoreModal('${store.slug}')">
                            ℹ️ Ver detalhes
                        </button>
                        <button class="btn ${inRoute ? 'btn-success' : 'btn-primary'} btn-sm" onclick="toggleRouteStore('${store.slug}')">
                            ${inRoute ? '✓ No Meu Roteiro' : '+ Adicionar ao roteiro'}
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

            <p style="color: rgba(255,255,255,0.85); line-height: 1.6; margin: 16px 0;">${store.description || store.short_description || ''}</p>

            <div class="modal-info-grid">
                ${store.opening_hours ? `<div class="modal-info-item"><strong>🕒 Horário:</strong> <span>${store.opening_hours}</span></div>` : ''}
                ${store.phone ? `<div class="modal-info-item"><strong>📞 Telefone:</strong> <a href="tel:${store.phone}" style="color: var(--primary-gold);">${store.phone}</a></div>` : ''}
                ${store.whatsapp ? `<div class="modal-info-item"><strong>💬 WhatsApp:</strong> <a href="https://wa.me/${store.whatsapp.replace(/\D/g,'')}?text=Olá! Encontrei sua loja no Guia Rota CDE." target="_blank" style="color: #4caf50;">${store.whatsapp}</a></div>` : ''}
                ${store.instagram ? `<div class="modal-info-item"><strong>📸 Instagram:</strong> <a href="https://instagram.com/${store.instagram.replace('@','')}" target="_blank" style="color: #e1306c;">${store.instagram}</a></div>` : ''}
                ${store.website ? `<div class="modal-info-item"><strong>🌐 Website:</strong> <a href="${store.website}" target="_blank" style="color: #64b5f6;">${store.website.replace('https://','')}</a></div>` : ''}
            </div>

            <div style="display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap;">
                <button class="btn ${inRoute ? 'btn-success' : 'btn-primary'}" style="flex: 1; min-width: 200px;" onclick="toggleRouteStore('${store.slug}'); openStoreModal('${store.slug}');">
                    ${inRoute ? '✓ No Meu Roteiro' : '+ Adicionar ao Meu Roteiro'}
                </button>
                <a href="index.html?destino=Ciudad+del+Este&loja=${encodeURIComponent(store.name)}#cotacao" class="btn btn-gold" style="flex: 1; min-width: 200px; text-align: center;">
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

// --- MAPA LEAFLET ---
function initLeafletMap() {
    const mapElement = document.getElementById('mapa-compras');
    if (!mapElement || typeof L === 'undefined') return;

    if (!leafletMap) {
        leafletMap = L.map('mapa-compras', {
            center: [-25.5155, -54.6120],
            zoom: 15,
            zoomControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(leafletMap);
    }

    updateMapMarkers(allStores);
}

function updateMapMarkers(storesToDisplay) {
    if (!leafletMap || typeof L === 'undefined') return;

    mapMarkers.forEach(m => leafletMap.removeLayer(m));
    mapMarkers = [];

    const bounds = L.latLngBounds();

    storesToDisplay.forEach(store => {
        if (store.latitude && store.longitude) {
            const lat = parseFloat(store.latitude);
            const lng = parseFloat(store.longitude);
            
            if (!isNaN(lat) && !isNaN(lng)) {
                const marker = L.marker([lat, lng]).addTo(leafletMap);
                const inRoute = isStoreInRoute(store.id || store.slug);

                const popupHtml = `
                    <div style="font-family: 'Inter', sans-serif; padding: 4px;">
                        <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0e1a2f;">${store.name}</h4>
                        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${store.neighborhood || 'Centro'}</p>
                        <button onclick="toggleRouteStore('${store.slug}')" style="background: var(--primary-gold, #c59b27); border: none; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; cursor: pointer; width: 100%;">
                            ${inRoute ? '✓ No Roteiro' : '+ Adicionar'}
                        </button>
                    </div>
                `;

                marker.bindPopup(popupHtml);
                mapMarkers.push(marker);
                bounds.extend([lat, lng]);
            }
        }
    });

    if (mapMarkers.length > 0 && leafletMap) {
        leafletMap.fitBounds(bounds, { padding: [30, 30] });
    }
}

// --- UI DO ROTEIRO ---
function updateRouteUI() {
    const routeBadge = document.getElementById('route-badge-count');
    const floatingBadge = document.getElementById('floating-route-badge-count');
    const container = document.getElementById('route-items-container');
    const emptyView = document.getElementById('route-empty-view');
    const filledView = document.getElementById('route-filled-view');

    const count = selectedRouteStores.length;

    if (routeBadge) routeBadge.innerText = count;
    if (floatingBadge) floatingBadge.innerText = count;

    if (count === 0) {
        if (emptyView) emptyView.style.display = 'block';
        if (filledView) filledView.style.display = 'none';
        return;
    }

    if (emptyView) emptyView.style.display = 'none';
    if (filledView) filledView.style.display = 'block';

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
