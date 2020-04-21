const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/loadCombo.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;
let page2 = null;


defineFeature((feature), (test) => {
	
  test("There are some routes on the POD", ({ given, when, then, and }) => {

    given("The Visualize page", async() => {
      let popup;
      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
      });
      page = await browser.newPage();
      await page.goto("http://localhost:3000/#/",{waitUntil: "load", timeout: 0}); 
      const newPagePromise = new Promise((x) => browser.once(("targetcreated"), (target) => x(target.page())));	
      await expect(page).toClick("button", { className: "btn btn-primary a-solid button-login" });
      popup = await newPagePromise;
      await expect(popup).toMatchElement("button", { text: "Solid Community", waitUntil: "load", timeout: 0, visible: true});
      await expect(popup).toClick("button", { text: "Solid Community" });
      await popup.waitForNavigation({waitUntil: "load", timeout: 0});
      await popup.type("[name='username']", "es1c", {visible: true});
      await popup.type("[name='password']", "Viade_es1c", {visible: true});
      await expect(popup).toClick("button", { text: "Log In" });
      await expect(page).toMatch("Bienvenido", {waitUntil: "load", timeout: 0});

      //Visualize page:
      page2 = await browser.newPage();
      await page2.goto("http://localhost:3000/#/visualize",{waitUntil: "load", timeout: 0}); 
      await expect(page2).toMatchElement("h1", { id: "MisRutas", waitUntil: "load", timeout: 0 });
    });

    when("I press the button Cargar rutas del POD", async () => {
        await expect(page2).toClick("div > div > section > div > div > div > div > div > button", { id: "loadButton" });
    });

    then("I expect the comboBox to be filled", async () => {
      await expect(page2).toMatch("rutaDePrueba1", {waitUntil: "load", timeout: 0});
    });

    and("I expect the comboBox to have the same amount of routes as the POD", async() => {
      expect(page2).toClick("select", { id: "selectRoute" });
      expect(page2).toMatch("rutaDePrueba1");
      expect(page2).toMatch("rutaDePrueba2");
      expect(page2).toMatch("rutaDePrueba3");
      expect(page2).toMatch("rutaDePrueba4");
      expect(page2).toMatch("rutaDePrueba6");
      expect(page2).toMatch("rutaDePrueba6");
    });
  }); 

});