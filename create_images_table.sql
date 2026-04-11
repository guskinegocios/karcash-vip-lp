-- SQL para criar a tabela de links de imagens
-- Execute este script no SQL Editor do seu projeto Supabase

CREATE TABLE IF NOT EXISTS public.seller_lead_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES public.seller_leads(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    type TEXT NOT NULL, -- 'photoFront', 'photoRear', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Segurança)
ALTER TABLE public.seller_lead_images ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY "Enable insert for all" ON public.seller_lead_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for all" ON public.seller_lead_images FOR SELECT USING (true);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_seller_images_lead_id ON public.seller_lead_images (lead_id);
