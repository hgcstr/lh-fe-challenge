export default class AuthenticationPage {
  constructor(page) {
    this.page = page;
  }
  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSubmitLogin();
  }

  async createNewAccount(email) {
    await this.enterCreateEmail(email);
    await this.clickCreate();
  }
  async enterCreateEmail(email) {
    await this.page.locator("#email_create").fill(email);
  }

  async clickCreate() {
    await this.page.locator("#SubmitCreate").click();
  }

  async enterEmail(email) {
    await this.page.locator("#email").fill(email);
  }

  async enterPassword(password) {
    await this.page.locator("#passwd").fill(password);
  }

  async clickSubmitLogin(password) {
    await this.page.locator("#SubmitLogin").click();
  }
}
