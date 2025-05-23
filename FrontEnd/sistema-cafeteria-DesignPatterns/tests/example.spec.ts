import { test, expect } from "@playwright/test";

test("deve adicionar item ao carrinho", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Marca o primeiro checkbox
  const checkbox = page.locator('input[type="checkbox"]').first();
  await checkbox.check();

  // Modal deve aparecer com o item
  await expect(page.locator("text=Seu Pedido")).toBeVisible();
  await expect(page.locator("text=R$")).toBeVisible();
});

test("deve ir para a tela de pagamento após adicionar item", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");

  const checkbox = page.locator('input[type="checkbox"]').first();
  await checkbox.check();

  // Clica no botão de pagamento
  const botaoPagamento = page.locator('button:has-text("Ir para o Pagamento")');
  await botaoPagamento.click();

  // Verifica que estamos na página de pagamento
  await expect(page.locator("text=Itens do Pedido")).toBeVisible();
});
