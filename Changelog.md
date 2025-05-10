
# **Code Smell - Switch Case na Factory**

## Repositório / URL

> 

## ChangeLog das Modificações

| Arquivo           | Alteração                                                                 |
|-------------------|---------------------------------------------------------------------------|
| `Item.ts`         | Substituído `class Item` por `interface Item`, removendo lógica genérica. |
| `Bebida.ts`       | Criada classe `Bebida` implementando `Item` com lógica específica.        |
| `Doce.ts`         | Criada classe `Doce` implementando `Item` com lógica específica.          |
| `Salgado.ts`      | Criada classe `Salgado` implementando `Item` com lógica específica.       |
| `ItemFactory.ts`  | Removido `switch-case`; adicionado `registry pattern` com mapeamento dinâmico. |
| `index.ts` ou main | Utilização da `ItemFactory.criarItem()` para instanciar dinamicamente.    |

## Exemplo de Uso Refatorado

```ts
const item1 = ItemFactory.criarItem("bebida", "Guaraná", 4.50);
console.log(item1.getDetails());
