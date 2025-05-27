import { test, expect } from "@playwright/test";

test("deve ir para a tela de pagamento após adicionar item", async ({
  page,
}) => {
  await page.goto("http://localhost:4173/");

  const checkbox = page.locator('input[type="checkbox"]').first();
  await checkbox.check();

  // Clica no botão de pagamento
  const botaoPagamento = page.locator('button:has-text("Ir para o Pagamento")');
  await botaoPagamento.click();

  // Verifica que estamos na página de pagamento
  await expect(page.locator("text=Itens do Pedido")).toBeVisible();
});

test("deve marcar e desmarcar um checkbox de produto", async ({ page }) => {
  await page.goto("http://localhost:4173/");

  const checkbox = page.locator('input[type="checkbox"]').first();

  await checkbox.check();
  await expect(checkbox).toBeChecked();

  await checkbox.uncheck();
  await expect(checkbox).not.toBeChecked();
});

test("deve realizar um pagamento via PIX", async ({ page }) => {
  await page.goto("http://localhost:4173/");

  const checkbox = page.locator('input[type="checkbox"]').first();

  await checkbox.check();
  await expect(checkbox).toBeChecked();

  const botaoPagamento = page.locator('button:has-text("Ir para o Pagamento")');
  await botaoPagamento.click();

  await expect(page.locator("text=Itens do Pedido")).toBeVisible();

  const botaoPagarComPix = page.locator('button:has-text("Pix")');
  await botaoPagarComPix.click();

  const botaoFinalizarPedido = page.locator(
    'button:has-text("Finalizar Pedido")'
  );
  await botaoFinalizarPedido.click();
  await expect(page.getByText("Salgado")).toBeVisible();
});

test("deve descartar um pedido", async ({ page }) => {
  await page.goto("http://localhost:4173/");

  const checkbox = page.locator('input[type="checkbox"]').first();

  await checkbox.check();
  await expect(checkbox).toBeChecked();

  const botaoDescartarPedido = page.locator('button:has-text("Descartar")');
  await botaoDescartarPedido.click();
  await expect(checkbox).not.toBeChecked();
  await expect(
    page.locator("text=Nenhum item adicionado. Adicione itens ao seu pedido!")
  ).not.toBeVisible();
});

test("deve comprar um Pastel, um sorvete e uma água via cartão de crédito", async ({
  page,
}) => {
  await page.goto("http://localhost:4173/");
  const checkboxPastel = page.locator('input[type="checkbox"]#Pastel');
  const checkboxSorvete = page.locator('input[type="checkbox"]#Sorvete');
  const checkboxAgua = page.locator('input[type="checkbox"]#Água');

  await checkboxPastel.check();
  await checkboxSorvete.check();
  await checkboxAgua.check();

  await expect(checkboxPastel).toBeChecked();
  await expect(checkboxAgua).toBeChecked();
  await expect(checkboxSorvete).toBeChecked();

  await expect(page.getByText("Seu Pedido")).toBeVisible();
  await expect(page.getByText("Total: R$ 16,00")).toBeVisible();

  const BtnPagamento = page.locator('button:has-text("Ir para o Pagamento")');
  await BtnPagamento.click();
  // await expect(page.goto("http://localhost:5173/payment"));
  await expect(page.getByText("Itens do Pedido")).toBeVisible();
  await expect(page.getByText("Escolha a forma de Pagamento:")).toBeVisible();

  const botaoPagarComCartao = page.locator(
    'button:has-text("Cartão de Crédito")'
  );
  await botaoPagarComCartao.click();
  const botaoFinalizarPedido = page.locator(
    'button:has-text("Finalizar Pedido")'
  );
  await botaoFinalizarPedido.click();
  await expect(
    page.getByText("Nenhum item adicionado. Adicione itens ao seu pedido!")
  ).toBeVisible();
});
