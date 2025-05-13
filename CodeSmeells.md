## Problemas detectados BackEnd

# 1. **Code Smell - Switch Case na Factory**

A implementação original da `ItemFactory` utilizava estruturas `switch-case` para decidir qual classe instanciar com base no tipo do item. Isso violava o princípio **Open/Closed** do SOLID, dificultando a escalabilidade e a manutenção do código.

## Estratégia de Refatoração

- **Aplicação do Princípio Open/Closed (SOLID):**  
  Em vez de usar o `switch-case`, implementamos um **registro dinâmico** (registry pattern), permitindo que novos tipos de itens sejam criados sem modificar a lógica da `ItemFactory`.

## Ferramentas Utilizadas

- **Refatoração Manual + SOLID Principles** – aplicando boas práticas de design sem depender de frameworks externos.

---

# 2. **Code Smell – Encadeamento de `if-else` na seleção de estratégia de pagamento**

A lógica original da `OrderService.processOrder()` utilizava um bloco de `if-else` para determinar qual estratégia de pagamento deveria ser utilizada (`Pix` ou `Cartão de Crédito`). Esse padrão viola o princípio **Open/Closed** do SOLID, tornando a adição de novos métodos de pagamento propensa a erros e aumentando o acoplamento.

## Estratégia de Refatoração

- **Aplicação do Princípio Open/Closed (SOLID):**  
  Substituímos o `if-else` por um **registro de estratégias de pagamento** usando um objeto `Record<string, PaymentStrategy>`. Isso permite a extensão de novos métodos de pagamento sem alterar a lógica interna da `processOrder()`.

## Ferramentas Utilizadas

- **Registry Pattern + SOLID Principles** – uso de um mapa (`Record`) para encapsular as estratégias de forma desacoplada e escalável, facilitando a manutenção e expansão do sistema de pagamentos.

---

# 3. **Code Smell – Long Method / Duplicated Code no MenuService**

A lógica original dos métodos `getItemByName()` e `removeItem()` na classe `MenuService` utilizava o trecho de código repetido para comparar os nomes dos itens de forma insensível a maiúsculas/minúsculas.

## Estratégia de Refatoração

- **Extração de Método Privado (DRY - Don't Repeat Yourself):**  
  Criamos um novo método privado `isSameItemName()` para encapsular a lógica de comparação. Esse método agora é utilizado tanto em `getItemByName()` quanto em `removeItem()`, eliminando a duplicação e tornando o código mais limpo e reutilizável.

## Ferramentas Utilizadas

- **Princípio DRY (Don't Repeat Yourself)** - Extração da lógica duplicada para um método privado.

## Problemas detectados FrontEnd

# 1. **Code Smell - Lógica de Pedido Duplicada**

A implementação original possuía a lógica de finalização de pedido duplicada entre `PaymentPage` e `OrderContext`, com `handleFinishOrder` e `finishOrder` realizando operações similares. Isso violava o princípio Don't Repeat Yourself (DRY) e aumentava a complexidade de manutenção.

## Estratégia de Refatoração

- **Consolidação no OrderContext:**

Movemos toda a lógica de finalização para o `OrderContext`, expondo apenas a função `finishOrder` para os componentes. A `PaymentPage` agora apenas dispara a ação do contexto.

## Ferramentas Utilizadas

React Context API + DRY Principle - Centralização da lógica de negócios no contexto para eliminar duplicação.

# 2. **Code Smell - `Prop Drilling` no CartModal**

O componente `CartModal` recebia múltiplas props (isOpen, onClose, order, onRemoveItem) que eram repassadas através da hierarquia de componentes. Isso criava alto acoplamento e fragilidade no código.

## Estratégia de Refatoração

- **Consolidação no OrderContext:**

Refatoramos para que o `CartModal` acesse diretamente o `OrderContext`, eliminando a necessidade de `prop drilling`. Os estados e ações são gerenciados internamente pelo contexto.

## Ferramentas Utilizadas

React Context API + Inversão de Controle - Uso do contexto para fornecer dados e comportamentos aos componentes filhos.

# 3. **Code Smell - Lógica de Negócio no Componente**

O cálculo do total do pedido `(order.reduce(...))` estava implementado diretamente no componente `PaymentPage`, misturando lógica de apresentação com regras de negócio.

## Estratégia de Refatoração

- **Extração para o OrderContext:**

Criamos a função utilitária `getOrderTotal()` no contexto, que pode ser reutilizada por qualquer componente que precise do valor total, seguindo o princípio `Single Source of Truth`.

## Ferramentas Utilizadas

Custom Hook + SOLID Principles - Isolamento da lógica de negócio em hooks/contexto para melhor reuso e manutenção.

Padrão Comum: Todas as refatorações aplicam princípios SOLID (especialmente Single Responsibility e Open/Closed) e DRY, movendo a lógica de negócio para camadas mais adequadas (contexto/hooks) e reduzindo o acoplamento entre componentes.
