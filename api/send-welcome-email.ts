import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Inicializa o cliente Resend
// Nota: A variável de ambiente RESEND_API_KEY deve estar configurada no Vercel (e no .env local)
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
        const { email, name, phone } = request.body;

        // Validação básica
        if (!email || !name) {
            return response.status(400).json({ error: 'Email and name are required' });
        }

        // Destinatários: O cliente E a equipe de vendas (conforme solicitado por Claudio)
        const recipients = [email, 'guskinegocios@gmail.com'];

        // Envio do e-mail
        const data = await resend.emails.send({
            from: 'KarCash <onboarding@resend.dev>',
            to: recipients,
            subject: 'Notificação de Nova Inscrição - KarCash VIP 🚗',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
                    <!-- Header with Logo/Bar -->
                    <div style="background-color: #000000; padding: 20px; text-align: center; border-bottom: 4px solid #00ff00;">
                        <img src="https://karcash-vip-lp.vercel.app/logo_karcash.webp" alt="KarCash" style="max-width: 180px; height: auto;" />
                    </div>
                    
                    <div style="padding: 40px 30px; line-height: 1.6; color: #333333;">
                        <h2 style="color: #000000; margin-top: 0;">Olá, aqui é a equipe KarCash Vendas.</h2>
                        
                        <p>Recebemos uma nova inscrição no sistema!</p>

                        <div style="background-color: #f9f9f9; border-left: 4px solid #00ff00; padding: 15px; margin: 25px 0;">
                            <p style="margin: 0; font-weight: 500;"><strong>Nome:</strong> ${name}</p>
                            <p style="margin: 0; font-weight: 500;"><strong>E-mail:</strong> ${email}</p>
                            <p style="margin: 5px 0 0 0; font-weight: 500;"><strong>WhatsApp:</strong> ${phone || 'Não informado'}</p>
                        </div>
                        
                        <p>Agradecemos a confiança!</p>
                        
                        <p style="margin-top: 30px;">
                            Atenciosamente,<br/>
                            <strong>Equipe KarCash Vendas</strong>
                        </p>
                    </div>
                    
                    <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #666666;">
                        © ${new Date().getFullYear()} KarCash - Todos os direitos reservados.
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
