const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/logout.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


defineFeature((feature), (test) => {

	
  test("We want to logout", ({ given, when, then }) => {
    
    given("The application page", async() => {
      let popup;
      browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null
      });
      page = await browser.newPage();
      await page.goto("http://localhost:3000/#/",{waitUntil: "load", timeout: 0}); 
      const newPagePromise = new Promise((x) =>  browser.once(("targetcreated"), (target) => x(target.page())));	
      await expect(page).toClick("button", { className: "btn btn-primary a-solid button-login" });
      popup = await newPagePromise;
      await expect(popup).toMatchElement("button", { text: "Solid Community", waitUntil: "load", timeout: 0, visible: true});
      await expect(popup).toClick("button", { text: "Solid Community" });
      await popup.waitForNavigation({waitUntil: "load", timeout: 0});
      await popup.type("[name='username']", "es1c", {visible: true});
      await popup.type("[name='password']", "Viade_es1c", {visible: true});
      await expect(popup).toClick("button", { text: "Log In" });
      await expect(page).toMatch("Bienvenido", { waitUntil: "load", timeout: 0 });
    });

    when("We press Logout", async () => {
      await expect(page).toMatchElement("div > div > section > nav > div > button", { id: "logoutButton" ,waitUntil: "load", timeout: 0, visible: true});
      await expect(page).toClick("div > div > section > nav > div > button", { id: "logoutButton" });
    });
  
    then("I expect to be in the Log In page", async () => {
      await expect(page).toMatchElement("h2", { text: "Bienvenido a ViaDe_ES1C" ,waitUntil: "load", timeout: 0});
    });

  }); 

});