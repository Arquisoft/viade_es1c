const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/visualizeRoute.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


defineFeature((feature), (test) => {
	
  test("There are some routes on the comboBox", ({ given, when, then, and }) => {

    given("the 'Visualize' page with the comboBox filled", async() => {
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

      await expect(page).toMatchElement("div > div > section > nav > div > a", { id: "navBarVisualize", waitUntil: "load", timeout: 0});

      await page.evaluate(() => {
        let links = [...document.querySelectorAll("a")];
        links.forEach(function (a) {
          if (a.id === "navBarVisualize"){
            a.click();
          }  
        });
       });

      await expect(page).toMatchElement("h1", { id: "MisRutas", waitUntil: "load", timeout: 0 });

      //I press the button 'Cargar rutas del POD'
      await expect(page).toMatchElement("div > div > section > div > div > div > div > div > button", { id: "loadButton", waitUntil: "load", timeout: 0, visible: true });
      await expect(page).toClick("div > div > section > div > div > div > div > div > button", { id: "loadButton" });

      //I expect the comboBox to be filled
      await expect(page).toMatch("rutaDePrueba1", {waitUntil: "load", timeout: 0});
    });

    when("I press the button 'Visualizar'", async () => {
      await expect(page).toMatchElement("div > div > section > div > div > div > div > div > div > button", { id: "visualizeRouteButton", waitUntil: "load", timeout: 0, visible: true });
      await expect(page).toClick("div > div > section > div > div > div > div > div > div > button", { id: "visualizeRouteButton" });
    });

    then("I expect the elevation diagram to appear", async () => {
      await expect(page).toMatchElement("h4", { id: "h4PerfilElevacion", waitUntil: "load", timeout: 0 });
    });

  }); 

});