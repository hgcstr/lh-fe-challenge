export default class ShoppingCartPage {
  constructor(page) {
    this.page = page;
  }

  async getPriceUnit() {
    const priceUnit = await this.page
      .locator("td.cart_unit ul.price li.price.special-price")
      .innerText();
    console.log(priceUnit);
    return priceUnit;
  }

  async getQty() {
    const qty = await this.page
      .locator("td.cart_quantity.text-center input.cart_quantity_input")
      .getAttribute("value");
    return qty;
  }

  async getTotalItemPrice() {
    const totalItemPrice = await this.page
      .locator("td.cart_total .price")
      .innerText();
    return totalItemPrice;
  }

  async clickProceedToCheckout() {
    await this.page.getByRole("link", { name: "Proceed to checkout" }).click();
  }
}
