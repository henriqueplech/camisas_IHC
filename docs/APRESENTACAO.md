# FieldKit — apresentação de 6 a 8 minutos

## Contexto — 45 segundos

“A primeira versão apresentava o marketplace, mas várias ações terminavam na mesma página e não havia compra completa. Esta etapa tornou a jornada navegável e acessível, preservando a identidade FieldKit.” Apresentar aluno, disciplina, orientação e público: torcedores com diferentes experiências digitais e formas de interação.

## Arquitetura — 1 minuto

Mostrar as dez telas e o menu estável. Compra sem conta; favoritos guardam escolhas; sacola sempre disponível. Entrega e revisão separadas reduzem decisões por etapa e permitem conferir antes da confirmação.

## Demonstração — 3 minutos

1. Abrir catálogo e filtrar coleção. Buscar termo inexistente e limpar filtros.
2. Favoritar uma camisa, abrir detalhes e consultar medidas.
3. Adicionar sem tamanho, mostrar erro, escolher M e adicionar.
4. Ajustar quantidade, remover e desfazer. Usar FIELDKIT15 em titular e explicar frete.
5. Avançar como visitante; enviar entrega vazia e mostrar resumo de erros e foco.
6. Preencher dados fictícios, revisar, editar e confirmar. Mostrar carregamento/sucesso e ausência de cobrança real.

## Acessibilidade — 1 minuto

Demonstrar Tab, Shift + Tab, foco e skip link. Selecionar tamanho por setas. Informar contrastes: botão azul 6,87:1; texto secundário no branco 6,31:1. Mostrar layout estreito e zoom. Explicar alvo 44 × 44px exigido pelo trabalho. Apresentar como implementação orientada à WCAG 2.0, sem certificação. VLibras complementa semântica e teclado.

## Avaliação — 1 minuto

Mostrar matriz: badge fixo → contagem real (H1); detalhes sem ação → tamanho/revisão (H2/H5); filtros sem lógica → resultados e recuperação (H7/H9). Informar: inspeção técnica assistida por IA pelas dez heurísticas; não houve teste com participantes. Roteiro Think Aloud está pronto, sem resultados inventados.

## Preparação

- Iniciar `node scripts/serve.mjs`; acessar `http://localhost:4173`.
- Executar `node scripts/check.mjs` e manter resultado disponível.
- Limpar dados em Ajuda antes de apresentar.
- Usar Pessoa Teste, teste@example.com e Rua Exemplo 10.
- Deixar DESIGN-SYSTEM.md, AVALIACAO-IHC.md e VERIFICACAO.md abertos.
- Fluxo principal funciona sem internet; VLibras é externo e depende de conexão.

Próximos passos: sessões com 2–3 participantes, NVDA, zoom de 200%, observação de filtros/cupom/medidas e nova iteração. Login, pagamento e envio de pedido permanecem simulados pelo escopo acadêmico.
