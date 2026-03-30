import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Inicializa o cliente Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    // Apenas permite método POST
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, name, phone, type, carDetails } = request.body;

        // Validação básica
        if (!email || !name) {
            return response.status(400).json({ error: 'Email and name are required' });
        }

        // Remetente verificado no Resend
        const fromEmail = 'KarCash <vendas@karcash.com.br>';

        // Destinatários: O cliente E a equipe de vendas
        const recipients = [email, 'guskinegocios@gmail.com'];

        let subject = 'Suas oportunidades VIP estão quase liberadas! 🚗';
        let title = 'Bem-vindo ao Clube KarCash VIP!';
        let message = 'Seu cadastro foi recebido com sucesso. Agora você está a um passo das melhores oportunidades do mercado.';
        let extraInfo = '';

        if (type === 'oferta_venda') {
            subject = 'Nova Oferta de Venda Recebida - KarCash 💰';
            title = 'Olá, recebemos sua proposta de venda!';
            message = 'Nossa rede de investidores já foi notificada sobre o seu veículo.';
            extraInfo = `
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
                    <p style="margin: 0;"><strong>Veículo:</strong> ${carDetails?.model || 'Não informado'}</p>
                    <p style="margin: 0;"><strong>Ano:</strong> ${carDetails?.year || 'Não informado'}</p>
                    <p style="margin: 5px 0 0 0;"><strong>Descrição:</strong> ${carDetails?.description || 'Não informado'}</p>
                </div>
            `;
        }

        // Envio do e-mail
        const data = await resend.emails.send({
            from: fromEmail,
            to: recipients,
            subject: subject,
            html: `
                <div style="font-family: 'Inter', 'Segoe UI', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                    <!-- Header with Logo -->
                    <div style="background-color: #030712; padding: 32px 20px; text-align: center; border-bottom: 4px solid #00ff00;">
                        <img src="https://karcash-vip-lp.vercel.app/src/assets/logo_karcash-removebg_1.webp" alt="KarCash" style="max-width: 200px; height: auto; filter: drop-shadow(0 0 8px rgba(0, 255, 0, 0.3));" />
                    </div>
                    
                    <div style="padding: 48px 40px; line-height: 1.6; color: #1f2937;">
                        <h1 style="color: #111827; margin-top: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; text-align: center;">${title}</h1>
                        
                        <p style="font-size: 16px; color: #4b5563; text-align: center; margin-bottom: 32px;">${message}</p>

                        <div style="background-color: #f9fafb; border: 1px solid #f3f4f6; border-left: 5px solid #00ff00; border-radius: 12px; padding: 24px; margin: 32px 0;">
                            <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af;">Dados do Lead</h3>
                            <div style="display: grid; gap: 12px;">
                                <p style="margin: 0; font-size: 15px;"><strong>Nome:</strong> <span style="color: #111827;">${name}</span></p>
                                <p style="margin: 4px 0 0 0; font-size: 15px;"><strong>E-mail:</strong> <span style="color: #111827;">${email}</span></p>
                                <p style="margin: 4px 0 0 0; font-size: 15px;"><strong>WhatsApp:</strong> <span style="color: #111827;">${phone || 'Não informado'}</span></p>
                                ${extraInfo ? `<div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">${extraInfo}</div>` : ''}
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 40px; padding: 30px; background-color: #030712; border-radius: 12px; color: #ffffff;">
                            <p style="margin-bottom: 20px; font-weight: 700; font-size: 18px;">Passo 1: Acesso ao Instagram:</p>
                            <a href="https://www.instagram.com/${(process.env.VITE_INSTAGRAM_VIP_HANDLE || '@karcash_vip').replace('@', '')}/" style="background-color: #00ff00; color: #030712; text-decoration: none; font-weight: 800; font-size: 16px; padding: 16px 32px; border-radius: 8px; display: inline-block;">SOLICITAR ACESSO AO PERFIL VIP</a>
                            <p style="margin-top: 20px; color: #9ca3af; font-size: 13px;">Nossa tecnologia secundária aprovará sua entrada automaticamente após a confirmação do pagamento.</p>
                        </div>

                        <div style="text-align: center; margin-top: 24px; padding: 30px; border: 2px dashed #e5e7eb; border-radius: 12px;">
                            <p style="margin-bottom: 10px; font-weight: 700; font-size: 16px; color: #111827;">Passo 2: Personalize suas Ofertas</p>
                            <p style="margin-bottom: 20px; color: #6b7280; font-size: 14px;">Nos ajude a melhorar nossa entrega. Leva somente 1 minutinho.</p>
                            <a href="https://karcash.com.br/form?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}" style="background-color: #f3f4f6; color: #111827; text-decoration: none; font-weight: 700; font-size: 15px; padding: 12px 24px; border-radius: 8px; border: 1px solid #d1d5db; display: inline-block;">COMPLETAR MEU PERFIL (1 MIN)</a>
                        </div>
                        
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

        return response.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error sending email:', error);
        return response.status(500).json({ error: (error as Error).message || 'Failed to send email' });
    }
}
