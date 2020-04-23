const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/download.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;
let page2 = null;


defineFeature((feature), (test) => {

    test("We want to download route file from the Pod", ({ given, when, and, then }) => {

        given("Go to the download routes page", async() => {
          let popup;
          browser = await puppeteer.launch({
            headless: false,
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

          //Friends page:
          page2 = await browser.newPage();
          await page2.goto("http://localhost:3000/#/download",{waitUntil: "load", timeout: 0}); 
          await expect(page2).toMatchElement("h2", { id: "downloadTitle" });
        });

        when("We enter a name of the file that we want to download", async () => {
          await page2.type("[id='txtUrl']", "rutaDePrueba1", {visible: true, waitUntil: "load", timeout: 0});   
          await page2.waitFor(1500); //Tiempo que tarda en escribir los datos del formulario el test
        });

        and("We click to the button", async () => {
          expect(page2).toClick("div > div > section > div > div > div > button", { id: "btnDownload" });
        });

        then("I expect a message to be shown", async () => {
          
        });
    });
});