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
        });

        and("Click in the NavBar to download", async () => {
          await expect(page).toMatchElement("div > div > section > nav > div > a", { id: "navBarDownload", waitUntil: "load", timeout: 0});

          await page.evaluate(() => {
            let links = [...document.querySelectorAll("a")];
            links.forEach(function (a) {
              console.log(a);
              if (a.id === "navBarDownload"){
                a.click();
              }  
            });
           });
          await expect(page).toMatchElement("h2", { id: "downloadTitle" });
        });

        when("We enter a name of the file that we want to download", async () => {
          await page.type("[id='txtUrl']", "rutaDePrueba1", {visible: true, waitUntil: "load", timeout: 0});   
          await page.waitFor(1500); //Time that it needs to write the url
        });

        and("We click to the button", async () => {
          expect(page).toClick("div > div > section > div > div > div > button", { id: "btnDownload" });
        });

        then("I expect a message to be shown", async () => {
          // Mensaje de aviso
        });
    });
});