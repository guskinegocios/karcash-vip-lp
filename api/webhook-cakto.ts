import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Inicializa Supabase e Resend
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const payload = req.body;
        console.log('[CAKTO WEBHOOK] Payload recebido:', JSON.stringify(payload, null, 2));

        // ==== VALIDAÇÃO DE SEGURANÇA ====
        const expectedSecret = process.env.CAKTO_WEBHOOK_SECRET;
        if (expectedSecret && payload.secret !== expectedSecret) {
            console.error('🚨 [CAKTO WEBHOOK] ALERTA DE SEGURANÇA: Chave secreta inválida.');
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const eventType = payload.event_id || payload.event;
        const customerEmail = 
            payload.customer?.email || 
            payload.data?.customer?.email || 
            payload.client?.email || 
            payload.email;

        if (!eventType || !customerEmail) {
            return res.status(400).json({ error: 'Evento ou e-mail faltando.' });
        }

        // 1. Buscar os Dados do Cliente no Supabase para garantir @instagram e WhatsApp
        const { data: userData } = await supabase
            .from('subscriptions')
            .select('instagram, name')
            .eq('email', customerEmail)
            .single();

        const instaHandle = userData?.instagram || '[@NãoInformado]';
        const clientName = userData?.name || 'Cliente';
        const phone = payload.customer?.phone || payload.data?.customer?.phone || 'Não informado';

        const adminEmail = 'guskinegocios@gmail.com';
        const defaultSender = 'KarCash <vendas@karcash.com.br>';

        // ==== LOGICA DE FILTRO DE EVENTOS ====

        // A. EVENTO: REEMBOLSO / ESTORNO
        if (['chargeback', 'refund'].includes(eventType)) {
            await supabase.from('subscriptions').update({ status: 'cancelado' }).eq('email', customerEmail);
            
            // Alerta Admin
            await resend.emails.send({
                from: defaultSender,
                to: adminEmail,
                subject: `🚨 URGENTE: Cliente pediu reembolso! (Remova do perfil karcashvip) - ${instaHandle}`,
                html: `
                    <p><strong>Nome:</strong> ${clientName}</p>
                    <p><strong>Email:</strong> ${customerEmail}</p>
                    <p><strong>Insta:</strong> ${instaHandle}</p>
                    <p><strong>Whats:</strong> ${phone}</p>
                    <p><strong>Motivo:</strong> Reembolso / Estorno</p>
                `
            });

            // Aviso Cliente (Genérico)
            await resend.emails.send({
                from: defaultSender,
                replyTo: adminEmail,
                to: customerEmail,
                subject: 'Atualização sobre sua assinatura KarCash VIP',
                html: `<p>Olá ${clientName}, confirmamos sua solicitação de reembolso. Seu acesso ao perfil VIP foi revogado.</p>`
            });
        }
        
        // B. EVENTO: CANCELOU A ASSINATURA / PAGAMENTO RECUSADO OU ATRASADO
        else if (['subscription_canceled', 'subscription_renewal_refused', 'payment_refused', 'payment_expired', 'subscription_late'].includes(eventType)) {
            await supabase.from('subscriptions').update({ status: 'cancelado' }).eq('email', customerEmail);

            const isCancel = eventType === 'subscription_canceled';
            const subjectAdmin = isCancel 
                ? `🚨 Cancelamento de Assinatura. (Remova do perfil karcashvip) - ${instaHandle}`
                : `⚠️ Pagamento Atrasado/Falhou. (Remova do perfil karcashvip) - ${instaHandle}`;

            // Alerta Admin
            await resend.emails.send({
                from: defaultSender,
                to: adminEmail,
                subject: subjectAdmin,
                html: `
                    <p><strong>Nome:</strong> ${clientName}</p>
                    <p><strong>Email:</strong> ${customerEmail}</p>
                    <p><strong>Insta:</strong> ${instaHandle}</p>
                    <p><strong>Whats:</strong> ${phone}</p>
                    <p><strong>Evento:</strong> ${eventType}</p>
                `
            });

            // Aviso Cliente (Genérico)
            await resend.emails.send({
                from: defaultSender,
                replyTo: adminEmail,
                to: customerEmail,
                subject: 'Atualização sobre sua assinatura KarCash VIP',
                html: `<p>Olá ${clientName}, verificamos que a sua assinatura recorrente VIP foi cancelada ou seu pagamento constou como expirado/pendente, portanto, seu acesso foi revogado.</p>`
            });
        }

        // C. EVENTO: PAGAMENTO APROVADO (SÓ AQUI DISPARA O BEM-VINDO)
        else if (['subscription_active', 'subscription_created', 'payment_approved', 'purchase_approved'].includes(eventType)) {
            await supabase.from('subscriptions').update({ status: 'active' }).eq('email', customerEmail);
            
            // Email de Boas-Vindas para o Cliente (O visual premium que arrumamos)
            await resend.emails.send({
                from: defaultSender,
                replyTo: 'vendas@karcash.com.br',
                to: customerEmail,
                subject: '🚨 O SEU ACESSO VIP EXCLUSIVO ESTÁ AQUI 🚨',
                html: `
<div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
    <div style="background-color: #050505; padding: 40px 20px; text-align: center; border-bottom: 4px solid #00ff00;">
        <img src="https://www.karcash.com.br/logo_karcash_email.webp" alt="KarCash VIP" style="max-width: 220px; display: inline-block;" />
    </div>
    
    <div style="padding: 48px 40px; line-height: 1.6; color: #1f2937;">
        <h1 style="color: #111827; text-align: center; font-size: 24px;">Pagamento Aprovado! Bem-vindo!</h1>
        <p style="text-align: center;">Olá, ${clientName}!</p>
        <p style="text-align: center;">O primeiro passo já foi dado. Agora, você precisa enviar a solicitação para seguir a página oficial no Instagram.</p>

        <div style="background-color: #f3f4f6; border-radius: 12px; padding: 24px; margin: 40px 0; text-align: center;">
            <p style="font-size: 14px; font-weight: 600; text-transform: uppercase;">SEU INSTAGRAM REGISTRADO:</p>
            <p style="font-size: 20px; font-weight: 700; color: #000;">@${instaHandle}</p>
        </div>

        <div style="text-align: center;">
            <a href="https://www.instagram.com/karcashvip/" style="display: inline-block; padding: 16px 32px; background-color: #050505; color: #00ff00; text-decoration: none; font-weight: 700; border-radius: 8px;">1. ACESSAR INSTAGRAM DA KARCASH</a>
        </div>
        <p style="text-align: center; margin-top: 15px;">2. Após entrar no perfil aperte em <strong>"SEGUIR"</strong>.</p>
    </div>
</div>
                `
            });
            
            // Alerta Operacional Admin
            await resend.emails.send({
                from: defaultSender,
                to: adminEmail,
                subject: `💰 NOVO VIP PAGOU! Aceite no Insta: ${instaHandle}`,
                html: `
                    <p><strong>Nome:</strong> ${clientName}</p>
                    <p><strong>Email:</strong> ${customerEmail}</p>
                    <p><strong>Insta:</strong> ${instaHandle}</p>
                    <p><strong>Whats:</strong> ${phone}</p>
                    <p><strong>Status:</strong> Pagamento Aprovado! Pode aceitar no perfil <strong>karcashvip</strong>.</p>
                `
            });
        }

        return res.status(200).json({ received: true });

    } catch (error) {
        console.error('[CAKTO WEBHOOK] Erro de Servidor:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
