const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/internationalization.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature((feature), (test) => {

    test("We are login into Viade and we check all views are internationalized",({given,when,then}) => { 

        given("A view", async() => {
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
            expect(popup).toClick("button", { text: "Solid Community" });
            await popup.waitForNavigation({waitUntil: "load", timeout: 0});
            await popup.type("[name='username']", "es1c", {visible: true});
            await popup.type("[name='password']", "Viade_es1c", {visible: true});
            await expect(popup).toClick("button", { text: "Log In" });
            await expect(page).toMatch("Bienvenido", { timeout: 1000 });
        });

        when("The user press the boton Language or Idioma (depending on the language you have selected) and select the other language", async () => {
            await page.waitFor(1000);
            await page.waitForSelector("[id='btnLanguage']", {visible: true});
            expect(page).toClick("div > div > section > nav > div > div > div > button", { id: "btnLanguage" });
            await page.waitFor(1000);
            await page.waitForSelector("[id='btnEng']", {visible: true});
            expect(page).toClick("div > div > section > nav > div > div > div > div > a > div", { id: "btnEng" });
        });
  
        then("All words on the page change will change language to the one selected by the user", async () => {
            await expect(page).toMatch("Welcome", { timeout: 1000 });
        });

        
    });
});