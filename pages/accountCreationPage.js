export default class AccountCreationPage {
  constructor(page) {
    this.page = page;
  }

  async submitForm(firstName, lastName, password) {
    await this.fillAccountForm(firstName, lastName, password);
    await this.clickSubmitAccount();
  }

  async fillAccountForm(firstName, lastName, password) {
    await this.page.locator("#customer_firstname").fill(firstName);
    await this.page.locator("#customer_lastname").fill(lastName);
    await this.page.locator("#passwd").fill(password);
  }

  async clickSubmitAccount() {
    await this.page.locator("#submitAccount").click();
  }
}
