import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Função utilitária para gerar um SHA256 (usado no Facebook CAPI para hashear dados como email/telefone)
async function hashData(data: string) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Tratativa para requisões de pre-flight (CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const PIXEL_ID = process.env.VITE_META_PIXEL_ID;
    const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

    if (!PIXEL_ID || !ACCESS_TOKEN) {
      console.error('Missing VITE_META_PIXEL_ID or META_ACCESS_TOKEN environment variables.');
      return res.status(500).json({ error: 'Server configuration error.' });
    }

    const {
      eventName,
      eventUrl,
      fbp,
      fbc,
      email,
      phone,
      customData = {}
    } = req.body;

    // Coleta dados automáticos do cabeçalho da requisição (IP e UserAgent)
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    // Preparando os dados do usuário (UserData)
    // Documentação: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters
    const userData: any = {
      client_ip_address: clientIp,
      client_user_agent: userAgent,
      fbp: fbp,
      fbc: fbc
    };

    // Hasheando dados sensíveis antes de enviar para a Meta
    // Se o cliente enviar email ou telefone, nós convertemos em hash sha256
    if (email) userData.em = [await hashData(email)];
    if (phone) {
      // Remover tudo que não for número do telefone
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length >= 10 && cleanPhone.length <= 15) {
          // O FB espera código do país, ex: 5511999999999
          const fullPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
          userData.ph = [await hashData(fullPhone)];
      }
    }

    const payload = {
      data: [
        {
          event_name: eventName || 'PageView',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: eventUrl,
          user_data: userData,
          custom_data: customData,
        }
      ]
    };

    const graphApiUrl = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    // Execução assíncrona paralela (Promisses não interferem umas nas outras)
    // 1. Enviar para a Meta
    const metaPromise = fetch(graphApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }).then(res => res.json());

    // 2. Salvar no Supabase (Nosso Banco Próprio via Service Role)
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    let supabasePromise: Promise<any> = Promise.resolve();
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      const evtData = {
        event_id: payload.data[0].event_name + '_' + Math.floor(Math.random() * 10000000), // Fallback se eventID original não vier
        event_name: eventName || 'PageView',
        email: email || null,
        phone: phone ? phone.replace(/\D/g, '') : null,
        ip_address: clientIp || null,
        user_agent: userAgent,
        fbp: fbp || null,
        fbc: fbc || null,
        utm_source: customData.utm_source || null,
        utm_medium: customData.utm_medium || null,
        utm_campaign: customData.utm_campaign || null,
        utm_content: customData.utm_content || null,
        utm_term: customData.utm_term || null,
        page_url: eventUrl || null
      };
      
      // Override the event_id if provided from frontend logic
      if (req.body.eventId) {
          evtData.event_id = req.body.eventId;
      }

      supabasePromise = supabase.from('tracking_events').insert([evtData]).then(res => {
         if(res.error) console.error("Erro interno ao logar no DB:", res.error);
         return res;
      }) as Promise<any>;
    }

    // Esperar ambos concluírem (Meta CAPI e DB Local) sem crashar a Vercel caso um falhe
    const [metaResult] = await Promise.allSettled([metaPromise, supabasePromise]);

    if (metaResult.status === 'rejected') {
      console.error('Meta API Error:', metaResult.reason);
      return res.status(500).json({ success: false, error: 'Meta API call failed' });
    }

    if (metaResult.status === 'fulfilled' && metaResult.value.error) {
       console.error('Meta API Rejection:', metaResult.value.error);
       return res.status(400).json({ success: false, error: metaResult.value.error });
    }

    return res.status(200).json({ success: true, message: 'Event successfully sent and logged.' });

  } catch (error) {
    console.error('Serverless function execution error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
