# FieldKit — avaliação heurística e matriz de iteração

Data: 22/10/2026. Método escolhido: **inspeção baseada nas 10 heurísticas de Nielsen**, alternativa prevista na rubrica. Relatório de inspeção técnica assistida por IA, comparando a versão inicial do repositório com o protótipo adaptado. Não houve sessões com usuários reais; não são atribuídas falas, taxas de sucesso ou tempos a participantes.

## Escopo e método

Marketplace FieldKit, de Henrique F. V. Plech, disciplina de IHC, orientação da Prof.ª Tacyana Batista. Jornada: descobrir → escolher tamanho → sacola → entrega → revisão → confirmação.

1. Inspecionar os arquivos iniciais `index.html`, `style.css` e `README.md`.
2. Registrar problemas observáveis, separados de hipóteses sobre usuários.
3. Classificar severidade: 0 = sem problema; 1 = cosmético; 2 = atrito moderado; 3 = bloqueio importante; 4 = bloqueio da tarefa principal.
4. Implementar correções e verificar regressões.

Severidades são julgamentos desta inspeção, não dados quantitativos de pesquisa. Referência: [Nielsen Norman Group — 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/).

## Matriz de iteração

| ID / heurística                     | Evidência inicial                                             | Severidade | Correção aplicada                                                          | Verificação final                                       |
| ----------------------------------- | ------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------- | ------------------------------------------------------- |
| H1 — Visibilidade do estado         | Badge fixo de 3 itens; favorito sem mensagem de ação          | 3          | Contagem derivada dos itens, feedback anunciado, carregamento e sucesso    | Adicionar camisa, alterar quantidade e confirmar pedido |
| H2 — Correspondência com mundo real | “Ver detalhes” apontava ao título do card, sem tamanhos       | 3          | Detalhes, tamanhos, guia em cm e preços em reais                           | Abrir camisa, consultar guia e escolher M               |
| H3 — Controle e liberdade           | Link da sacola sem seção correspondente; itens sem controles  | 4          | Remoção, desfazer, quantidades, retorno e edição da entrega                | Remover/desfazer e voltar da revisão para editar        |
| H4 — Consistência e padrões         | Cards e menu prometiam ações sem telas correspondentes        | 3          | Dez telas, navegação comum, títulos e tokens                               | Percorrer menu e histórico do navegador                 |
| H5 — Prevenção de erros             | Ausência de seleção e revisão da compra                       | 4          | Tamanho obrigatório, limites, entrega validada e revisão                   | Adicionar sem tamanho e enviar entrega vazia            |
| H6 — Reconhecimento                 | Ausência de resumo de escolhas e favoritos persistentes       | 2          | Resumos de tamanho/valor; favoritos persistidos; entrega preservada na aba | Recarregar favoritos e editar entrega                   |
| H7 — Flexibilidade e eficiência     | Filtros sem lógica de filtragem; busca sem pesquisa           | 3          | Busca sem acentos, filtros combinados, ordenação e visitante               | Buscar “retro”, combinar Vasco, ordenar por preço       |
| H8 — Estética e minimalismo         | Seis categorias sem correspondência no catálogo de dois itens | 2          | Três coleções com produtos correspondentes; seis modelos                   | Explorar Titular, Retrô e Treino                        |
| H9 — Recuperação de erros           | Sem mensagens de vazio, cupom ou entrega inválidos            | 3          | Vazio com ação, erro específico, resumo focável e limpeza                  | Buscar termo inexistente, cupom errado e entrega vazia  |
| H10 — Ajuda e documentação          | Sem FAQ/medidas e sem instruções de uso do VLibras            | 2          | Ajuda, medidas, documentação e carregamento global com tratamento de falha | Abrir FAQ/guia; testar VLibras com/sem rede             |

As correções estão implementadas; isso não significa validadas por usuários. Utilidade dos rótulos, compreensão do cupom e descoberta do guia continuam sendo hipóteses a avaliar com participantes.

## Arquitetura da informação

| Tela                       | Rota                               | Ação principal                          |
| -------------------------- | ---------------------------------- | --------------------------------------- |
| 1. Início                  | `#inicio`                          | Explorar catálogo ou coleção            |
| 2. Catálogo                | `#catalogo`                        | Buscar, filtrar, ordenar e abrir camisa |
| 3. Detalhes                | `#produto/palmeiras` (ou outro ID) | Medidas, tamanho e adicionar            |
| 4. Favoritos               | `#favoritos`                       | Rever seleção e abrir detalhes          |
| 5. Sacola                  | `#carrinho`                        | Ajustar itens, cupom e avançar          |
| 6. Entrega                 | `#entrega`                         | Preencher dados fictícios               |
| 7. Revisão                 | `#revisao`                         | Editar ou confirmar                     |
| 8. Confirmação             | `#confirmacao`                     | Resumo e continuar explorando           |
| 9. Acesso/perfil           | `#acesso`                          | Perfil temporário ou visitante          |
| 10. Ajuda e acessibilidade | `#ajuda`                           | Instruções, FAQ e recursos              |

Coleções são filtros; vazio e erro são estados, não telas extras. Menu global estável; sacola sempre disponível. “Sacola” é o rótulo apresentado e `carrinho` é o identificador interno. Entrega/revisão exigem produtos; revisão exige entrega preenchida.

## Verificações técnicas

Execute `node --check app.js` e `node scripts/check.mjs`. O segundo verifica nove grupos: renderização das dez telas e IDs, filtros/acentos, ordenação/vazio, desconto em centavos, frete, validação, proteção de rotas, saneamento de dados persistidos e escape de texto. Também calcula contrastes.

A suíte usa simulação mínima de DOM em Node; não substitui navegador, leitor de tela ou teste com pessoas. Evidências do navegador e limites: [VERIFICACAO.md](VERIFICACAO.md).

## Roteiro Think Aloud — pronto para aplicação

**Planejado, ainda não executado.** Convidar 2–3 pessoas reais, com diferentes experiências em compras online. Buscar pessoa que use teclado ou tecnologia assistiva se possível; não simular deficiência nem atribuir perfis sem confirmação.

Sessão individual de 15–20 minutos. Pedir consentimento para anotações; gravar apenas com concordância. Usar dados fictícios e identificar como P1, P2 e P3.

Introdução: “Estamos avaliando a interface, não você. Diga o que está tentando fazer, o que espera encontrar e o que parece confuso. Você pode parar a qualquer momento.”

| Tarefa | Enunciado                                                     | Evidência a registrar                           |
| ------ | ------------------------------------------------------------- | ----------------------------------------------- |
| T1     | Encontre uma camisa retrô do Vasco e descubra o preço         | Primeira ação, filtros e dúvidas                |
| T2     | Guarde essa camisa para decidir depois e encontre sua seleção | Descoberta do coração e favoritos               |
| T3     | Consulte medidas e coloque uma camisa M na sacola             | Descoberta do guia e escolha de tamanho         |
| T4     | Use FIELDKIT15 em uma titular e confira o total               | Compreensão de coleção, desconto e frete        |
| T5     | Remova uma camisa e desfaça a remoção                         | Descoberta da recuperação                       |
| T6     | Conclua como visitante e corrija um CEP incompleto            | Recuperação, revisão e compreensão da simulação |

Não indicar botões. Se houver silêncio: “O que você está pensando agora?”. Registrar ajuda recebida. Medir tempo a partir do início da tarefa; interromper por desistência ou após limite combinado de até 3 minutos por tarefa.

| Participante | Tarefa      | Sem ajuda / com ajuda / não concluiu | Tempo       | Fala autorizada | Problema / severidade | Sugestão    |
| ------------ | ----------- | ------------------------------------ | ----------- | --------------- | --------------------- | ----------- |
| A preencher  | A preencher | A preencher                          | A preencher | A preencher     | A preencher           | A preencher |

Pós-teste: perguntar o que foi difícil, o que trouxe segurança e o que mudaria. Calcular sucesso somente com observações reais. Não generalizar percentuais de 2–3 pessoas. Acrescentar achados à matriz, corrigir e repetir tarefas afetadas.

## Cobertura da rubrica

| Bloco                          | Peso | Evidência                                                          |
| ------------------------------ | ---- | ------------------------------------------------------------------ |
| Telas e navegabilidade         | 30%  | Dez telas, fluxo de compra, histórico e quatro estados de feedback |
| Design system e acessibilidade | 20%  | Tokens, componentes, contraste, foco e áreas de toque              |
| Testes / Nielsen               | 25%  | Dez heurísticas e matriz; roteiro futuro separado                  |
| Arquitetura da informação      | 15%  | Mapa, menu, rótulos e resumo de escolhas                           |
| Apresentação                   | 10%  | Roteiro e justificativas em APRESENTACAO.md                        |

## Limitações

Sem backend, estoque, autenticação ou pagamento real. Entrega e pedido desaparecem ao recarregar. Ilustrações sem afirmação de autenticidade comercial. Sem avaliação independente ou certificação WCAG. VLibras requer validação externa e com usuários. A versão inicial tinha dois links diferentes de pesquisa; nenhum foi tratado como evidência de resultados nesta entrega.
