-- 1. Adicionar coluna de nível de membro à tabela de profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS membership_level TEXT DEFAULT 'not_selected';

-- 2. Atualizar a função RPC (Corrigido: Usando coluna "name" em vez de "full_name")
CREATE OR REPLACE FUNCTION public.create_profile_and_subscription(
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  user_instagram TEXT DEFAULT NULL,
  u_source TEXT DEFAULT NULL,
  u_medium TEXT DEFAULT NULL,
  u_campaign TEXT DEFAULT NULL,
  u_content TEXT DEFAULT NULL,
  u_term TEXT DEFAULT NULL,
  u_referrer TEXT DEFAULT NULL,
  u_membership_level TEXT DEFAULT 'not_selected'
) 
RETURNS UUID 
LANGUAGE plpgsql 
SECURITY DEFINER 
AS $$
DECLARE
  new_profile_id UUID;
BEGIN
  -- Normalização básica
  user_email := LOWER(TRIM(user_email));
  user_name := TRIM(user_name);
  user_phone := TRIM(user_phone);
  user_instagram := NULLIF(TRIM(user_instagram), '');

  -- UPSERT do perfil usando a coluna "name"
  INSERT INTO public.profiles (
    name, 
    email, 
    phone, 
    instagram, 
    utm_source, 
    utm_medium, 
    utm_campaign, 
    utm_content, 
    utm_term, 
    referrer,
    membership_level
  )
  VALUES (
    user_name, 
    user_email, 
    user_phone, 
    user_instagram, 
    u_source, 
    u_medium, 
    u_campaign, 
    u_content, 
    u_term, 
    u_referrer,
    u_membership_level
  )
  ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    phone = EXCLUDED.phone,

    -- Só atualiza se vier valor novo (preserva dados antigos se o novo for NULL)
    instagram = COALESCE(EXCLUDED.instagram, profiles.instagram),

    utm_source = COALESCE(EXCLUDED.utm_source, profiles.utm_source),
    utm_medium = COALESCE(EXCLUDED.utm_medium, profiles.utm_medium),
    utm_campaign = COALESCE(EXCLUDED.utm_campaign, profiles.utm_campaign),
    utm_content = COALESCE(EXCLUDED.utm_content, profiles.utm_content),
    utm_term = COALESCE(EXCLUDED.utm_term, profiles.utm_term),
    referrer = COALESCE(EXCLUDED.referrer, profiles.referrer),

    membership_level = COALESCE(EXCLUDED.membership_level, profiles.membership_level),

    updated_at = NOW()

  RETURNING id INTO new_profile_id;

  -- Garante assinatura inicial
  INSERT INTO public.subscriptions (profile_id, status)
  VALUES (new_profile_id, 'pending')
  ON CONFLICT (profile_id) DO NOTHING;

  RETURN new_profile_id;
END;
$$;
