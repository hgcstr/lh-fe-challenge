//npx playwright codegen
//npx playwright test --project=chromium --headed
//npx playwright show-report
import { test, expect } from "@playwright/test";
import {
  generateRandomUserData,
  convertPriceToNumber,
} from "../utilities/utils";
import AuthenticationPage from "../pages/authenticationPage";
import AccountCreationPage from "../pages/accountCreationPage";
import HomePage from "../pages/homePage";
import ProductPage from "../pages/productPage";
import ShoppingCartPage from "../pages/shoppingCart";

let userData;
test.describe("Login, search and checkout tests", () => {
  test.beforeAll(async ({}) => {
    userData = generateRandomUserData();
  });

  test("1. Registration - Succesful", async ({ page }) => {
    await page.goto("?controller=authentication&back=my-account");

    const authenticationPage = new AuthenticationPage(page);
    const accountCreationPage = new AccountCreationPage(page);
    await authenticationPage.createNewAccount(userData.email);
    await accountCreationPage.submitForm(
      userData.firstName,
      userData.lastName,
      userData.password
    );
    const accountCreatedLabel = await page.getByText(
      "Your account has been created."
    );

    await expect(accountCreatedLabel).toBeVisible();
  });

  test("2. Search product - Succesful", async ({ page }) => {
    await page.goto("/");
    const homePage = new HomePage(page);

    await homePage.searchProduct(userData.productName);
    const linkProduct = await homePage.getProductLink(userData.productName);
    await expect(linkProduct).toBeVisible();
  });

  test("3. Checkout - Successful", async ({ page }) => {
    await page.goto(
      "/index.php?id_product=7&controller=product&search_query=chiffon&results=2"
    );

    const productPage = new ProductPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    const authenticationPage = new AuthenticationPage(page);

    await productPage.selectSize(userData.size);
    await productPage.addToCart();

    expect(await productPage.getProductAddedToCartLabel()).toBeVisible();

    await productPage.proceedToCheckout();

    //Shopping Cart Page
    const productPriceUnit = await shoppingCartPage.getPriceUnit();

    const qty = await shoppingCartPage.getQty();

    const totalItemPrice = await shoppingCartPage.getTotalItemPrice();

    expect(productPriceUnit.replace("$", "") * qty).toBe(
      parseFloat(totalItemPrice.replace("$", ""))
    );

    await shoppingCartPage.clickProceedToCheckout();

    //Authentincation page
    await authenticationPage.login(userData.email, userData.password);

    ///Your Address Page
    await page.locator("#address1").fill(userData.address);
    await page.locator("#city").fill(userData.city);

    await page.locator("#id_state").selectOption(userData.city);
    await page.locator("#postcode").fill(userData.zipCode);

    await page.locator("#phone").fill(userData.phone);
    await page.locator("#submitAddress").click();

    await page.getByRole("button", { name: "Proceed to checkout" }).click();

    //SHIPPING:
    await page.locator("#cgv").check();
    const deliveryOptionPriceDiv = await page
      .locator(".delivery_option_price")
      .nth(1)
      .innerText();

    console.log(deliveryOptionPriceDiv);

    await page.getByRole("button", { name: "Proceed to checkout" }).click();

    ///PLEASE CHOOSE YOUR PAYMENT METHOD Page
    await page.locator(".bankwire").click();

    //ORDER SUMMARY Page
    const totalPayment = await page.locator("#amount").innerText();
    console.log(totalPayment);

    await page.getByRole("button", { name: "I confirm my order" }).click();

    const orderCompleteLabel = await page.getByText(
      "Your order on My Shop is complete."
    );
    await expect(orderCompleteLabel).toBeVisible();
  });
});
