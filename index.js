const { Builder, By, Key, until } = require("selenium-webdriver");

const url = "http://artistviet.vicoders.com/";

const TestCase = [{ id: 1, email: "admin@vietartist.com", password: "secret", expected: "Login Success" }, { id: 2, email: "admin@abc.com", password: "secret", expected: "Email not found" }];

let test = async user => {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get(url);

  await driver.findElement(By.css("#signin")).click();

  await driver.wait(until.elementLocated(By.css("#email")), 10000);

  await driver.findElement(By.css("#email")).sendKeys(user.email);

  await driver.findElement(By.css("#password")).sendKeys(user.password, Key.RETURN);

  await driver.wait(until.elementsLocated(By.css("#nf-notify")));

  let text = await driver.findElement(By.css("#nf-notify > div > span")).getText();

  if (text !== user.expected) {
    throw `Testcase ${user.id} Fail`;
  }
};

TestCase.forEach(item => test(item));
