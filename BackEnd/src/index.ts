import express from "express";
import cors from "cors";
import { MenuService } from "./services/MenuService";
import { OrderService } from "./services/OrderService";
import { OrderHandler } from "./services/OrderHandler";

const app = express();
const port = 3000;
const menuService = new MenuService();
const orderService = new OrderService();
const orderHandler = new OrderHandler(menuService, orderService);

app.use(cors({ origin: "*" }));
app.use(express.json());

// Cardápio
menuService.addItem("Salgado", "Coxinha", 5.0);
menuService.addItem("Salgado", "Pastel", 6.0);
menuService.addItem("Salgado", "Kibe", 4.0);
menuService.addItem("Salgado", "Assado", 8.0);
menuService.addItem("Doce", "Torta", 10.0);
menuService.addItem("Doce", "Docinho", 3.0);
menuService.addItem("Doce", "Sorvete", 8.0);
menuService.addItem("Doce", "Croissant", 15.0);
menuService.addItem("Bebida", "Água", 2.0);
menuService.addItem("Bebida", "Refrigerante", 5.0);
menuService.addItem("Bebida", "Café", 12.0);
menuService.addItem("Bebida", "Vinho", 50.0);
// menuService.removeItem("Vinho");
// Exibe o menu completo com formatação
const displayMenu = () => {
  console.log("--------------------------------------------------------");
  console.log("                      MENU DISPONÍVEL                   ");
  console.log("--------------------------------------------------------");

  menuService.displayMenu().forEach((item) => {
    console.log(`${item.name} - R$ ${item.price}`);
  });

  console.log("--------------------------------------------------------");
};

// Rotas

// Exibe o menu
app.get("/menu", (req, res) => {
  displayMenu();
  res.json(menuService.displayMenu());
});

// Adicionar item ao pedido
app.post("/order/add", (req, res) => {
  const { itemName } = req.body;
  const item = menuService.getItemByName(itemName);

  if (item) {
    orderHandler.addItemToOrder(itemName);
    console.log("--------------------------------------------------------");
    console.log(`                  ITEM ADICIONADO AO PEDIDO             `);
    console.log("--------------------------------------------------------");
    console.log(`${item.name} - R$ ${item.price}`);
    displayMenu();
    res.json({ message: `${itemName} adicionado ao pedido.` });
  } else {
    console.log(`Erro: Item "${itemName}" não encontrado.`);
    res.status(404).json({ message: `${itemName} não encontrado.` });
  }
});

// Iniciar um novo pedido
app.post("/order/start", (req, res) => {
  orderHandler.startOrder();
  console.log("--------------------------------------------------------");
  console.log("                    NOVO PEDIDO INICIADO                ");
  console.log("--------------------------------------------------------");
  res.json({ message: "Novo pedido iniciado." });
});

// Finalizar pedido e processar pagamento
app.post("/order/finish", (req, res) => {
  const { paymentType } = req.body;
  const total = orderService.getCurrentTotal();
  orderHandler.finalizeOrder(paymentType);

  console.log("--------------------------------------------------------");
  console.log("                  PEDIDO FINALIZADO                     ");
  console.log("--------------------------------------------------------");
  console.log(`Total: R$ ${total.toFixed(2)}`);
  console.log(
    `Tipo de pagamento: ${paymentType === "pix" ? "Pix" : "Cartão de Crédito"}`
  );
  console.log("--------------------------------------------------------");

  // Exibe os itens do pedido
  console.log("                      ITENS DO PEDIDO                   ");
  console.log("--------------------------------------------------------");
  orderService.getOrderItems().forEach((item) => {
    console.log(`${item.name} - R$ ${item.price}`);
  });

  res.json({
    message: "Pedido finalizado com sucesso.",
    total,
    paymentType: paymentType === "pix" ? "Pix" : "Cartão de Crédito",
  });
});

app.listen(port, () => console.log(`API rodando na porta ${port}`));
