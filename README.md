# FieldKit — marketplace acessível de camisas de futebol

Projeto de **Interação Humano-Computador** desenvolvido por **Henrique F. V. Plech**, sob orientação da **Prof.ª Tacyana Batista**. O protótipo oferece uma experiência de compra de camisas com foco em acessibilidade, navegação clara e autonomia.

[Protótipo no Figma](https://www.figma.com/design/Oe43KaqWU07EfdmDhc6ijN/IHC---HenriqueFVPlech?node-id=1-2) · [Vídeo de apresentação do projeto e da persona](https://youtu.be/6fTX0vEiDGA)

![Página inicial da FieldKit com VLibras](docs/evidencias/previa.png)

## Como abrir

Abra **`index.html`** no navegador. Não é necessário instalar dependências. O VLibras precisa de internet.

## Telas e funcionalidades

O site possui **10 telas interativas**. A jornada principal é **Início → Catálogo → Detalhes → Sacola → Entrega → Revisão → Confirmação**, complementada por **Favoritos, Acesso/perfil e Ajuda e acessibilidade**.

- Busca sem distinção de acentos, filtros por time e coleção e ordenação de preço.
- Guia de medidas, seleção obrigatória de tamanho e favoritos salvos no navegador.
- Sacola com quantidades, remoção e desfazer, cupom **FIELDKIT15** e cálculo de frete.
- Compra simulada como visitante, validação dos campos e revisão editável antes da confirmação.
- Feedback de carregamento, sucesso, erro e estado vazio, além de hover e foco nos controles.
- Perfil temporário, FAQ e opção de limpar os dados locais.

O menu permanece consistente entre as telas, com acesso à sacola e ao perfil. A navegação permite usar Voltar e Avançar do navegador, atualiza o título da página e direciona o foco ao conteúdo.

## Acessibilidade e VLibras

A implementação é orientada à **WCAG 2.0 nível AA**, com:

- HTML semântico, títulos organizados e link **“Pular para o conteúdo”**.
- Navegação com **Tab e Shift + Tab**, ativação com **Enter ou Espaço** e seleção de tamanho pelas setas.
- Foco visível, labels associados aos campos e mensagens de erro com orientação de correção.
- Regiões de status para anunciar atualizações e estados que não dependem apenas de cor.
- Layout responsivo, zoom permitido e respeito à preferência por movimento reduzido.

O **VLibras carrega automaticamente** e permanece disponível pelo botão global e pelo controle lateral em todas as telas. A integração utiliza o script oficial `https://vlibras.gov.br/app/vlibras-plugin.js`, informa falhas e permite tentar novamente. A tradução em Libras complementa os demais recursos de acessibilidade.

## Mini design system

Tokens e componentes são compartilhados entre as telas, com estilos definidos em `style.css`.

| Elemento           | Padrão                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Cores              | Azul, fundo claro, texto escuro e amarelo de destaque; pares de texto verificados acima de 4,5:1.                   |
| Tipografia         | Inter, Arial, Helvetica ou sans-serif; corpo de 1rem e tamanhos relativos.                                          |
| Espaçamento e grid | Escala de 4 a 64px, em rem, e colunas adaptáveis ao tamanho da tela.                                                |
| Componentes        | Botões com área mínima de 44 × 44px, campos com label visível, cards, favoritos, seletores e mensagens de feedback. |

Exemplos de contraste: **branco sobre azul `#0057B8`: 6,87:1**; **texto `#526175` sobre branco: 6,31:1**. A paleta completa e as regras dos componentes estão no [design system](docs/DESIGN-SYSTEM.md).

## Avaliação Nielsen e melhorias

A avaliação documentada utiliza as **10 heurísticas de Nielsen**, por inspeção técnica assistida por IA. **Não houve testes com usuários reais**; o roteiro Think Aloud para 2 a 3 participantes está preparado para aplicação futura.

| Problema identificado                     | Correção aplicada                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------- |
| Contador fixo e ações sem feedback        | Contagem real da sacola e mensagens de estado.                                  |
| Detalhes e filtros sem interação completa | Tela de produto, guia de medidas e filtros funcionais.                          |
| Falta de controle e prevenção de erros    | Remoção com desfazer, tamanho obrigatório, validação e revisão do pedido.       |
| Ausência de recuperação e ajuda           | Estados vazios com ação, erros específicos, FAQ e instruções de acessibilidade. |

A [avaliação completa e matriz de iteração](docs/AVALIACAO-IHC.md) registram as dez heurísticas, severidades e formas de verificar as correções.

## Verificação e documentação

Foram verificados o fluxo de compra, cálculos, filtros, formulários, favoritos, navegação por teclado, contrastes e abertura/fechamento do VLibras. A conformidade WCAG integral e a experiência com leitores de tela e usuários ainda precisam de avaliação dedicada.

- [Registro das verificações e evidências](docs/VERIFICACAO.md)
- [Roteiro de apresentação](docs/APRESENTACAO.md)

**Tecnologias:** HTML5, CSS3, JavaScript e SVG, com arquivos indentados em dois espaços.

**Escopo:** protótipo acadêmico, sem autenticação, cobrança ou entrega reais. Produtos e preços são ilustrativos. Sacola, favoritos e cupom ficam neste navegador; endereço e perfil permanecem apenas na memória da aba.
