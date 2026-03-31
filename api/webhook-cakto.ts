import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Inicializa Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Webhooks geralmente são POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;
    console.log('[CAKTO WEBHOOK] Payload recebido:', JSON.stringify(payload, null, 2));

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
        // Atualiza o perfil no banco para 'inativo' ou remove credenciais
        const { error } = await supabase
          .from('profiles') // ou 'subscriptions', dependendo do nome exato da sua tabela
          .update({ vip_status: 'inactive', updated_at: new Date().toISOString() })
          .eq('email', customerEmail);
        
        if (error) {
          console.error('[CAKTO WEBHOOK] Erro ao atualizar Supabase:', error);
        } else {
          console.log('[CAKTO WEBHOOK] Supabase atualizado com sucesso. Status inativado.');
        }

        // TODO: Aqui você poderia integrar com a API do Resend para mandar um e-mail para o Admin
      }
    }

    // Retorna 200 pro Cakto parar de reenviar o webhook
    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('[CAKTO WEBHOOK] Erro de Servidor:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
