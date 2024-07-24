const { faker } = require("@faker-js/faker");

function generateRandomUserData() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    email: Math.floor(Math.random() * 100) + faker.internet.email(),
    password: faker.internet.password(),
    city: "Illinois",
    zipCode: "11111",
    phone: "123456789",
    productName: "Printed Chiffon Dress",
    size: "L",
  };
}

function convertPriceToNumber(priceString) {
  let numericString = priceString.replace("$", "");
  return parseFloat(numericString);
}
module.exports = { generateRandomUserData, convertPriceToNumber };

// await page.locator("#address1").fill("Fictional Address 12");
// await page.locator("#city").fill("Chicago");

// await page.locator("#id_state").selectOption("Illinois");
// await page.locator("#postcode").fill("12345");

// await page.locator("#phone").fill("12345678");
// await page.locator("#submitAddress").click();

// Printed Chiffon Dress
