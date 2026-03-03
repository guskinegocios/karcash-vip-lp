import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carrega as variáveis de ambiente
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
    console.log('--- Iniciando Teste de Envio de E-mail (Resend) ---');
    console.log('API KEY:', process.env.RESEND_API_KEY ? 'Configurada (OK)' : 'Não encontrada (ERRO)');

    const teamEmail = 'guskinegocios@gmail.com';
    const testData = {
        name: 'Gemi - Desenvolvedora (Teste)',
        email: 'contato@moduloweb.com.br',
        phone: '(11) 99999-9999'
    };

    try {
        console.log(`Enviando e-mail para ${teamEmail}...`);

        const data = await resend.emails.send({
            from: 'KarCash <onboarding@resend.dev>',
            to: [teamEmail], // Enviando para o e-mail verificado do sandbox
            subject: 'Teste Direto do Sistema - KarCash VIP 🚗',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                    <div style="background: #000; padding: 20px; text-align: center; border-bottom: 3px solid #00ff00;">
                        <h1 style="color: #00ff00; margin: 0;">KarCash VIP</h1>
                    </div>
                    <div style="padding: 30px;">
                        <h2>Teste de Integração Resend</h2>
                        <p>Este é um disparo manual feito via script para validar sua API Key.</p>
                        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
                            <p><strong>Lead de Teste:</strong> ${testData.name}</p>
                            <p><strong>WhatsApp:</strong> ${testData.phone}</p>
                        </div>
                        <p style="color: #666; margin-top: 20px;">Se você recebeu este e-mail, a integração com o Resend no GitHub/Vercel está funcionando 100%.</p>
                    </div>
                </div>
            `,
        });

        console.log('✅ Sucesso! Resposta do Resend:', data);
    } catch (error) {
        console.error('❌ Erro ao enviar e-mail:', error);
    }
}

testEmail();
