import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import * as path from 'path';

console.log('1. Carregando dotenv');
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
console.log('2. Inicializando Resend');
const resend = new Resend(process.env.RESEND_API_KEY);

async function run() {
    console.log('3. Chamando resend.emails.send');
    try {
        const promise = resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['guskinegocios@gmail.com'],
            subject: 'Teste Simples',
            html: '<p>Teste</p>'
        });

        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout de 10 segundos')), 10000));

        const result = await Promise.race([promise, timeout]);
        console.log('4. Sucesso:', result);
    } catch (e: any) {
        console.log('4. Erro:', e.message);
    }
}
run();
