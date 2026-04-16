# 🚀 KarCash - Acesso VIP

Bem-vindo ao repositório da Landing Page de Acesso VIP do KarCash. Este projeto é a porta de entrada para a comunidade exclusiva de revendedores e investidores de automóveis que buscam as melhores oportunidades do mercado.

O objetivo principal é converter visitantes em assinantes da comunidade VIP, oferecendo acesso privilegiado a carros com margens reais de 20% a 50% abaixo da tabela FIPE, além de múltiplas formas de geração de renda.

---

## 📋 Status do Projeto — Abril/2026

> **Contrato:** 99Freelas · Valor: R$1.400 · Cliente: Gustavo S. (KarCash)

| Item do Escopo | Status |
|---|---|
| Landing Page de Alta Conversão (React, mobile-first) | ✅ Entregue |
| Checkout de Recorrência (gateway Cakto) | ✅ Entregue |
| Validação automática de pagamento via Webhook | ✅ Entregue |
| Liberação de acesso ao pagar (/congratulations) | ✅ Entregue |
| Gestão de inadimplência (refund/chargeback) | ✅ Entregue |
| Domínio + deploy preview (`preview.karcash.com.br`) | ✅ Entregue |
| Integração Supabase (profiles + subscriptions) | ✅ Entregue |
| E-mails transacionais (Resend) | ✅ Entregue |
| Google Tag Manager + Meta Pixel (CAPI) | ✅ Entregue |

### ⏳ Pendências — Aguardando decisão do cliente

| Item | Observação |
|---|---|
| 🎥 Vídeo da Landing Page | Conteúdo a ser fornecido pelo cliente |
| 📲 Canal de entrega: Instagram ou WhatsApp? | Impacta o link na página /congratulations |
| 🚀 Deploy em produção (`karcash.com.br`) | Aguarda aprovação da versão preview |

### ⛔ Fora do Escopo
- Gestão de tráfego pago (acordado desde o início das negociações)

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com uma stack moderna e performática, preparada para escala:

### Frontend
-   **[Vite](https://vitejs.dev/)**: Build tool ultrarrápida.
-   **[React](https://react.dev/)**: Biblioteca de UI.
-   **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática.
-   **[Tailwind CSS](https://tailwindcss.com/)**: Estilização utility-first.
-   **[Framer Motion](https://www.framer.com/motion/)**: Animações fluidas.
-   **[React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)**: Formulários e validação robusta.

### Backend & Infraestrutura
-   **[Supabase](https://supabase.com/)**: Gerenciamento de banco de dados (`profiles`, `subscriptions`, `seller_leads`) e lógica de negócio via **Stored Procedures (RPC)** para garantir atomicidade.
-   **[Resend](https://resend.com/)**: Serviço de e-mail transacional para envio de boas-vindas e **notificações em tempo real para a equipe de vendas**.
-   **[Vercel Serverless](https://vercel.com/docs/functions)**: Funções em Node.js para processamento de e-mails e webhooks.
-   **[Google Tag Manager (GTM)](https://tagmanager.google.com/)**: Hub centralizado para gestão de tags de marketing (Meta Pixel, Google Ads, etc).

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura limpa e desacoplada para garantir escalabilidade:

```
/
├── api/                  # Serverless Functions (E-mail, Webhooks)
├── scripts/              # Utilitários de teste e manutenção (Database, Resend)
├── src/
│   ├── assets/           # Ativos visuais e dados de modelos reais
│   ├── components/       # Componentes de UI (Header, Pricing, SellerLead)
│   ├── pages/            # Rotas da aplicação (Home, Checkout, Vender, Sucesso)
│   ├── repositories/     # Camada de abstração de dados (Supabase/Rest)
│   ├── services/         # Serviços de API e integrações externas
│   └── lib/              # Configurações de clientes (Supabase, etc)
```

## 🌟 Diferenciais e Funcionalidades

-   **Fluxo de Conversão AIDA:** Landing Page estruturada psicologicamente para guiar o usuário da Atenção à Ação.
-   **Tracking Profissional:** Integração via Google Tag Manager para escalabilidade de tráfego pago (Meta/Google).
-   **Sistema de E-mail Premium:** Notificações automáticas e personalizadas com design de alta conversão para novos leads e vendas.
-   **Automação de Leads:** Disparo imediato de e-mails para a equipe de vendas com Nome, E-mail e WhatsApp do lead.
-   **Segurança & Integridade:** Uso de RPC no Supabase para garantir que usuários só sejam criados com assinaturas vinculadas.

## ⚙️ Como Executar o Projeto Localmente

**Pré-requisitos:** Node.js (v18+) e NPM/Yarn.

1.  **Clone e Instale:**
    ```bash
    git clone https://github.com/guskinegocios/karcash-vip-lp.git
    cd karcash-vip-lp
    npm install
    ```

2.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz seguindo o modelo (ver `.env.example`). Certifique-se de configurar a `RESEND_API_KEY` e as chaves do Supabase.

3.  **Rodar Frontend (Vite):**
    ```bash
    npm run dev
    ```
    *Acesse em `http://localhost:8080` (porta padrão configurada).*

## 🧠 Estratégia de Copywriting (Gatilhos Mentais)

A Landing Page foi otimizada com gatilhos mentais para alta conversão:

-   **Profit Paths:** Segue a técnica de *Segmentação de Público*, atraindo diversos perfis de investidores.
-   **Hero Section:** Ativa *Curiosidade*, *Promessa* e *Exclusividade*.
-   **Seção "O Segredo":** Usa *Dissonância Cognitiva* (Leilão é ruim) e *Razão e Porquê*.
-   **Cards de Ofertas:** Utiliza *Ancoragem de Preço* e *Especifidade* (Lucro Exato).

---
*Atualizado em 16/04/2026 por Antigravity (IA Coding Expert & Partner).*
