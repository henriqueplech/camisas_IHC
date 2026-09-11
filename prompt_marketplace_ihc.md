# Prompt de Desenvolvimento: Marketplace de Camisas de Time Exclusivas (Acessibilidade WCAG 2 AA)

**Contexto do Projeto:**
- **Disciplina:** Interação Humano-Computador (IHC)
- **Professora:** Tacyana Batista
- **Aluno:** Henrique F. V. Plech
- **Tema:** Aplicação web para um marketplace de vendas de camisas de time exclusivas.
- **Tecnologias Restritas:** Apenas HTML5 e CSS3 (sem frameworks ou JavaScript complexo, foco em marcação e estilo).

**Recursos de Referência:**
- **Vídeo Explicativo:** https://youtu.be/6fTX0vEiDGA
- **Protótipo (Figma):** https://www.figma.com/design/Oe43KaqWU07EfdmDhc6ijN/IHC---HenriqueFVPlech?node-id=1-2&t=oWiCeha778o13UAG-1
- **Pesquisa de Usuários:** https://forms.gle/D4JWct6A27p7pxWt5

---

## 🎯 Objetivo da Tarefa
Desenvolver a interface web deste marketplace seguindo rigorosamente as diretrizes de acessibilidade **WCAG 2 AA**, baseando-se no guia prático de acessibilidade fornecido ("WhatsApp Image 2026-09-11 at 12.04.59.jpg"). O foco principal é criar uma interface inclusiva, semântica, responsiva e operável por qualquer usuário.

---

## 🛠️ Diretrizes de Estrutura e Semântica (HTML)

1. **Uso de Marcos Semânticos:**
   - Abandone o uso excessivo de `<div>`.
   - Estruture a página utilizando tags semânticas apropriadas: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` e `<footer>`. Isso facilita a criação de índices de navegação automáticos para leitores de tela.

2. **Hierarquia de Cabeçalhos Ininterrupta:**
   - Mantenha **um único `<h1>`** por página (o título principal do marketplace ou da página atual).
   - Siga a sequência lógica estrita (`<h2>`, depois `<h3>`, etc.) sem pular níveis (ex: não vá de um `<h2>` direto para um `<h4>`).

3. **Vínculos Claros em Imagens e Formulários:**
   - **Imagens:** Todas as tags `<img>` devem possuir o atributo `alt` com descrições intuitivas, curtas e precisas sobre o conteúdo visual e sua função (ex: `alt="Camisa titular do Flamengo 2024 rubro-negra"`).
   - **Formulários:** Cada campo de entrada (`<input>`, `<textarea>`, `<select>`) deve ter uma `<label>` explicitamente vinculada através do atributo `for` correspondendo ao `id` do input.

---

## 🎨 Diretrizes de Estilo e Interação (CSS)

1. **Unidades Relativas e Design Adaptável:**
   - **PROIBIDO o uso de pixels (`px`) para tipografia e espaçamentos principais.**
   - Utilize unidades relativas, especificamente **`rem`** para `font-size`, `margin`, `padding`, etc. Isso garante que a interface escale corretamente se o usuário alterar o tamanho da fonte padrão no navegador.

2. **Contraste Mínimo de Cor (Perceptível):**
   - Garanta uma proporção de contraste mínima para garantir a legibilidade:
     - **4.5:1** para textos normais (parágrafos e textos de leitura).
     - **3:1** para textos grandes (títulos com 24px/1.5rem ou mais) e componentes de UI (bordas de botões e ícones ativos).
   - Selecione uma paleta de cores adequada para o tema de esportes/futebol que cumpra esses requisitos de contraste.

3. **Foco Visível e Navegação por Teclado (Operável):**
   - A interface deve ser 100% navegável usando a tecla `Tab`.
   - **NUNCA** utilize `outline: none;` sem prover um estilo de foco alternativo.
   - Reforce o indicador visual de foco utilizando a pseudo-classe `:focus-visible` (ex: `button:focus-visible { outline: 2px solid #005fcc; outline-offset: 2px; }`).

4. **Redução de Movimento (Compreensível / Adaptável):**
   - Respeite as preferências do sistema do usuário quanto a animações.
   - Inclua a media query de acessibilidade para desativar animações e transições caso o usuário prefira movimento reduzido:
     ```css
     @media (prefers-reduced-motion: reduce) {
       * {
         animation: none !important;
         transition: none !important;
       }
     }
     ```

5. **Responsividade:**
   - Utilize Media Queries (`@media`) para adaptar o layout para diversos tamanhos de tela (mobile, tablet, desktop).
   - Implemente um design fluído (usando Flexbox ou CSS Grid) para garantir que os cards das camisas e os elementos de navegação se rearranjem perfeitamente em dispositivos móveis.

---

## 📝 Instruções de Execução para o Agente (Agy/Terminal)
1. Analise o design no Figma para entender os componentes visuais necessários (cards de camisa, carrinho, menu, etc).
2. Crie um arquivo `index.html` aplicando todas as regras semânticas descritas acima.
3. Crie um arquivo `style.css` aplicando as regras de `rem`, contraste, foco visível e responsividade.
4. Entregue o código completo, limpo e bem documentado por comentários, explicando onde e como os parâmetros WCAG foram atendidos.
