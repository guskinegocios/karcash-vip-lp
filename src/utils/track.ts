// A utility to get cookies safely
const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

// Gera um ID único e aleatório compatível (UUID v4 like)
const generateEventId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback para navegadores antigos
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

interface TrackMetaEventProps {
  eventName: string;
  userData?: {
    email?: string;
    phone?: string;
  };
  customData?: any;
}

/**
 * Utilitário centralizado para deduplicação: Manda para o Pixel (Navegador) e para o Serverless (API) o mesmo evento.
 */
export const trackMetaEvent = async ({ eventName, userData = {}, customData = {} }: TrackMetaEventProps) => {
  // 1. Gera a "etiqueta única" para o evento (Deduplicação)
  const eventId = generateEventId();
  const fbp = getCookie('_fbp') || undefined;
  const fbc = getCookie('_fbc') || undefined;

  // Tenta puxar UTMs salvas no site
  let localUtms = {};
  try {
    const utmsRaw = localStorage.getItem('karcash_utms');
    if (utmsRaw) localUtms = JSON.parse(utmsRaw);
  } catch (e) {
    // ignore
  }

  // Mescla UTMs aos dados customizados
  const finalCustomData = { ...localUtms, ...customData };
  const eventUrl = window.location.href;

  console.log(`[Tracking] Disparando ${eventName} (ID: ${eventId})`);

  // 2. Dispara pelo Frontend (Pixel do Navegador - Temporariamente Desativado)
  /* 
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, finalCustomData, { eventID: eventId });
  }
  */

  // 3. Dispara pelo Backend (NOSSA API Serverless)
  try {
    const payload = {
      eventName,
      eventUrl,
      eventId, // IMPORTANTE: O mesmo ID!
      fbp,
      fbc,
      email: userData.email,
      phone: userData.phone,
      customData: finalCustomData
    };

    fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(err => {
      if (err.status === 'fulfilled' && (err.value as any).error) {
       console.error('Meta API Rejection:', (err.value as any).error);
       return { success: false, error: (err.value as any).error };
      }
      console.error('[Tracking API] Erro invisível:', err);
    });
  } catch (error) {
    console.error('Erro ao chamar API de rastreamento:', error);
  }
};
