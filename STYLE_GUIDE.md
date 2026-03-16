# 🎨 Guia de Estilos do KarCash (Design System)

Este documento mapeia o guia de estilos (cores, fontes e componentes principais) configurados no seu projeto via `tailwind.config.ts`, `globals/index.css` e utilizáveis nos componentes React da aplicação KarCash Vip. O estilo visual é "Bold, Aggressive, Conversion-Focused" (Focado em Conversão e Premium).

---

## 🅰️ Tipografia (Fontes)

O projeto faz uso de duas fontes principais do Google Fonts, definidas através de variáveis CSS e estendidas no Tailwind.

- **Fonte de Títulos (Display):** `Space Grotesk`
  - **Pesos suportados:** 500, 600, 700.
  - **Classe Tailwind:** `font-display`
  - **Uso Automático:** Já está definida globalmente para as tags `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`.

- **Fonte de Corpo (Body/Text):** `Inter`
  - **Pesos suportados:** 400, 500, 600, 700, 800, 900.
  - **Classe Tailwind:** `font-body` (mas aplicada automaticamente no `body`).
  - **Uso Automático:** Fonte padrão para todo e qualquer texto não-título no projeto.

---

## 🎨 Paleta de Cores (Themes e Classes)

As cores principais são configuradas no modo raiz (Dark Theme) na camada `base` do CSS via variáveis HSL e podem ser aplicadas com as classes comuns do Tailwind (ex: `bg-primary`, `text-secondary`, `border-muted`, etc).

### Cores de Marca (Brand)
- 🟢 **Verde Limão Brilhante (Primary):** HSL `71 100% 62%` (Aprox. `#7CFC00`)
  - **Classes:** `bg-primary`, `text-primary`, `border-primary`
  - **Uso:** Destaques chamativos, selos numéricos, preços de conversão (`.price-new`), badges (`.profit-badge`).
  
- 🥶 **Azul Petróleo / Verde Escuro (Secondary):** HSL `175 50% 30%` (Aprox. `#26736A`)
  - **Classes:** `bg-secondary`, `text-secondary`
  - **Uso:** Destaques secundários em títulos ou em fundos de seção para quebrar um pouco o fundo escuro (`.section-dark`, `.section-navy`).

- 🟠 **Laranja Vibrante (CTA Button):** Hex `#FF5E00` (Variável `--btn-secondary-cta`)
  - **Classes:** Aplicado via classes de componente (`.btn-primary-cta`, `.btn-secondary-cta`).
  - **Uso:** Principal motor de conversão; usado para botões de "COMPRAR", "ASSINAR", "QUERO ACESSO".

### Fundo e Superfície (Background / Foreground)
- 🌑 **Quase Preto (Background):** HSL `176 80% 9%`
  - **Classes:** `bg-background`
  - **Uso:** Fundo principal de todo o site.

- ⚪ **Branco (Foreground):** HSL `0 0% 98%`
  - **Classes:** `text-foreground`
  - **Uso:** Cor principal dos textos corridos.

- ⬛ **Cinza Escuríssimo (Card/Popover):** HSL `0 0% 5%`
  - **Classes:** `bg-card`, `bg-popover`
  - **Uso:** Fundo liso para menus, balões e cards simples.

- 🌫️ **Cinza / Muted:** Fundo HSL `0 0% 15%` / Texto HSL `0 0% 60%`
  - **Classes:** `bg-muted` ou texto secundário `text-muted-foreground`.
  - **Uso:** Textos de menor importância, preços riscados (`.price-old`), bordas irrelevantes.

---

## 🧩 Componentes Customizados (UI Utilities)

O arquivo `index.css` disponibiliza classes prontas focadas em aceleração do desenvolvimento e alto nível estético sem precisar sujar o HTML com milhares de classes utilitárias em casos muito complexos.

### Botões de Conversão (CTAs)
- `.btn-primary-cta`: Botão laranja vibrante (`#FF5E00`) animado. Apresenta um efeito de **Glow Pulsante** (`pulseGlow`) contínuo e um efeito de zoom-in com shadow ao passar o mouse. Usado para a chamada de ação principal do Hero ou Fixed Bar.
- `.btn-secondary-cta`: Variante do botão anterior, com comportamento estático (sem a pulsação contínua), mas que recebe escala e brilho dinâmico ao sofrer hover.

### Componentes de Cartões (Cards)
Estes utilizam variáveis de sombras (`--shadow-card`, `--shadow-elevated`) e gradientes sombrios (`--gradient-card`).
- `.card-elevated`: Cria um shape de bordas arredondadas fortes (`rounded-2xl`) com aplicação de um linear gradient escuro com elevação em box-shadow.
- `.card-car`: Destinado aos produtos (carros). Conta com efeitos interativos (hover); ao passar o mouse, ele levanta (move `Y`), amplia levemente e ilumina a borda com a cor Primária (Verde Limão transparenciado).
- `.phone-mockup`: Container criador da silhueta de um smartphone, muito presente em `HeroSection` e apresentações do produto mobile, contém bordas grossas e inset shadows internas emulando uma caixa de device.

### Utilities Comerciais / Varejo
Classes pensadas puramente para informações financeiras de margem e lucro:
- `.price-old`: Texto mudo riscado (antigo preço não-Premium).
- `.price-new`: Texto vibrante Verde Limão em tamanho grande, forte (Bold) e um leve drop-shadow brilhante simulando neon.
- `.profit-badge`: Selo (Badge) arredondado verde usado para indicar % de lucro em carros (ex: "50% de lucro"). Fundo preenchido por cor primária translúcida (`0.15`) e borda da mesma cor.

### Animações (Keyframes & Tailwind Animations)
Animatividades presentes no Tailwind Config (`tailwind.config.ts` | Theme Extensions):
- `animate-pulse-glow` ou `.pulse-glow`: Sombras alaranjadas brilhando infinitamente aos arredores de CTAs.
- `animate-float` ou `.float-animation`: Simula levitação suave no eixo Y; usado para o celular ou imagens de carros ("flutuando no espaço").
- `animate-count-up`: Aparecimento subindo suave para números contadores.
- `animate-slide-in-left` / `animate-slide-in-right`: Entrada dramática lateral para blocos importantes de conteúdo.
- `animate-fade-in-up` / `animate-scale-in`: Entradas base de revelação em scroll (ScrolReveal).
