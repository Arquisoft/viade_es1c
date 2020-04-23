const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/visualizeRoute.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


defineFeature((feature), (test) => {
	
  test("There are some routes on the POD", ({ given, when, then, and }) => {

    given("the 'Visualize' page", async() => {
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
      //page2 = await browser.newPage();
      //await page2.goto("http://localhost:3000/#/visualize",{waitUntil: "load", timeout: 0}); 
      //await expect(page2).toMatchElement("h1", { id: "MisRutas", waitUntil: "load", timeout: 0 });

      await expect(page).toMatchElement("div > div > section > nav > div > a", { id: "navBarVisualize", waitUntil: "load", timeout: 0});
      //await page.waitFor(2000);
      await page.evaluate(() => {
        let links = [...document.querySelectorAll("a")];
        links.forEach(function (a) {
          console.log(a);
          if (a.id === "navBarVisualize"){
            a.click();
          }  
        });
       });
    });


    when("I press the button 'Cargar rutas del POD'", async () => {
        await expect(page).toClick("div > div > section > div > div > div > div > div > button", { id: "loadButton" });
    });

    then("I expect the comboBox to be filled", async () => {
      await expect(page).toMatch("rutaDePrueba1", {waitUntil: "load", timeout: 0});
    });

    and("I expect the comboBox to have the same amount of routes as the POD", async() => {
      expect(page).toClick("select", { id: "selectRoute" });
      expect(page).toMatch("rutaDePrueba1");
      expect(page).toMatch("rutaDePrueba2");
      expect(page).toMatch("rutaDePrueba3");
      expect(page).toMatch("rutaDePrueba4");
      expect(page).toMatch("rutaDePrueba6");
      expect(page).toMatch("rutaDePrueba6");
    });
  });







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

      //Visualize page:
      //page2 = await browser.newPage();
      //await page2.goto("http://localhost:3000/#/visualize",{waitUntil: "load", timeout: 0}); 
      //await expect(page2).toMatchElement("h1", { id: "MisRutas", waitUntil: "load", timeout: 0 });

      await expect(page).toMatchElement("div > div > section > nav > div > a", { id: "navBarVisualize", waitUntil: "load", timeout: 0});
      //await page.waitFor(2000);
      await page.evaluate(() => {
        let links = [...document.querySelectorAll("a")];
        links.forEach(function (a) {
          console.log(a);
          if (a.id === "navBarVisualize"){
            a.click();
          }  
        });
       });




      //I press the button 'Cargar rutas del POD'
      await expect(page).toClick("div > div > section > div > div > div > div > div > button", { id: "loadButton" });

      //I expect the comboBox to be filled
      await expect(page).toMatch("rutaDePrueba1", {waitUntil: "load", timeout: 0});

      //I expect the comboBox to have the same amount of routes as the POD
      expect(page).toClick("select", { id: "selectRoute" });
      expect(page).toMatch("rutaDePrueba1");
      expect(page).toMatch("rutaDePrueba2");
      expect(page).toMatch("rutaDePrueba3");
      expect(page).toMatch("rutaDePrueba4");
      expect(page).toMatch("rutaDePrueba6");
      expect(page).toMatch("rutaDePrueba6");
    });

    when("I press the button 'Visualizar'", async () => {
      await expect(page).toClick("div > div > section > div > div > div > div > div > button", { id: "visualizeRouteButton" });
    });

    then("I expect the elevation diagram to appear", async () => {
      //await expect(page).toMatch("Perfil de elevación:", {waitUntil: "load", timeout: 0});
      await expect(page).toMatchElement("h4", { id: "h4PerfilElevacion", waitUntil: "load", timeout: 0 });
    });

  }); 

});