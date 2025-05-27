# **Code Smell - Switch Case na Factory**

## Repositório / URL

> [Switch Case na Factory](https://github.com/GabrielCanarin/Cafeteria_DesignPatterns/commit/82c740e39b6861a21451c41e6df90bbbbd54d285)

## ChangeLog das Modificações

| Arquivo            | Alteração                                                                      |
| ------------------ | ------------------------------------------------------------------------------ |
| `Item.ts`          | Substituído `class Item` por `interface Item`, removendo lógica genérica.      |
| `Bebida.ts`        | Criada classe `Bebida` implementando `Item` com lógica específica.             |
| `Doce.ts`          | Criada classe `Doce` implementando `Item` com lógica específica.               |
| `Salgado.ts`       | Criada classe `Salgado` implementando `Item` com lógica específica.            |
| `ItemFactory.ts`   | Removido `switch-case`; adicionado `registry pattern` com mapeamento dinâmico. |
| `index.ts` ou main | Utilização da `ItemFactory.criarItem()` para instanciar dinamicamente.         |

## Refatorado

```ts
const item1 = ItemFactory.criarItem("bebida", "Guaraná", 4.5);
console.log(item1.getDetails());
```

# **Code Smell - If-Else na Seleção de Estratégia de Pagamento**

## Repositório / URL

> [Substituição de if-else por Registry Pattern](https://github.com/GabrielCanarin/Cafeteria_DesignPatterns/commit/1b4a8373d1fe95c1ea985a1bf6f92d94364fa60c)

## ChangeLog das Modificações

| Arquivo           | Alteração                                                                 |
| ----------------- | ------------------------------------------------------------------------- |
| `OrderService.ts` | Substituído bloco `if-else` por objeto `Record<string, PaymentStrategy>`. |

## Refatorado

```ts
const strategies: Record<string, PaymentStrategy> = {
  pix: new PixPayment(),
  creditcard: new CreditCardPayment(),
};
```

# **Code Smell - Long Method / Duplicated Code no MenuService**

## Repositório / URL

> [Extração de Método Privado (DRY - Don't Repeat Yourself)](https://github.com/GabrielCanarin/Cafeteria_DesignPatterns/commit/1e19e06eba4e998ee63e3daf4b95b2d9793f628b)

## ChangeLog das Modificações

| Arquivo          | Alteração                                                       |
| ---------------- | --------------------------------------------------------------- |
| `MenuService.ts` | Extração da lógica duplicada para o método `isSameItemName()` . |

## Refatorado

```ts
private isSameItemName(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
};
```

# **Code Smell: Lógica de Pedido Duplicada**

## Repositório / URL

> [Remoção da Lógica de finalizar pedido do componente visual `PaymentPage.tsx`](https://github.com/GabrielCanarin/Cafeteria_DesignPatterns/commit/be1d88fa3fe0addb6c89de6ec612bfbefcfe4a0f)

## ChangeLog das Modificações

| Arquivo            | Alteração                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `OrderContext.tsx` | Adição da lógica de finalizar pedido no contexto em `finishOrder`.  |
| `PaymentPage.tsx`  | Remoção da Lógica de finzalição do pedido, chamando apenas a função do contexto em `finishOrder(paymentType)`. |

## Refatorado

```ts
  const { order, getOrderTotal, finishOrder } = useOrder();

  const handleFinishOrder = () => {
    const paymentType = paymentMethod === "Pix" ? "pix" : "creditCard";
    finishOrder(paymentType);
  };
```

# **Code Smell: Prop Drilling no CartModal**

## Repositório / URL

> [Remoção das props no componente CartModel.tsx evitando Prop Drilling, usando o Context.](https://github.com/GabrielCanarin/Cafeteria_DesignPatterns/commit/2f19c8d43d9778cd3a520f4cda2f2af37e279226)

## ChangeLog das Modificações

| Arquivo            | Alteração                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `CartModal.tsx` | Remoção da interface `ICartModalProps` e adição da constante que recebe os valores desestruturados do contexto `useOrder()`.  |
| `Menu.tsx`  | Remoção das props de `<CartModal/>`. |

## Refatorado

```ts
const {
    order,
    isCartOpen,
    removeItem,
    clearOrder,
    getOrderTotal,
    setIsCartOpen,
  } = useOrder();
```

# **Code Smell - Lógica de Negócio no Componente de Interface**

## Repositório / URL

> [Extração de lógica de cálculo do total do pedido para utilitário getOrderTotal()](https://github.com/GabrielCanarin/Cafeteria_DesignPatterns/commit/83dba8c123581eb0917abe954a2f5497af6634ed)

## ChangeLog das Modificações

| Arquivo            | Alteração                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `OrderContext.tsx` | Adição do função `getOrderTotal` que retorna o valor total do pedido                        |
| `PaymentPage.tsx`  | Remoção do cálculo Total que era feito nesse componente e colocado a função `getOrderTotal` |

## Refatorado

```ts
const getOrderTotal = () => {
  const orderTotal = order.reduce((total, item) => total + item.price, 0);
  return orderTotal;
};
```



# **Adição de Nova Funcionalidade - Interface Fluente para Combos**

## Repositório / URL

> [Implementação de Interface Fluente para Combos](https://github.com/GabrielCanarin/Cafeteria_DesignPatterns/commit/44119d007e62a94cc4d033687381ffbc6eae1003)

## ChangeLog das Modificações

| Arquivo             | Alteração                                                                           |
| ------------------- | ----------------------------------------------------------------------------------- |
| `Combo.ts`          | Criada nova classe implementando `Item` para representar combos com descontos.      |
| `ComboBuilder.ts`   | Implementado builder com interface fluente para construção expressiva de combos.    |
| `ComboService.ts`   | Criado serviço para gerenciamento e registro de combos promocionais.               |

## Exemplo de Uso

```ts
// Criação de combo com interface fluente
const cafeDaManha = comboService.createCombo("Café da Manhã")
  .withItem("Café")
  .withItem("Croissant")
  .withDiscount(15)
  .build();

// Registro do combo no sistema
comboService.registerCombo(cafeDaManha);
```

# **Testes E2E Realizados no FrontEnd Utilizando Playwright**

## Para rodar os Testes, entre na Pasta FrontEnd/sistema-cafeteria-DesignPatterns e rode os comandos:

```ts
npm run build
```

```ts
npx playwright test
```

### Teste 1 - Deve ir para a tela de pagamento após adicionar um item

### Teste 2 - Deve marcar e desmarcar um checkbox de produto

### Teste 3 - Deve realizar um pagamento via PIX

### Teste 4 - Deve descartar um pedido

### Teste 5 - Deve comprar um Pastel, um sorvete e uma água via cartão de crédito




