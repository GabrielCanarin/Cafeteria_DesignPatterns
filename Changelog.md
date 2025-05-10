
# **Code Smell - Switch Case na Factory**

## Repositório / URL

> [Switch Case na Factory](https://github.com/GabrielCanarin/Cafeteria_DesignPatterns/commit/82c740e39b6861a21451c41e6df90bbbbd54d285)

## ChangeLog das Modificações

| Arquivo           | Alteração                                                                 |
|-------------------|---------------------------------------------------------------------------|
| `Item.ts`         | Substituído `class Item` por `interface Item`, removendo lógica genérica. |
| `Bebida.ts`       | Criada classe `Bebida` implementando `Item` com lógica específica.        |
| `Doce.ts`         | Criada classe `Doce` implementando `Item` com lógica específica.          |
| `Salgado.ts`      | Criada classe `Salgado` implementando `Item` com lógica específica.       |
| `ItemFactory.ts`  | Removido `switch-case`; adicionado `registry pattern` com mapeamento dinâmico. |
| `index.ts` ou main | Utilização da `ItemFactory.criarItem()` para instanciar dinamicamente.    |

## Refatorado

```ts
const item1 = ItemFactory.criarItem("bebida", "Guaraná", 4.50);
console.log(item1.getDetails());
```

# **Code Smell - If-Else na Seleção de Estratégia de Pagamento**

## Repositório / URL

> [Substituição de if-else por Registry Pattern](https://github.com/GabrielCanarin/Cafeteria_DesignPatterns/commit/1b4a8373d1fe95c1ea985a1bf6f92d94364fa60c)

## ChangeLog das Modificações

| Arquivo             | Alteração                                                                 |
|---------------------|---------------------------------------------------------------------------|
| `OrderService.ts`   | Substituído bloco `if-else` por objeto `Record<string, PaymentStrategy>`. |


## Refatorado

```ts
const strategies: Record<string, PaymentStrategy> = {
  pix: new PixPayment(),
  creditcard: new CreditCardPayment()
};
```

# **Code Smell - Long Method / Duplicated Code no MenuService**

## Repositório / URL

> [Extração de Método Privado (DRY - Don't Repeat Yourself)](https://github.com/GabrielCanarin/Cafeteria_DesignPatterns/commit/1e19e06eba4e998ee63e3daf4b95b2d9793f628b)

## ChangeLog das Modificações

| Arquivo             | Alteração                                                                 |
|---------------------|---------------------------------------------------------------------------|
| `MenuService.ts`   | Extração da lógica duplicada para o método `isSameItemName()` .            |


## Refatorado

```ts
private isSameItemName(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
};
```
