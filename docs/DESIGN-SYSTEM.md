# FieldKit — mini design system acessível

Versão acadêmica de 22/10/2026. Tokens em `style.css`; componentes reutilizados em `app.js`. Referência: [WCAG 2.0, guia W3C](https://www.w3.org/WAI/WCAG20/quickref/). As verificações descritas não equivalem a certificação de conformidade integral.

## Cores e contraste

Contrastes calculados com luminância relativa sRGB e `(LmaisClara + 0,05) / (LmaisEscura + 0,05)`, sem arredondar antes de comparar com 4,5. Reproduza com `node scripts/check.mjs`.

| Token / uso                  | Texto   | Fundo   | Razão   |
| ---------------------------- | ------- | ------- | ------- |
| `--ink` / principal          | #0B192C | #FFFFFF | 17,65:1 |
| `--muted` / secundário       | #526175 | #FFFFFF | 6,31:1  |
| Secundário em superfície     | #526175 | #F3F5F8 | 5,78:1  |
| `--blue` / botão primário    | #FFFFFF | #0057B8 | 6,87:1  |
| `--blue-hover` / hover       | #FFFFFF | #003F88 | 10,16:1 |
| Link em superfície           | #0057B8 | #F3F5F8 | 6,29:1  |
| `--gold` / destaque          | #0B192C | #FFD166 | 12,24:1 |
| `--error` / erro             | #A32222 | #FFFFFF | 7,48:1  |
| `--success` / sucesso        | #14633D | #FFFFFF | 7,29:1  |
| Texto branco em fundo escuro | #FFFFFF | #0B192C | 17,65:1 |
| Botão durante carregamento   | #FFFFFF | #526175 | 6,31:1  |

`--soft-line: #D8DFE8` é separador decorativo; bordas dos campos usam `--line: #728095`. Não usar amarelo como texto sobre branco. Cores das ilustrações são decorativas.

## Tipografia, grid e espaçamento

- Família sem serifa: Inter, Arial, Helvetica, sans-serif. A primeira disponível é utilizada, sem download.
- Tokens de texto: pequeno 0,875rem, base 1rem, grande 1,25rem e intermediário 1,75rem. H1 responsivo de 2 a 3rem; destaque da home até 4,6rem.
- Entrelinha do corpo: 1,6; títulos: 1,18. Unidades relativas e conteúdo textual sem altura fixa.
- Escala de espaços: 4, 8, 12, 16, 24, 32, 48 e 64px, em rem; incrementos intermediários de 4px para alinhamento.
- Container até 76rem; catálogo com quatro colunas, duas abaixo de 1050px; checkout e formulários passam a uma coluna abaixo de 650px. Margens móveis de 1rem.
- Raio padrão de 0,75rem em painéis; botões e campos de 0,4rem.

## Biblioteca de componentes

| Componente                    | Uso e estados                                                       | Acessibilidade                                                                                   |
| ----------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `.btn`, `.secondary`, `.gold` | Primário, secundário e destaque; default, hover, foco, carregamento | Mínimo 44px de largura e 48px de altura; nome textual                                            |
| `.text-btn`                   | Remover, desfazer e limpar                                          | Mínimo 44 × 44px; texto sublinhado                                                               |
| `.favorite`                   | Coração padrão ou preenchido                                        | 44 × 44px; `aria-pressed` e nome atualizado                                                      |
| Campo                         | Preenchimento, foco e erro                                          | Label visível; `required`, `autocomplete`, `aria-invalid`, instrução/erro por `aria-describedby` |
| Tamanho                       | P, M, G, GG                                                         | Radio nativo; label de 52 × 48px; setas; fieldset/legend                                         |
| Quantidade                    | Diminuir e aumentar                                                 | 44 × 44px; nome com produto e tamanho                                                            |
| Card                          | Imagem, time, coleção, preço e favorito                             | Link nomeado; imagem decorativa no link; favorito separado                                       |
| Resumo                        | Subtotal, desconto, frete e total                                   | Ordem estável e moeda em pt-BR                                                                   |
| `.notice` / vazio             | Feedback e recuperação                                              | `role=status`; vazio com título, explicação e ação                                               |
| Erro                          | Resumo e mensagem por campo                                         | `role=alert`, foco no resumo e links para os campos                                              |
| Confirmação                   | Carregando → sucesso                                                | Botão desabilitado, `aria-busy`, texto e confirmação na aba                                      |
| Accordion                     | Medidas, cuidados e ajuda                                           | `details` e `summary` nativos                                                                    |

## Regras de interação

- Foco com anel azul de 3px e separação branca; visível em superfícies claras e escuras.
- Link muda de tela; botão altera estado ou envia formulário.
- Rotas por hash mantêm Voltar/Avançar; título atualizado e foco no conteúdo após navegação.
- Skip link leva ao conteúdo sem disparar uma rota. Alterar quantidade preserva foco no botão.
- Estados não dependem só de cor: texto, coração preenchido e estados ARIA complementam o visual.
- `prefers-reduced-motion` elimina movimento; `forced-colors` preserva bordas/foco.
- 44 × 44px é o alvo solicitado pelo trabalho, uma recomendação adicional de toque; não é critério específico da WCAG 2.0.

## Relação com WCAG 2.0

| Critério                     | Implementação                                              |
| ---------------------------- | ---------------------------------------------------------- |
| 1.1.1 Conteúdo não textual   | SVG descrito nos detalhes; imagens decorativas ocultas     |
| 1.3.1 Informações e relações | Landmarks, labels, fieldset/legend e tabela com cabeçalhos |
| 1.4.1 Uso de cor             | Mensagens textuais de estado/erro                          |
| 1.4.3 Contraste              | Pares calculados acima de 4,5:1                            |
| 1.4.4 Redimensionar texto    | rem, responsividade e zoom permitido                       |
| 2.1.1 / 2.1.2 Teclado        | Controles nativos, sem gestos ou modais obrigatórios       |
| 2.4.1 Ignorar blocos         | Link para pular ao conteúdo                                |
| 2.4.2 Título                 | Título atualizado por tela                                 |
| 2.4.3 / 2.4.7 Foco           | Gerenciamento de foco e estilo compartilhado               |
| 3.3.1 / 3.3.2 / 3.3.3        | Erros específicos, rótulos e sugestões                     |
| 3.3.4 Prevenção de erros     | Revisão editável antes da confirmação                      |
| 4.1.2 Nome, função, valor    | Controles nativos e estados ARIA                           |

Ainda requer avaliação com leitores de tela (ex.: NVDA), zoom de 200%, alto contraste e participantes com diferentes necessidades. O VLibras é externo e carregado globalmente; não comprova conformidade WCAG nem substitui testes com pessoas surdas.
