const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/login.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


defineFeature((feature), (test) => {

	
  test("We want to login into Viade", ({ given, when, then}) => {
    let popup;

    given("The login page", async() => {
      browser = await puppeteer.launch({
        headless: false
      });
      page = await browser.newPage();
      await page.goto("http://localhost:3000/#/",{waitUntil: "load", timeout: 0}); 
    });

    when("We press Iniciar Sesion and enter our information", async () => {

      const newPagePromise = new Promise((x) => {browser.once("targetcreated", target => x(target.page()))});	
      await expect(page).toClick("button", { className: "btn btn-primary a-solid button-login" });
      popup = await newPagePromise;

      expect(popup).toClick("button", { text: "Solid Community" });
      await popup.waitForNavigation({waitUntil: "load", timeout: 0});

      await popup.type("[name='username']", "es1c", {visible: true});
      await popup.type("[name='password']", "Viade_es1c", {visible: true});
      await expect(popup).toClick("button", { text: "Log In" });
    });

    then("I expect to be on the Welcome page of ViaDe", async () => {
      await expect(page).toMatch("Bienvenido", { timeout: 500 });
    });

  }); 

});