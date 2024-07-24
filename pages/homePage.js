export default class HomePage {
  constructor(page) {
    this.page = page;
  }

  async searchProduct(product) {
    await this.page.locator("#search_query_top").fill(product);
    await this.page.getByRole("button", { name: "" }).click();
  }

  async getProductLink(product) {
    const productLink = this.page
      .locator(".right-block")
      .locator("a.product-name", {
        hasText: product,
      });
    return productLink;
  }
}
