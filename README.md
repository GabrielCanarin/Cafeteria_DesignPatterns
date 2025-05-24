# Projeto de Cardápio com Design Patterns

Este projeto foi desenvolvido como parte da disciplina de **Design Patterns** e tem como objetivo demonstrar a aplicação prática de padrões de projeto no contexto de um sistema de gerenciamento de pedidos em um cardápio digital.

## 🧩 Tecnologias Utilizadas

- **Front-end**: React + TypeScript
- **Back-end**: Node.js + TypeScript

## 🎯 Descrição do Projeto

O sistema simula um ambiente de lanchonete ou restaurante com funcionalidades tanto no front-end quanto no back-end.

### 🔧 Funcionalidades principais:

#### Backend
- **Factory Pattern** para criação de itens do cardápio (`Bebida`, `Doce`, `Salgado`).
- **Observer Pattern** para monitoramento de pedidos.
- **Services**:
  - Gerenciamento do cardápio: adicionar, remover e listar itens.
  - Controle da comanda: criar, adicionar itens, remover e finalizar.
  - Pagamento da comanda: cálculo do valor total e aplicação de métodos de pagamento.
- **Strategy Pattern** para formas de pagamento:
  - Dinheiro
  - Cartão

#### Frontend
- Tela de visualização do cardápio (dados gerados no backend).
- Adição e remoção de itens da comanda.
- Navegação para tela de pagamento com seleção da forma (dinheiro ou cartão).

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (v16 ou superior)
- Gerenciador de pacotes `npm`

### Backend

1. Acesse a pasta do back-end:
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
    ```bash
   npm start
   ```

### Frontend

1. Acesse a pasta do front-end:
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o projeto:
    ```bash
   npm run dev
   ```
---

### 🔧 Funcionalidades adicionada:

#### Interface Fluente de Combos

Uma forma simples de criar combos encadeando métodos em sequência.

#### Como usar

```typescript
comboService
  .createCombo("Nome")
  .withItem("Item")
  .withDiscount(10)
  .build();
```

**Métodos**:

- `createCombo(nome)` - inicia um novo combo
- `withItem(nome)` - adiciona um item
- `withItems([nomes])` - adiciona vários itens
- `withDiscount(%)` - define desconto (0-100%)
- `build()` - finaliza e cria o combo

**Exemplos**

Combo simples
```typescript
const combo1 = comboService
  .createCombo("Café da Manhã")
  .withItem("Café")
  .withItem("Croissant")
  .withDiscount(15)
  .build();
```

Combo com vários itens
```typescript
const combo2 = comboService
  .createCombo("Lanche da Tarde")
  .withItems(["Refrigerante", "Coxinha", "Docinho"])
  .withDiscount(10)
  .build();
```

**Regras**

- Todo combo precisa ter pelo menos 1 item
- Desconto deve estar entre 0% e 100%
- Itens devem existir no menu
- Use `build()` no final para criar o combo
