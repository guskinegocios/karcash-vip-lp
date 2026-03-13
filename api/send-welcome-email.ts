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

        let subject = 'Notificação de Nova Inscrição - KarCash VIP 🚗';
        let title = 'Olá, aqui é a equipe KarCash Vendas.';
        let message = 'Recebemos uma nova inscrição no sistema!';
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
                        
                        <div style="text-align: center; margin-top: 40px;">
                            <p style="margin-bottom: 8px; font-weight: 600; color: #111827;">Agradecemos a confiança!</p>
                            <p style="margin-top: 0; color: #6b7280; font-size: 14px;">Em breve um especialista entrará em contato.</p>
                        </div>
                        
                        <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #f3f4f6; text-align: center;">
                            <p style="margin: 0; color: #111827; font-weight: 700; font-size: 16px;">Equipe KarCash Vendas</p>
                            <div style="margin-top: 12px;">
                                <a href="https://www.instagram.com/karcashmotors/" style="color: #00ff00; text-decoration: none; font-weight: 600; font-size: 14px;">Visite nosso Instagram</a>
                            </div>
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
