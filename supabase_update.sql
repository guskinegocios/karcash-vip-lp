-- SQL para atualizar a tabela de leads de venda (Seller Leads)
-- Execute este script no SQL Editor do seu projeto Supabase

ALTER TABLE IF EXISTS public.seller_leads 
ADD COLUMN IF NOT EXISTS car_brand TEXT,
ADD COLUMN IF NOT EXISTS car_model TEXT,
ADD COLUMN IF NOT EXISTS car_year INTEGER,
ADD COLUMN IF NOT EXISTS car_plate TEXT,
ADD COLUMN IF NOT EXISTS car_km TEXT,
ADD COLUMN IF NOT EXISTS car_fipe TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS works BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS gears_engage BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS rolls BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_paid_off BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS has_debts BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Opcional: Criar um índice para organizar por status
CREATE INDEX IF NOT EXISTS idx_seller_leads_status ON public.seller_leads (status);

-- NOTA sobre fotos:
-- Como as fotos são arquivos binários, elas devem ser enviadas para um Bucket chamado 'seller-assets'.
-- Caso queira que eu implemente o roteamento automático de fotos para o Bucket, confirme se o bucket já foi criado.
