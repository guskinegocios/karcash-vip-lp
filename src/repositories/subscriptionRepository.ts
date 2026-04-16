import { supabase } from "@/lib/supabaseClient";

interface CreateSubscriptionParams {
    name: string;
    email: string;
    phone: string;
    instagram?: string;
    membership_level?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    referrer?: string;
}

const subscriptionRepository = {
    /**
     * Chama a RPC do Supabase para criar perfil e assinatura.
     * @param params Dados do usuário (nome, email, telefone + UTMs)
     */
    createSubscription: async ({ 
        name, email, phone, instagram, membership_level,
        utm_source, utm_medium, utm_campaign, utm_content, utm_term, referrer 
    }: CreateSubscriptionParams) => {
        // Sanitização: Garante que valores undefined sejam passados como null para a RPC, 
        // evitando erros de Bad Request (400) no PostgREST.
        const { data, error } = await supabase.rpc('create_profile_and_subscription', {
            user_name: (name || '').toString(),
            user_email: (email || '').toString(),
            user_phone: (phone || '').toString(),
            user_instagram: instagram ? instagram.toString() : null,
            u_source: utm_source ? utm_source.toString() : null,
            u_medium: utm_medium ? utm_medium.toString() : null,
            u_campaign: utm_campaign ? utm_campaign.toString() : null,
            u_content: utm_content ? utm_content.toString() : null,
            u_term: utm_term ? utm_term.toString() : null,
            u_referrer: referrer ? referrer.toString() : null,
            u_membership_level: membership_level ? membership_level.toString() : 'not_selected'
        });

        if (error) {
            throw error;
        }

        return data;
    },

    /**
     * Atualiza os dados de qualificação VIP do usuário.
     * @param email E-mail do usuário
     * @param data Dados de qualificação
     */
    updateProfileVip: async (email: string, data: any) => {
        const { error } = await supabase.rpc('update_profile_vip', {
            user_email: email,
            u_age_range: data.age_range,
            u_region: data.region,
            u_income_level: data.income_level,
            u_experience_level: data.experience_level,
            u_main_fear: data.main_fear,
            u_main_interest: data.main_interest
        });

        if (error) {
            throw error;
        }

        return true;
    },

    /**
     * Atualiza o status da assinatura de um usuário pelo e-mail.
     * @param email E-mail do usuário
     * @param status Novo status da assinatura (ex: 'active', 'pending')
     */
    updateStatusByEmail: async (email: string, status: 'active' | 'pending' | 'canceled') => {
        // 1. Busca o profile_id pelo email
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', email)
            .single();

        if (profileError || !profile) {
            throw new Error(`Profile not found for email: ${email}`);
        }

        // 2. Atualiza a assinatura vinculada
        const { error: updateError } = await supabase
            .from('subscriptions')
            .update({ status: status })
            .eq('profile_id', profile.id);

        if (updateError) {
            throw updateError;
        }

        return true;
    }
};

export default subscriptionRepository;
