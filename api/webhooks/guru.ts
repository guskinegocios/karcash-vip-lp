import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Inicializa clientes
const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY!
);

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const payload = request.body;

        console.log('Webhook Guru received:', payload);

        // Verifica status de aprovação
        // O Guru envia 'status' no payload. Valores comuns: 'approved', 'authorized', 'concluded'
        const status = payload.status;

        if (status !== 'approved') {
            // Se não for aprovado, apenas ignoramos (ou logamos)
            console.log(`Pagamento não aprovado. Status: ${status}`);
            return response.status(200).json({ received: true });
        }

        // Extrai dados do contato
        const email = payload.contact?.email || payload.billing?.email;
        const name = payload.contact?.name || payload.name;

        if (!email) {
            console.error('Email não encontrado no payload');
            return response.status(400).json({ error: 'Email missing from payload' });
        }

        // 1. Atualizar Status no Supabase
        // Primeiro buscamos o profile pelo email
        console.log('Searching for profile with email:', email);
        console.log('Using Service Key?', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', email)
            .single();

        if (profileError || !profile) {
            console.error('Perfil não encontrado para:', email);
            // Pode ser que o usuário comprou sem passar pelo nosso cadastro inicial?
            // Nesse caso, o ideal seria CRIAR o usuário.
            // Mas por enquanto, vamos assumir que ele passou pelo nosso checkout.
            return response.status(404).json({ error: 'User not found in database' });
        }

        const { error: updateError } = await supabase
            .from('subscriptions')
            .update({
                status: 'active',
                gateway_transaction_id: payload.transaction_id || payload.marketplace_transaction_id
            })
            .eq('profile_id', profile.id);

        if (updateError) {
            console.error('Erro ao atualizar assinatura:', updateError);
            return response.status(500).json({ error: 'Failed to update subscription' });
        }

        // 2. Enviar E-mail de Boas-vindas (Com Link do WhatsApp)
        // Link do grupo fictício por enquanto, ou pegamos do env se tiver
        const whatsappLink = "https://chat.whatsapp.com/GURU_VIP_GROUP";

        await resend.emails.send({
            from: 'KarCash <vendas@karcash.com.br>',
            to: [email],
            subject: 'Confirmação de Sistema - KarCash Vendas 🚀',
            html: `
                <div style="font-family: 'Inter', 'Segoe UI', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                    <!-- Header with Logo -->
                    <div style="background-color: #030712; padding: 32px 20px; text-align: center; border-bottom: 4px solid #00ff00;">
                        <img src="https://karcash-vip-lp.vercel.app/logo_karcash.webp" alt="KarCash" style="max-width: 200px; height: auto; filter: drop-shadow(0 0 8px rgba(0, 255, 0, 0.3));" />
                    </div>
                    
                    <div style="padding: 48px 40px; line-height: 1.6; color: #1f2937;">
                        <h1 style="color: #111827; margin-top: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; text-align: center;">Bem-vindo ao KarCash VIP! 🚀</h1>
                        
                        <p style="font-size: 16px; color: #4b5563; text-align: center; margin-bottom: 32px;">Seu pagamento foi aprovado e seu acesso exclusivo já está liberado.</p>

                        <div style="background-color: #f9fafb; border: 1px solid #f3f4f6; border-left: 5px solid #00ff00; border-radius: 12px; padding: 24px; margin: 32px 0; text-align: center;">
                            <p style="margin: 0; font-weight: 500; color: #111827;">Estamos felizes em ter você conosco! Clique no botão abaixo para entrar na nossa comunidade privada.</p>
                        </div>
                        
                        <div style="text-align: center; margin: 40px 0;">
                            <a href="${whatsappLink}" style="background-color: #00ff00; color: #000000; padding: 18px 36px; text-decoration: none; font-weight: 800; border-radius: 12px; display: inline-block; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(0, 255, 0, 0.2); transition: transform 0.2s;">
                                ACESSAR GRUPO VIP AGORA 📲
                            </a>
                        </div>
                        
                        <p style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 24px;">
                            Caso tenha qualquer dúvida, basta responder a este e-mail ou falar com nosso suporte.
                        </p>

                        <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #f3f4f6; text-align: center;">
                            <p style="margin: 0; color: #111827; font-weight: 700; font-size: 16px;">Equipe KarCash Vendas</p>
                        </div>
                    </div>
                    
                    <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6;">
                        © ${new Date().getFullYear()} KarCash • O seu marketplace de oportunidades automotivas.<br/>
                        Todos os direitos reservados.
                    </div>
                </div>
            `,
        });

        return response.status(200).json({ success: true });

    } catch (error: any) {
        console.error('Webhook Error:', error);
        return response.status(500).json({ error: error.message });
    }
}
