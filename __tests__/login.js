import { Builder, By, Key, until, Capabilities } from "selenium-webdriver";

import chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver";

let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);
var driver = new Builder().withCapabilities(Capabilities.chrome()).build();

const login_url = "http://artistviet.vicoders.com/login";

jest.setTimeout(20000);

let TestCases = [
  { testcase: "should reject bad credentials", id: 2, email: "admin@abc.com", password: "secret", expected_message: "Email not found" },
  { testcase: "should accpet correct credentials", id: 1, email: "admin@vietartist.com", password: "secret", expected: "Login Success" }
];

beforeEach(async () => {
  await driver.get(login_url);
  await driver.wait(until.elementLocated(By.css("#email")), 10000);
});

describe("Login", () => {
  TestCases.forEach(item => {
    it(item.testcase, async () => {
      await driver.findElement(By.css("#email")).sendKeys(item.email);
      await driver.findElement(By.css("#password")).sendKeys(item.password, Key.RETURN);
      if (item.id != 1) {
        await driver.wait(until.elementsLocated(By.css("#nf-notify")));
        let message = await driver.findElement(By.css("#nf-notify > div > span")).getText();
        expect(message).toEqual(item.expected_message);
      } else {
        await driver.wait(until.elementsLocated(By.css("#myNavbar > ul > li.dropdown.auth-dropdown > a")));
        let text = await driver.findElement(By.css("#myNavbar > ul > li:nth-child(8) > a")).getText();
        expect("Post your art").toEqual(text);
      }
    });
  });
});
