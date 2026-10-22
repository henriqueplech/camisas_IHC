# FieldKit — marketplace acessível de camisas

Projeto de IHC de **Henrique F. V. Plech**, orientação da **Prof.ª Tacyana Batista**. Evolução da primeira etapa para dez telas interativas, mini design system e avaliação heurística.

## Executar

Sem dependências: abra `index.html` ou use Node.js 22.16+:

```powershell
node scripts/serve.mjs
```

Acesse [a prévia local](http://localhost:4173). Ctrl + C encerra o servidor, que escuta somente neste computador. Para hospedagem estática, use `index.html`, `style.css`, `app.js` e `docs/`.

## Funcionalidades

- Início, catálogo, detalhes, favoritos, sacola, entrega, revisão, confirmação, acesso/perfil e ajuda.
- Busca sem acentos, filtros por time/coleção e ordenação de preço.
- Guia de medidas, tamanho obrigatório, favoritos e sacola persistidos.
- Quantidades, remoção/desfazer, FIELDKIT15 (15% em titulares) e frete calculado.
- Compra simulada como visitante, erros específicos, revisão editável e confirmação.
- Perfil temporário, FAQ, instruções e VLibras em todas as telas.
- Estados vazios, erro, carregamento, sucesso, hover e foco.

Protótipo acadêmico sem autenticação, cobrança ou entrega reais. Produtos e preços ilustrativos. Endereço e perfil ficam apenas na memória da aba; sacola, favoritos e cupom em `localStorage`, com alternativa em memória se indisponível. Limpeza disponível em Ajuda.

## Entregáveis

| Documento                                 | Conteúdo                                            |
| ----------------------------------------- | --------------------------------------------------- |
| [Design system](docs/DESIGN-SYSTEM.md)    | Tokens, contrastes, componentes e WCAG 2.0          |
| [Avaliação de IHC](docs/AVALIACAO-IHC.md) | Dez heurísticas, matriz, mapa e roteiro Think Aloud |
| [Apresentação](docs/APRESENTACAO.md)      | Demonstração e justificativas                       |
| [Verificação](docs/VERIFICACAO.md)        | Testes executados e limites                         |

Não houve teste com usuários reais. A alternativa escolhida é a inspeção heurística assistida por IA, identificada no relatório. O roteiro para 2–3 participantes não contém resultados fictícios.

## Verificar

```powershell
node --check app.js
node scripts/check.mjs
```

Verifica telas, lógica, validação, rotas, valores em centavos e contrastes. Não comprova conformidade WCAG integral; consulte os limites no relatório.

## Padrão de formatação

Os arquivos usam UTF-8, indentação de dois espaços e configuração compartilhada em `.editorconfig` e `.prettierrc.json`. O HTML das telas está em templates identificados por `html`, permitindo que o formatador organize tanto a marcação quanto o JavaScript.

Para conferir o padrão:

```powershell
npm exec --yes --package=prettier@3.9.10 -- prettier --check index.html style.css app.js "scripts/*.mjs" README.md "docs/*.md" .prettierrc.json
```

Troque `--check` por `--write` para aplicar a formatação. Esse comando é apenas uma ferramenta de desenvolvimento; o site continua sem dependências para executar.

## Estrutura

```text
index.html               Estrutura e navegação global
style.css                Tokens, componentes e responsividade
app.js                   Telas e lógica do protótipo
scripts/serve.mjs        Servidor local
scripts/check.mjs        Verificações reproduzíveis
docs/                    Entregáveis acadêmicos
```

Fluxo principal sem fontes, imagens ou bibliotecas externas. Ilustrações SVG preservam a proposta original. VLibras depende de internet e carrega automaticamente. Seu botão global permite abrir o tradutor em qualquer tela ou tentar novamente após uma falha.

## Referências preservadas da primeira etapa

- [Vídeo explicativo](https://youtu.be/6fTX0vEiDGA)
- [Protótipo no Figma](https://www.figma.com/design/Oe43KaqWU07EfdmDhc6ijN/IHC---HenriqueFVPlech?node-id=1-2)

Essas referências não foram usadas como evidência de teste nesta adaptação. Fontes metodológicas estão nos documentos de avaliação e design system.
