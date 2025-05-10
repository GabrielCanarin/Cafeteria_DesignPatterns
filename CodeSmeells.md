## Problemas detectados

1. **Code Smell - Switch Case na Factory**  
   A implementação original da `ItemFactory` utilizava estruturas `switch-case` para decidir qual classe instanciar com base no tipo do item. Isso violava o princípio **Open/Closed** do SOLID, dificultando a escalabilidade e a manutenção do código.

## Estratégia de Refatoração

- **Aplicação do Princípio Open/Closed (SOLID):**  
  Em vez de usar o `switch-case`, implementamos um **registro dinâmico** (registry pattern), permitindo que novos tipos de itens sejam criados sem modificar a lógica da `ItemFactory`.

## Ferramentas Utilizadas

- **Refatoração Manual + SOLID Principles** – aplicando boas práticas de design sem depender de frameworks externos.