import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Inicializa Supabase e Resend
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Webhooks geralmente são POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;
    console.log('[CAKTO WEBHOOK] Payload recebido:', JSON.stringify(payload, null, 2));

    // ==== VALIDAÇÃO DE SEGURANÇA (O "SELO DE CERA" ANTI-FRAUDE) ====
    const expectedSecret = process.env.CAKTO_WEBHOOK_SECRET;
    if (expectedSecret && payload.secret !== expectedSecret) {
      console.error('🚨 [CAKTO WEBHOOK] ALERTA DE SEGURANÇA: Chave secreta inválida ou acesso não autorizado! Bloqueando intruso.');
      return res.status(401).json({ error: 'Unauthorized: Invalid webhook secret' });
    }

    // A API da Cakto envia o tipo de evento no campo event_id (ex: 'subscription_canceled')
    const eventType = payload.event_id || payload.event;

    // Tentativa defensiva de extrair o email do cliente de dentro do payload
    const customerEmail = 
      payload.customer?.email || 
      payload.data?.customer?.email || 
      payload.client?.email || 
      payload.email;

    if (!eventType) {
      return res.status(400).json({ error: 'Nenhum evento detectado no payload.' });
    }

    // ==== LÓGICA DE CANCELAMENTO, FALHA OU REEMBOLSO ====
    if (['subscription_canceled', 'subscription_renewal_refused', 'chargeback', 'refund'].includes(eventType)) {
      
      console.log(`[CAKTO WEBHOOK] ALERTA: Assinatura cancelada/falha para o e-mail: ${customerEmail}`);

      if (customerEmail && supabaseUrl && supabaseServiceKey) {
        // 1. Atualiza e RETORNA os dados do cliente (para pegarmos o @instagram dele)
        const { data: userData, error } = await supabase
          .from('subscriptions') // Tabela que guarda o contato inicial na landing page
          .update({ status: 'cancelado', updated_at: new Date().toISOString() })
          .eq('email', customerEmail)
          .select('instagram, name')
          .single();
        
        if (error) {
          console.error('[CAKTO WEBHOOK] Erro ao atualizar Supabase:', error);
        } else {
          console.log('[CAKTO WEBHOOK] Supabase atualizado com sucesso. Status inativado.');
        }

        const instaHandle = userData?.instagram || '[@NãoEncontrado - Busque pelo Nome]';
        const clientName = userData?.name || 'Cliente';

        // ==== Envio de Alerta para o Admin (Remover do Instagram) ====
        try {
          await resend.emails.send({
            from: 'KarCash <vendas@karcash.com.br>',
            to: 'guskinegocios@gmail.com', // E-mail da equipe interna KarCash
            subject: `🚨 ALERTA VIP: Acesso Cancelado - ${instaHandle}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ff0000; border-radius: 8px;">
                <h2 style="color: #ff0000;">⚠️ REMOÇÃO DE ACESSO VIP EXIGIDA</h2>
                <p>O sistema detectou um cancelamento, falha na recorrência ou estorno na Cakto.</p>
                <hr/>
                <p><strong>Evento Automático:</strong> ${eventType}</p>
                <p><strong>Nome:</strong> ${clientName}</p>
                <p><strong>E-mail:</strong> ${customerEmail}</p>
                <p style="font-size: 18px;"><strong>Instagram do Cliente:</strong> <span style="background: #ffff00; font-weight: bold; padding: 2px 5px;">${instaHandle}</span></p>
                <hr/>
                <h3 style="color: #111827;">Ação Manual Necessária:</h3>
                <p>1. Copie o @ do Instagram acima.</p>
                <p>2. Abra a lista de <strong>Melhores Amigos (Close Friends)</strong> no Instagram do KarCash.</p>
                <p>3. Cole na barra de busca e <strong>remova o acesso dele imediatamente</strong>.</p>
              </div>
            `
          });
          console.log('[CAKTO WEBHOOK] E-mail de alerta enviado para a equipe com o @instagram:', instaHandle);
        } catch (emailError) {
          console.error('[CAKTO WEBHOOK] Erro ao enviar e-mail de alerta:', emailError);
        }
      }
    } 
    // ==== LÓGICA DE PAGAMENTO APROVADO ====
    else if (['subscription_active', 'subscription_created', 'payment_approved', 'purchase_approved'].includes(eventType)) {
      console.log(`[CAKTO WEBHOOK] SUCESSO: Pagamento/Assinatura Aprovada para o e-mail: ${customerEmail}`);
      
      if (customerEmail && supabaseUrl && supabaseServiceKey) {
        const { error } = await supabase
          .from('subscriptions')
          .update({ status: 'active', updated_at: new Date().toISOString() })
          .eq('email', customerEmail);
        
        if (error) {
          console.error('[CAKTO WEBHOOK] Erro ao ativar usuário no Supabase:', error);
        } else {
          console.log('[CAKTO WEBHOOK] Usuário ativado com sucesso no banco de dados!');
        }
      }
    }

    // Retorna 200 pro Cakto parar de reenviar o webhook
    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('[CAKTO WEBHOOK] Erro de Servidor:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
