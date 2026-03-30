import { supabase } from "@/lib/supabaseClient";

interface CreateSubscriptionParams {
    name: string;
    email: string;
    phone: string;
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
        name, email, phone, 
        utm_source, utm_medium, utm_campaign, utm_content, utm_term, referrer 
    }: CreateSubscriptionParams) => {
        const { data, error } = await supabase.rpc('create_profile_and_subscription', {
            user_name: name,
            user_email: email,
            user_phone: phone,
            u_source: utm_source,
            u_medium: utm_medium,
            u_campaign: utm_campaign,
            u_content: utm_content,
            u_term: utm_term,
            u_referrer: referrer
        });

        if (error) {
            throw error;
        }

        return data;
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
