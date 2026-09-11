# FieldKit

## Marketplace de camisas de futebol

O **FieldKit** e uma interface de marketplace para camisas de times, desenvolvida como trabalho da disciplina de Interacao Humano-Computador (IHC). O projeto apresenta uma experiencia de compra simples, responsiva e acessivel, com destaque para produtos oficiais, edicoes especiais e navegacao objetiva.

A proposta combina boas praticas do padrao **WCAG 2.1 nivel AA** com o **VLibras**, ampliando o acesso ao conteudo para pessoas surdas que utilizam a Lingua Brasileira de Sinais (Libras).

> Trabalho academico desenvolvido por Henrique F. V. Plech, sob orientacao da professora Tacyana Batista.

## Objetivos

- Apresentar um catalogo de camisas de futebol de forma clara.
- Facilitar a busca por categorias, times e faixas de preco.
- Aplicar principios de acessibilidade e design responsivo.
- Criar uma base visual que possa evoluir para um marketplace completo.

## Funcionalidades da interface

- Cabecalho com marca, navegacao principal, busca, carrinho e acesso.
- Hero section com proposta de valor e chamadas para o catalogo.
- Banner promocional com cupom de desconto.
- Categorias de produtos: titular, reserva, goleiro, edicao especial, retro e treino.
- Cards de produtos com time, avaliacao, preco, parcelamento e favoritos.
- Catalogo com filtros de time, categoria e ordenacao.
- Secao institucional sobre a FieldKit.
- Link para a pesquisa utilizada no desenvolvimento do projeto.
- Rodape com canais de atendimento e informacoes da loja.

## Acessibilidade e inclusao

A acessibilidade e parte central da proposta do FieldKit. O projeto trabalha com duas camadas complementares:

1. **WCAG 2.1 nivel AA:** garante que a interface seja perceptivel, operavel, compreensivel e robusta para diferentes pessoas, dispositivos e tecnologias assistivas.
2. **VLibras:** oferece uma camada de traducao do conteudo para Libras, contribuindo para a inclusao de usuarios surdos que preferem ou necessitam da lingua de sinais.

### Aplicacao das diretrizes WCAG

- Uso de HTML semantico com `header`, `nav`, `main`, `section`, `article`, `aside` e `footer`.
- Um unico titulo principal (`h1`) e hierarquia organizada de headings.
- Link para pular diretamente ao conteudo principal.
- Labels associados aos campos de busca e filtros.
- Textos alternativos e descricoes acessiveis para elementos visuais em SVG.
- Foco visivel para navegacao por teclado com `:focus-visible`.
- Contraste reforcado entre texto, fundo e componentes interativos.
- Layout responsivo para desktop, tablet e celular.
- Respeito a `prefers-reduced-motion` para reduzir animacoes quando solicitado pelo sistema.
- Uso de unidades relativas no CSS para favorecer o redimensionamento do texto.

### Integracao com o VLibras

O `index.html` inclui o script oficial do VLibras:

```html
<script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
```

Com o carregamento do recurso, o widget do VLibras fica disponivel na pagina para que o usuario possa solicitar a traducao de textos selecionados para Libras. A integracao complementa, mas nao substitui, as boas praticas WCAG: o site continua utilizando semantica HTML, textos claros, foco visivel, contraste e navegacao por teclado.

Para utilizar o recurso corretamente, e necessario abrir a pagina com acesso a internet, pois o script e o servico de traducao sao fornecidos externamente pelo VLibras. Em uma avaliacao de acessibilidade, recomenda-se verificar tambem se o widget aparece, pode ser acionado e nao bloqueia a navegacao principal.

## Tecnologias

- HTML5
- CSS3
- SVG inline para ilustracoes de camisas e icones
- Google Fonts, com a familia Inter
- VLibras, por meio do widget oficial para traducao em Libras

Nao ha frameworks, bibliotecas de interface ou JavaScript complexo no projeto.

## Estrutura do projeto

```text
camisas_IHC_website/
├── index.html   # Estrutura e conteudo da pagina
├── style.css    # Estilos, responsividade e regras de acessibilidade
└── README.md    # Documentacao do projeto
```

## Como executar

1. Clone ou baixe este repositorio.
2. Abra a pasta no VS Code.
3. Abra o arquivo `index.html` em um navegador.

Tambem e possivel usar a extensao **Live Server** do VS Code para atualizar a pagina automaticamente durante o desenvolvimento.

## Pesquisa utilizada

A pesquisa de usuarios usada como referencia para o trabalho esta disponivel em:

[Responder ou consultar a pesquisa da FieldKit](https://forms.gle/D4JWctA27p7pxWt5)

## Referencias do projeto

- [Video explicativo](https://youtu.be/6fTX0vEiDGA)
- [Prototipo no Figma](https://www.figma.com/design/Oe43KaqWU07EfdmDhc6ijN/IHC---HenriqueFVPlech?node-id=1-2&t=oWiCeha778o13UAG-1)

## Status

Projeto academico em desenvolvimento. A interface e demonstrativa: filtros, favoritos, carrinho e autenticacao ainda nao possuem persistencia ou integracao com backend.
