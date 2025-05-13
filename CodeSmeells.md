# 📌 Relatório de Problemas Detectados

Este documento apresenta os principais problemas de design e implementação encontrados no projeto, segmentados por camada (Back-End e Front-End). Para cada problema, foram descritos:

1. O tipo de code smell ou violação de princípio identificado;
2. A estratégia de refatoração adotada;
3. As ferramentas ou padrões utilizados na solução.

---

## 🔧 Problemas Detectados — Back-End

### 1. Code Smell: Uso de Switch-Case na ItemFactory

A implementação original da `ItemFactory` utilizava estruturas `switch-case` para decidir qual classe instanciar com base no tipo do item. Isso violava o princípio **Open/Closed** do SOLID, dificultando a escalabilidade e a manutenção do código.

#### Estratégia de Refatoração

- Substituição do `switch-case`, implementamos um **registro dinâmico** (registry pattern), permitindo que novos tipos de itens sejam criados sem modificar a lógica da `ItemFactory`.

#### Ferramentas Utilizadas

- **Refatoração Manual + SOLID Principles**.

---

### 2. Code Smell: Encadeamento de if-else na seleção de estratégia de pagamento

A classe `OrderService.processOrder()` possuía lógica condicional do tipo `if-else` para determinar o tipo de pagamento (`Pix` ou `Cartão de Crédito`), tornando o sistema rígido e pouco extensível.


#### Estratégia de Refatoração

- Substituímos o `if-else` por um **registro de estratégias de pagamento** usando um objeto `Record<string, PaymentStrategy>`. Isso permite a extensão de novos métodos de pagamento sem alterar a lógica interna da `processOrder()`.

#### Ferramentas Utilizadas

- **Registry Pattern + SOLID Principles** .

---

### 3. Code Smell: Método longo e código duplicado no MenuService

Os métodos `getItemByName()` e `removeItem()` compartilhavam a mesma lógica de comparação de nomes (case-insensitive), repetida em ambos os locais.

#### Estratégia de Refatoração

- Extração da lógica repetida para um método privado chamado `isSameItemName()`.

#### Ferramentas Utilizadas

- Princípio **DRY (Don't Repeat Yourself)**.

---

## 🎨 Problemas Detectados — Front-End

### 1. Code Smell: Lógica de Pedido Duplicada

A lógica de finalização de pedido estava duplicada entre `PaymentPage` e `OrderContext`, com funções similares (`handleFinishOrder` e `finishOrder`).

#### Estratégia de Refatoração

- Movemos toda a lógica de finalização para o `OrderContext`, expondo apenas a função `finishOrder` para os componentes. A `PaymentPage` agora apenas dispara a ação do contexto.

#### Ferramentas Utilizadas

- **React Context API + Princípio DRY**.

---

### 2. Code Smell: Prop Drilling no CartModal

O componente `CartModal` recebia diversas props (`isOpen`, `onClose`, `order`, `onRemoveItem`), criando acoplamento excessivo.

#### Estratégia de Refatoração

- Refatoramos para que o `CartModal` acesse diretamente o `OrderContext`, eliminando a necessidade de `prop drilling`. Os estados e ações são gerenciados internamente pelo contexto.

#### Ferramentas Utilizadas

- **React Context API + Inversão de Controle**.

---

### 3. Code Smell: Lógica de Negócio no Componente de Interface

O cálculo do total do pedido estava sendo feito diretamente no componente `PaymentPage` (via `order.reduce(...)`), misturando lógica de negócio com apresentação.

#### Estratégia de Refatoração

- Criamos a função utilitária `getOrderTotal()` no contexto, que pode ser reutilizada por qualquer componente que precise do valor total, seguindo o princípio `Single Source of Truth`.

#### Ferramentas Utilizadas

- **Custom Hook + Princípios SOLID** (Single Responsibility e Separation of Concerns).

---

### ❗ Ponto de Atenção: Inconsistência no uso de Idioma em Variáveis

Foi detectado um problema de clean code relacionado ao uso misto de idiomas em nomes de variáveis (inglês e português). Unificamos a linguagem utilizada no código, preferencialmente optando por nomes em inglês, para melhorar a clareza, padronização e leitura do código.
