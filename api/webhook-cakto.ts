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

        // ==== COMPONENTES DE ESTILO PREMIUM (CSS INLINE) ====
        const mainContainerStyle = "font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);";
        const headerStyle = "background-color: #050505; padding: 40px 20px; text-align: center; border-bottom: 4px solid #00ff00;";
        const bodyContentStyle = "padding: 40px; line-height: 1.6; color: #1f2937;";
        const footerStyle = "background-color: #f9fafb; padding: 32px 40px; border-top: 1px solid #f3f4f6; text-align: left; font-size: 14px; color: #6b7280;";
        const buttonPrimaryStyle = "display: inline-block; padding: 16px 32px; background-color: #050505; color: #00ff00; text-decoration: none; font-weight: 700; border-radius: 8px; text-align: center; margin: 10px 0;";
        const cardLightStyle = "background-color: #f3f4f6; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #00ff00;";

        // Assinatura padrão KarCash
        const karcashSignature = `
            <div style="margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 24px;">
                <p style="margin: 0; color: #111827; font-weight: 700;">Agradecemos pela sua confiança!</p>
                <p style="margin: 4px 0 0 0; color: #111827; font-weight: 600;">Equipe KarCash</p>
                <p style="margin: 4px 0 0 0; color: #059669; font-size: 13px;">Seu conhecimento se torna renda com a gente 🚗</p>
                
                <div style="margin-top: 24px; padding: 16px; background-color: #ecfdf5; border-radius: 8px; border: 1px solid #d1fae5; text-align: center;">
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #065f46; font-weight: 600;">Precisa de ajuda ou suporte?</p>
                    <a href="https://wa.me/554796697000" style="display: inline-flex; align-items: center; justify-content: center; background-color: #25d366; color: #ffffff; text-decoration: none; font-weight: 700; padding: 10px 20px; border-radius: 6px; font-size: 14px;">
                        Falar com Suporte VIP (WhatsApp)
                    </a>
                </div>

                <p style="margin-top: 32px; font-size: 11px; color: #9ca3af; line-height: 1.4;">
                    Esse e-mail foi enviado automaticamente pela <strong>KarCash</strong>, sistema de entrega de oportunidades automotivas.<br/>
                    Agradecemos desde já,<br/>
                    Equipe KarCash
                </p>
            </div>
        `;

        // ==== LÓGICA DE EVENTOS (COM DESIGN NOVO) ====

        // 1. EVENTO: REEMBOLSO / ESTORNO
        if (['chargeback', 'refund'].includes(eventType)) {
            await supabase.from('subscriptions').update({ status: 'cancelado' }).eq('email', customerEmail);
            
            // Email Admin (Equipe)
            await resend.emails.send({
                from: defaultSender,
                to: adminEmail,
                subject: `🚨 URGENTE: Cliente pediu reembolso! (Remova do perfil karcashvip) - ${instaHandle}`,
                html: `
                    <div style="${mainContainerStyle}">
                        <div style="${headerStyle}">
                            <img src="https://www.karcash.com.br/logo_karcash_email.webp" alt="KarCash VIP" style="max-width: 180px;" />
                        </div>
                        <div style="${bodyContentStyle}">
                            <h2 style="color: #ef4444; margin-top: 0;">⚠️ REMOÇÃO DE ACESSO EXIGIDA</h2>
                            <p>O cliente solicitou um estorno ou reembolso na Cakto.</p>
                            <div style="${cardLightStyle}; border-left-color: #ef4444;">
                                <p style="margin: 5px 0;"><strong>Nome:</strong> ${clientName}</p>
                                <p style="margin: 5px 0;"><strong>Email:</strong> ${customerEmail}</p>
                                <p style="margin: 5px 0;"><strong>Whats:</strong> ${phone}</p>
                                <p style="margin: 10px 0 0 0; font-size: 18px;"><strong>Instagram VIP: <mark style="background: #fee2e2;">${instaHandle}</mark></strong></p>
                            </div>
                            <p>👉 <strong>AÇÃO:</strong> Procure este @ no perfil privado <strong>karcashvip</strong> e remova o seguidor agora.</p>
                        </div>
                    </div>
                `
            });

            // Email Cliente (Premium)
            await resend.emails.send({
                from: defaultSender,
                replyTo: 'vendas@karcash.com.br',
                to: customerEmail,
                subject: 'Sua assinatura KarCash VIP: Reembolso Processado',
                html: `
                    <div style="${mainContainerStyle}">
                        <div style="${headerStyle}">
                            <img src="https://www.karcash.com.br/logo_karcash_email.webp" alt="KarCash VIP" style="max-width: 180px;" />
                        </div>
                        <div style="${bodyContentStyle}">
                            <h2 style="color: #111827; margin-top: 0;">Confirmação de Reembolso</h2>
                            <p>Olá <strong>${clientName}</strong>, tudo bem?</p>
                            <p>Recebemos a notificação de que o seu pagamento foi reembolsado. Com isso, informamos que o seu acesso ao perfil VIP privado <strong>@karcashvip</strong> e às oportunidades exclusivas foi revogado.</p>
                            <p>Se as oportunidades não foram o que você esperava ou se houve algum problema técnico, o nosso time de suporte está à sua disposição no WhatsApp abaixo para ouvir seu feedback.</p>
                            ${karcashSignature}
                        </div>
                    </div>
                `
            });
        }
        
        // 2. EVENTO: CANCELOU A ASSINATURA / PAGAMENTO RECUSADO OU ATRASADO
        else if (['subscription_canceled', 'subscription_renewal_refused', 'payment_refused', 'payment_expired', 'subscription_late'].includes(eventType)) {
            await supabase.from('subscriptions').update({ status: 'cancelado' }).eq('email', customerEmail);

            const isCancel = eventType === 'subscription_canceled';
            const subjectAdmin = isCancel 
                ? `🚨 Cancelamento de Assinatura. (Remova do perfil karcashvip) - ${instaHandle}`
                : `⚠️ Pagamento Atrasado/Falhou. (Remova do perfil karcashvip) - ${instaHandle}`;

            // Email Admin
            await resend.emails.send({
                from: defaultSender,
                to: adminEmail,
                subject: subjectAdmin,
                html: `
                    <div style="${mainContainerStyle}">
                        <div style="${headerStyle}">
                            <img src="https://www.karcash.com.br/logo_karcash_email.webp" alt="KarCash VIP" style="max-width: 180px;" />
                        </div>
                        <div style="${bodyContentStyle}">
                            <h2 style="color: #f59e0b; margin-top: 0;">${isCancel ? 'ASSINATURA CANCELADA' : 'PAGAMENTO RECUSADO/EXPIRADO'}</h2>
                            <div style="${cardLightStyle}; border-left-color: #f59e0b;">
                                <p style="margin: 5px 0;"><strong>Nome:</strong> ${clientName}</p>
                                <p style="margin: 5px 0;"><strong>Email:</strong> ${customerEmail}</p>
                                <p style="margin: 5px 0;"><strong>Insta:</strong> ${instaHandle}</p>
                                <p style="margin: 5px 0;"><strong>Whats:</strong> ${phone}</p>
                                <p style="margin: 5px 0;"><strong>Evento:</strong> ${eventType}</p>
                            </div>
                            <p>👉 <strong>AÇÃO:</strong> Remova o seguidor do perfil privado <strong>karcashvip</strong>.</p>
                        </div>
                    </div>
                `
            });

            // Email Cliente
            await resend.emails.send({
                from: defaultSender,
                replyTo: 'vendas@karcash.com.br',
                to: customerEmail,
                subject: 'Atualização importante sobre sua assinatura KarCash VIP',
                html: `
                    <div style="${mainContainerStyle}">
                        <div style="${headerStyle}">
                            <img src="https://www.karcash.com.br/logo_karcash_email.webp" alt="KarCash VIP" style="max-width: 180px;" />
                        </div>
                        <div style="${bodyContentStyle}">
                            <h2 style="color: #111827; margin-top: 0;">Sua assinatura foi interrompida</h2>
                            <p>Olá <strong>${clientName}</strong>,</p>
                            <p>Lamentamos informar que a sua assinatura VIP foi cancelada ou que tivemos um problema ao processar seu pagamento recorrente.</p>
                            <p>Para manter o ecossistema justo para todos os investidores, <strong>o seu acesso ao perfil privado foi revogado temporariamente</strong>.</p>
                            <p>Caso queira reativar seu acesso e voltar a receber as ofertas do mercado, basta realizar um novo pagamento através do link oficial ou entrar em contato conosco.</p>
                            ${karcashSignature}
                        </div>
                    </div>
                `
            });
        }

        // 3. EVENTO: PAGAMENTO APROVADO (BEM-VINDO PREMIUM)
        else if (['subscription_active', 'subscription_created', 'payment_approved', 'purchase_approved'].includes(eventType)) {
            await supabase.from('subscriptions').update({ status: 'active' }).eq('email', customerEmail);
            
            // Email de Boas-Vindas para o Cliente (DESIGN CAKTO/VIP)
            await resend.emails.send({
                from: defaultSender,
                replyTo: 'vendas@karcash.com.br',
                to: customerEmail,
                subject: '🚨 O SEU ACESSO VIP EXCLUSIVO ESTÁ AQUI 🚨',
                html: `
                    <div style="${mainContainerStyle}">
                        <div style="${headerStyle}">
                            <img src="https://www.karcash.com.br/logo_karcash_email.webp" alt="KarCash VIP" style="max-width: 180px;" />
                        </div>
                        <div style="${bodyContentStyle}">
                            <h1 style="color: #111827; text-align: center; font-size: 26px; margin-top: 0; font-weight: 800; letter-spacing: -0.02em;">Acesso VIP Confirmado! 🎉</h1>
                            <p style="text-align: center; font-size: 16px; color: #4b5563;">Parabéns <strong>${clientName}</strong>, você agora faz parte do grupo seleto de investidores KarCash.</p>

                            <div style="${cardLightStyle}">
                                <p style="text-align: center; margin: 0;"><strong>Seu Instagram Registrado:</strong></p>
                                <p style="text-align: center; font-size: 24px; font-weight: 800; color: #000; margin: 10px 0;">@${instaHandle}</p>
                                <p style="text-align: center; font-size: 13px; color: #6b7280; margin: 0;">(Use este perfil para solicitar acesso abaixo)</p>
                            </div>

                            <div style="text-align: center; margin: 40px 0;">
                                <a href="https://www.instagram.com/karcashvip/" style="${buttonPrimaryStyle}">
                                    SOLICITAR ACESSO AO INSTAGRAM VIP
                                </a>
                                <p style="font-size: 13px; color: #6b7280; margin-top: 10px;">Após entrar no perfil, aperte no botão azul <strong>"Seguir"</strong>.</p>
                            </div>

                            <div style="background-color: #fefce8; border: 1px solid #fef08a; border-radius: 12px; padding: 20px; margin: 32px 0;">
                                <h4 style="margin: 0 0 10px 0; color: #854d0e;">💎 Ajude-nos a melhorar seu lucro!</h4>
                                <p style="margin: 0; font-size: 14px; color: #713f12; line-height: 1.5;">
                                    Gostaríamos de te pedir gentilmente para responder nosso rápido formulário de perfil. Suas respostas ajudam a KarCash a minerar oportunidades ainda melhores para você.
                                </p>
                                <a href="https://www.karcash.com.br/form" style="display: inline-block; margin-top: 15px; color: #000; font-weight: 700; font-size: 14px; text-decoration: underline;">
                                    Responder Form de Perfil VIP (Leva 1 min)
                                </a>
                            </div>

                            ${karcashSignature}
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
                    <div style="${mainContainerStyle}">
                        <div style="${headerStyle}">
                            <img src="https://www.karcash.com.br/logo_karcash_email.webp" alt="KarCash VIP" style="max-width: 140px;" />
                        </div>
                        <div style="padding: 24px;">
                            <h3 style="color: #059669; margin-top: 0;">💰 NOVA VENDA CONFIRMADA</h3>
                            <div style="background-color: #f0fdf4; border-radius: 8px; padding: 15px; border-left: 4px solid #059669;">
                                <p style="margin: 5px 0;"><strong>Comprador:</strong> ${clientName}</p>
                                <p style="margin: 5px 0;"><strong>Email:</strong> ${customerEmail}</p>
                                <p style="margin: 5px 0;"><strong>Whats:</strong> ${phone}</p>
                                <p style="margin: 5px 0; font-size: 16px;"><strong>Instagram: <mark>${instaHandle}</mark></strong></p>
                            </div>
                            <p style="font-size: 13px;">👉 <strong>AÇÃO:</strong> Já pode aceitar este perfil lá no <strong>karcashvip</strong>.</p>
                        </div>
                    </div>
                `
            });
        }

        return res.status(200).json({ received: true });

    } catch (error) {
        console.error('[CAKTO WEBHOOK] Erro de Servidor:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
