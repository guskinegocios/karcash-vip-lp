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
        const { email, name, phone, instagram, type, carDetails } = request.body;

        // Validação básica
        if (!email || !name) {
            return response.status(400).json({ error: 'Email and name are required' });
        }

        // Remetente verificado no Resend
        const fromEmail = 'KarCash <vendas@karcash.com.br>';

        // Destinatários: O e-mail formatado vai apenas para o cliente
        const recipients = [email];

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
            replyTo: 'vendas@karcash.com.br',
            to: recipients,
            subject: subject,
            html: `
                <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
                    <!-- Header with Logo Premium FIXED -->
                    <div style="background-color: #050505; padding: 40px 20px; text-align: center; border-bottom: 4px solid #00ff00;">
                        <img src="https://www.karcash.com.br/logo_karcash_email.webp" alt="KarCash VIP" style="max-width: 220px; height: auto; display: inline-block;" />
                    </div>
                    
                    <div style="padding: 48px 40px; line-height: 1.6; color: #1f2937;">
                        <h1 style="color: #111827; margin-top: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.03em; text-align: center;">${title}</h1>
                        
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
                        
                        <div style="text-align: center; margin-top: 40px; padding: 32px; background-color: #030712; border-radius: 12px; color: #ffffff; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
                            <p style="margin-bottom: 15px; font-weight: 800; font-size: 22px; color: #00ff00; letter-spacing: -0.02em;">Acesso ao Instagram VIP</p>
                            
                            <p style="margin-bottom: 20px; color: #e5e7eb; font-size: 16px; text-align: left; line-height: 1.6;">
                                Olá, seja bem-vindo(a)! Você está quase lá, mas ainda precisa de uma etapa importante:
                            </p>
                            
                            <p style="margin-bottom: 30px; color: #d1d5db; font-size: 15px; text-align: left; line-height: 1.6;">
                                Por favor, acesse o nosso Instagram VIP clicando no botão abaixo e clique em <strong>"Seguir"</strong> para solicitar a sua entrada. Nossa equipe irá conferir o status do seu pagamento e liberar o seu acesso VIP em <strong>até 2 horas</strong>.
                            </p>
                            
                            <a href="https://www.instagram.com/karcashvip/" target="_blank" style="background-color: #00ff00; color: #030712; text-decoration: none; font-weight: 800; font-size: 16px; padding: 16px 32px; border-radius: 8px; display: inline-block; width: 80%; max-width: 300px; transition: transform 0.2s;">ACESSAR PERFIL VIP</a>
                        </div>

                        <div style="text-align: center; margin-top: 24px; padding: 32px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #f9fafb;">
                            <p style="margin-bottom: 25px; color: #4b5563; font-size: 15px; line-height: 1.6;">
                                Ah! E por favor, preencha o nosso formulário de perfil. Suas respostas são o que ajudam a KarCash a continuar evoluindo e trazendo melhores oportunidades para você! ❤️
                            </p>
                            
                            <a href="https://www.karcash.com.br/form" target="_blank" style="background-color: #ffffff; color: #111827; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 8px; border: 1px solid #d1d5db; display: inline-block; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: background-color 0.2s;">RESPONDER O FORMULÁRIO RÁPIDO</a>
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

        // ====== ALERTA INTERNO PARA A EQUIPE (ADMIN) ======
        if (type === 'oferta_venda') {
            await resend.emails.send({
                from: fromEmail,
                to: 'guskinegocios@gmail.com',
                subject: '🚗 Nova Oferta de Venda Recebida!',
                html: `
                    <h2>Alguém quer vender um veículo na KarCash.</h2>
                    <br/>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>WhatsApp:</strong> ${phone || 'Não informado'}</p>
                    <hr/>
                    <p><strong>Carro:</strong> ${carDetails?.model || 'N/A'} - Ano ${carDetails?.year || 'N/A'}</p>
                    <p><strong>Estado:</strong> ${carDetails?.description || 'N/A'}</p>
                `
            });
        } else {
            await resend.emails.send({
                from: fromEmail,
                to: 'guskinegocios@gmail.com', // Equipe KarCash
                subject: '💰 Nova Compra/Inscrição KarCash VIP!',
                html: `
                    <h2>Alguém acabou de fazer uma compra no Karcash Vip.</h2>
                    <br/>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>WhatsApp:</strong> ${phone || 'Não informado'}</p>
                    <p><strong>@Instagram:</strong> ${instagram || 'Aguardando preenchimento'}</p>
                `
            });
        }

        return response.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error sending email:', error);
        return response.status(500).json({ error: (error as Error).message || 'Failed to send email' });
    }
}
