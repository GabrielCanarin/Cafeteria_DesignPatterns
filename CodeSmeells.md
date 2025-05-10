## Problemas detectados

1. **Code Smell - Switch Case na Factory**  
   A implementação original da `ItemFactory` utilizava estruturas `switch-case` para decidir qual classe instanciar com base no tipo do item. Isso violava o princípio **Open/Closed** do SOLID, dificultando a escalabilidade e a manutenção do código.

## Estratégia de Refatoração

- **Aplicação do Princípio Open/Closed (SOLID):**  
  Em vez de usar o `switch-case`, implementamos um **registro dinâmico** (registry pattern), permitindo que novos tipos de itens sejam criados sem modificar a lógica da `ItemFactory`.

## Ferramentas Utilizadas

- **Refatoração Manual + SOLID Principles** – aplicando boas práticas de design sem depender de frameworks externos.


2. **Code Smell – Encadeamento de `if-else` na seleção de estratégia de pagamento**  
   A lógica original da `OrderService.processOrder()` utilizava um bloco de `if-else` para determinar qual estratégia de pagamento deveria ser utilizada (`Pix` ou `Cartão de Crédito`). Esse padrão viola o princípio **Open/Closed** do SOLID, tornando a adição de novos métodos de pagamento propensa a erros e aumentando o acoplamento.

## Estratégia de Refatoração

- **Aplicação do Princípio Open/Closed (SOLID):**  
  Substituímos o `if-else` por um **registro de estratégias de pagamento** usando um objeto `Record<string, PaymentStrategy>`. Isso permite a extensão de novos métodos de pagamento sem alterar a lógica interna da `processOrder()`.

## Ferramentas Utilizadas

- **Registry Pattern + SOLID Principles** – uso de um mapa (`Record`) para encapsular as estratégias de forma desacoplada e escalável, facilitando a manutenção e expansão do sistema de pagamentos.


3. **Code Smell – Long Method / Duplicated Code no MenuService**  
   A lógica original dos métodos `getItemByName()` e `removeItem()` na classe `MenuService` utilizava o trecho de código repetido para comparar os nomes dos itens de forma insensível a maiúsculas/minúsculas.

## Estratégia de Refatoração

- **Extração de Método Privado (DRY - Don't Repeat Yourself):**  
  Criamos um novo método privado `isSameItemName()` para encapsular a lógica de comparação. Esse método agora é utilizado tanto em `getItemByName()` quanto em `removeItem()`, eliminando a duplicação e tornando o código mais limpo e reutilizável.

## Ferramentas Utilizadas

- **Princípio DRY (Don't Repeat Yourself)** - Extração da lógica duplicada para um método privado.