-- ==============================================================================
-- SCHEMA SUPABASE POUR VISION HUMAINE 59 (MÉDIATHÈQUE & DASHBOARD DYNAMIQUE)
-- À exécuter dans l'éditeur SQL de votre projet Supabase (SQL Editor -> New Query)
-- ==============================================================================

-- 1. Table des Projets / Catégories de la Galerie
CREATE TABLE IF NOT EXISTS public.gallery_projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    short_title TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT '',
    department TEXT NOT NULL DEFAULT '',
    edition TEXT NOT NULL DEFAULT '',
    date TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    badge TEXT NOT NULL DEFAULT '',
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table des Médias (Photos & Vidéos)
CREATE TABLE IF NOT EXISTS public.gallery_media (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES public.gallery_projects(id) ON DELETE CASCADE,
    src TEXT NOT NULL,
    caption TEXT NOT NULL DEFAULT '',
    alt TEXT NOT NULL DEFAULT '',
    media_type TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Index pour optimiser les requêtes de chargement
CREATE INDEX IF NOT EXISTS idx_gallery_media_project_id ON public.gallery_media(project_id);
CREATE INDEX IF NOT EXISTS idx_gallery_projects_order ON public.gallery_projects(order_index);
CREATE INDEX IF NOT EXISTS idx_gallery_media_order ON public.gallery_media(order_index);

-- 4. Activer le Row Level Security (RLS)
ALTER TABLE public.gallery_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_media ENABLE ROW LEVEL SECURITY;

-- 5. Politiques RLS (Lecture publique pour les visiteurs + Écriture complète pour l'admin)
DROP POLICY IF EXISTS "Public read gallery_projects" ON public.gallery_projects;
CREATE POLICY "Public read gallery_projects" ON public.gallery_projects
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert/update/delete gallery_projects" ON public.gallery_projects;
CREATE POLICY "Public insert/update/delete gallery_projects" ON public.gallery_projects
    FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read gallery_media" ON public.gallery_media;
CREATE POLICY "Public read gallery_media" ON public.gallery_media
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert/update/delete gallery_media" ON public.gallery_media;
CREATE POLICY "Public insert/update/delete gallery_media" ON public.gallery_media
    FOR ALL USING (true) WITH CHECK (true);

-- 6. Création du Bucket de Stockage 'gallery-media' pour les photos/vidéos uploadées
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-media', 'gallery-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Politiques de stockage pour le bucket 'gallery-media'
DROP POLICY IF EXISTS "Public Access Gallery Media Bucket" ON storage.objects;
CREATE POLICY "Public Access Gallery Media Bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'gallery-media');

DROP POLICY IF EXISTS "Admin Upload Gallery Media Bucket" ON storage.objects;
CREATE POLICY "Admin Upload Gallery Media Bucket" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'gallery-media');

DROP POLICY IF EXISTS "Admin Update Gallery Media Bucket" ON storage.objects;
CREATE POLICY "Admin Update Gallery Media Bucket" ON storage.objects
    FOR UPDATE USING (bucket_id = 'gallery-media');

DROP POLICY IF EXISTS "Admin Delete Gallery Media Bucket" ON storage.objects;
CREATE POLICY "Admin Delete Gallery Media Bucket" ON storage.objects
    FOR DELETE USING (bucket_id = 'gallery-media');

-- 7. Table des Dons et Donateurs
CREATE TABLE IF NOT EXISTS public.donations (
    id TEXT PRIMARY KEY,
    reference TEXT NOT NULL UNIQUE,
    transaction_id TEXT,
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donor_phone TEXT,
    amount NUMERIC NOT NULL,
    currency TEXT NOT NULL DEFAULT 'EUR',
    type TEXT NOT NULL DEFAULT 'once',
    allocation TEXT NOT NULL DEFAULT 'general',
    payment_method TEXT NOT NULL DEFAULT 'kkiapay',
    status TEXT NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public insert donations" ON public.donations;
CREATE POLICY "Public insert donations" ON public.donations
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public select/update/delete donations" ON public.donations;
CREATE POLICY "Public select/update/delete donations" ON public.donations
    FOR ALL USING (true) WITH CHECK (true);

