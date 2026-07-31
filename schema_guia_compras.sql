-- ============================================================================
-- ROTA CDE TRANSFER - ESTRUTURA DO GUIA DE COMPRAS NO PARAGUAI (SUPABASE SQL)
-- ============================================================================

-- 1. TABELA DE CATEGORIAS DE LOJAS
CREATE TABLE IF NOT EXISTS public.shopping_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT DEFAULT '🛍️',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABELA DE LOJAS EM CIUDAD DEL ESTE
CREATE TABLE IF NOT EXISTS public.shopping_stores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    address TEXT,
    city TEXT DEFAULT 'Ciudad del Este',
    neighborhood TEXT,
    latitude NUMERIC,
    longitude NUMERIC,
    phone TEXT,
    whatsapp TEXT,
    website TEXT,
    instagram TEXT,
    opening_hours TEXT,
    image_url TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABELA DE RELACIONAMENTO LOJAS X CATEGORIAS (MUITOS PARA MUITOS)
CREATE TABLE IF NOT EXISTS public.shopping_store_categories (
    store_id UUID REFERENCES public.shopping_stores(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.shopping_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (store_id, category_id)
);

-- 4. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.shopping_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_store_categories ENABLE ROW LEVEL SECURITY;

-- 5. POLÍTICAS DE RLS (LEITURA PÚBLICA / ESCRITA PARA TODOS OU AUTENTICADOS)
-- Categorias: Leitura pública de categorias ativas
CREATE POLICY "Leitura publica de categorias" ON public.shopping_categories
    FOR SELECT USING (true);

CREATE POLICY "Escrita total em categorias" ON public.shopping_categories
    FOR ALL USING (true);

-- Lojas: Leitura pública de lojas ativas
CREATE POLICY "Leitura publica de lojas" ON public.shopping_stores
    FOR SELECT USING (true);

CREATE POLICY "Escrita total em lojas" ON public.shopping_stores
    FOR ALL USING (true);

-- Relacionamento Categorias x Lojas
CREATE POLICY "Leitura publica de categorias_lojas" ON public.shopping_store_categories
    FOR SELECT USING (true);

CREATE POLICY "Escrita total em categorias_lojas" ON public.shopping_store_categories
    FOR ALL USING (true);

-- 6. INSERIR CATEGORIAS INICIAIS
INSERT INTO public.shopping_categories (name, slug, description, icon) VALUES
('Eletrônicos', 'eletronicos', 'Celulares, câmeras, áudio e eletrodomésticos de última geração.', '📱'),
('Informática', 'informatica', 'Notebooks, componentes de hardware, monitores e periféricos.', '💻'),
('Games', 'games', 'Consoles, jogos, controles e acessórios para gamers.', '🎮'),
('Perfumes e Beleza', 'perfumes-e-beleza', 'Perfumes importados originais, maquiagens e cosméticos.', '💄'),
('Moda', 'moda', 'Roupas masculinas, femininas e infantis de marcas consagradas.', '👕'),
('Calçados', 'calcados', 'Tênis esportivos, sapatos sociais e casuais importados.', '👟'),
('Casa e Decoração', 'casa-e-decoracao', 'Utensílios domésticos, artigos de decoração e utilidades.', '🏠'),
('Bebidas', 'bebidas', 'Vinhos, whiskies, bebidas finas e destilados importados.', '🥃'),
('Loja de Departamento', 'loja-de-departamento', 'Lojas completas com múltiplos setores de compras.', '🛒'),
('Variedades', 'variedades', 'Brinquedos, presentes, malas e artigos diversos.', '📦'),
('Destaques', 'destaques', 'As lojas mais procuradas e recomendadas por visitantes.', '⭐')
ON CONFLICT (slug) DO NOTHING;

-- 7. INSERIR LOJAS EXEMPLE DE DESTAQUE EM CIUDAD DEL ESTE
INSERT INTO public.shopping_stores 
(name, slug, short_description, description, address, neighborhood, latitude, longitude, phone, whatsapp, website, instagram, opening_hours, image_url, active, featured) 
VALUES
(
    'Shopping China',
    'shopping-china',
    'A maior e mais premiada loja de departamentos da América Latina em Ciudad del Este.',
    'O Shopping China é referência mundial em compras no Paraguai. Localizado no 3º piso do Shopping Paris, oferece produtos 100% originais divididos em setores de eletrônicos, cosméticos, bebidas, moda, informática e utilidades.',
    'Av. Luis Maria Argaña, Shopping Paris - 3º Piso',
    'Centro',
    -25.5173,
    -54.6105,
    '+595 61 501 400',
    '+595 983 501 400',
    'https://www.shoppingchina.com.py',
    '@shoppingchinaparaguay',
    'Segunda a Domingo: 07:00 às 19:00',
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
    true,
    true
),
(
    'Nissei',
    'nissei',
    'Especialista em tecnologia, celulares, câmeras e eletrônicos de ponta.',
    'A Nissei é uma das lojas mais tradicionais de Ciudad del Este, reconhecida pelo excelente atendimento, garantia e variedade em marcas renomadas como Apple, Samsung, Sony, Canon e Xiaomi.',
    'Av. Adrián Jara esquina Regimiento Piribebuy',
    'Centro',
    -25.5142,
    -54.6128,
    '+595 61 500 111',
    '+595 983 500 111',
    'https://nissei.com',
    '@nisseiparaguay',
    'Segunda a Sábado: 06:30 às 15:30',
    'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
    true,
    true
),
(
    'Cellshop Importados',
    'cellshop',
    'Ampla variedade de eletrônicos, perfumes, bebidas e artigos esportivos.',
    'Com vários andares dedicados ao consumo inteligente, a Cellshop traz o melhor da tecnologia, moda esportiva, suplementos, brinquedos e perfumes das marcas mais desejadas do mundo.',
    'Av. Carlos Antonio López esquina Monseñor Rodríguez',
    'Centro',
    -25.5150,
    -54.6115,
    '+595 61 501 000',
    '+595 983 600 000',
    'https://www.cellshop.com',
    '@cellshoppy',
    'Segunda a Sábado: 06:30 às 16:00 | Domingo: 08:00 às 14:00',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    true,
    true
),
(
    'Elegancia Perfumaria',
    'elegancia-perfumaria',
    'Referência em perfumes importados, maquiagem e cosméticos originais.',
    'A Elegancia Perfumaria oferece os últimos lançamentos em alta perfumaria internacional, tratamentos para a pele e maquiagens exclusivas com atestado de procedência original.',
    'Edifício Central, Av. Adrián Jara',
    'Centro',
    -25.5138,
    -54.6135,
    '+595 61 512 345',
    '+595 983 512 345',
    'https://eleganciaparaguay.com',
    '@eleganciaperfumaria',
    'Segunda a Sábado: 07:00 às 15:30',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    true,
    false
),
(
    'S.A. Shop',
    'sa-shop',
    'Loja com departamento completo de roupas, calçados e maquiagens.',
    'Localizada estrategicamente no Shopping Galeria e com filial no Shopping Jebai, a SA Shop combina moda de marcas internacionais com promoções diárias imbatíveis.',
    'Av. Monseñor Rodríguez, Shopping Galeria',
    'Centro',
    -25.5160,
    -54.6120,
    '+595 61 500 999',
    '+595 983 500 999',
    'https://sashop.com.py',
    '@sashopparaguay',
    'Segunda a Sábado: 07:00 às 16:00',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    true,
    false
)
ON CONFLICT (slug) DO NOTHING;

-- VINCULAR LOJAS ÀS CATEGORIAS INICIAIS
INSERT INTO public.shopping_store_categories (store_id, category_id)
SELECT s.id, c.id 
FROM public.shopping_stores s, public.shopping_categories c
WHERE (s.slug = 'shopping-china' AND c.slug IN ('loja-de-departamento', 'eletronicos', 'perfumes-e-beleza', 'destaques'))
   OR (s.slug = 'nissei' AND c.slug IN ('eletronicos', 'informatica', 'games', 'destaques'))
   OR (s.slug = 'cellshop' AND c.slug IN ('loja-de-departamento', 'eletronicos', 'bebidas', 'destaques'))
   OR (s.slug = 'elegancia-perfumaria' AND c.slug IN ('perfumes-e-beleza'))
   OR (s.slug = 'sa-shop' AND c.slug IN ('moda', 'calcados', 'variedades'))
ON CONFLICT DO NOTHING;

-- 8. CRIAR BUCKET PÚBLICO "shopping-guide" NO SUPABASE STORAGE VIA SQL
INSERT INTO storage.buckets (id, name, public) 
VALUES ('shopping-guide', 'shopping-guide', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- POLÍTICAS DE RLS PARA O STORAGE BUCKET "shopping-guide"
DROP POLICY IF EXISTS "Permitir download publico do e-book" ON storage.objects;
CREATE POLICY "Permitir download publico do e-book" ON storage.objects
    FOR SELECT USING (bucket_id = 'shopping-guide');

DROP POLICY IF EXISTS "Permitir upload do e-book" ON storage.objects;
CREATE POLICY "Permitir upload do e-book" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'shopping-guide');

DROP POLICY IF EXISTS "Permitir substituicao do e-book" ON storage.objects;
CREATE POLICY "Permitir substituicao do e-book" ON storage.objects
    FOR UPDATE USING (bucket_id = 'shopping-guide');

