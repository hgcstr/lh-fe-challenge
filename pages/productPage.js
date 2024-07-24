export default class ProductPage {
  constructor(page) {
    this.page = page;
  }

  async selectSize(size) {
    await this.page.waitForTimeout(1000);
    await this.page.locator("#group_1").selectOption(size);
  }

  async addToCart() {
    await this.page.locator("#add_to_cart").click();
  }

  async getProductAddedToCartLabel() {
    const productAddedToCartLabel = await this.page.getByText(
      "Product successfully added to your shopping cart"
    );

    await productAddedToCartLabel.waitFor({ state: "visible" });
    return productAddedToCartLabel;
  }

  async proceedToCheckout() {
    await this.page.getByRole("link", { name: "Proceed to checkout" }).click();
  }

  //   await expect(productAddedToCartLabel).toBeVisible();

  //   // await page.locator(".btn btn-default button button-medium").click();
}
