const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/shareRoute.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;
let page2 = null;

defineFeature(feature, test => {
    //Raquel is already my friend
    //We have routes
    test("We want to share a route with a friend",({given,when,and,then}) =>{

        given("The share route page on the application", async() => {

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
            await popup.type("[name='username']", "sandracast", {visible: true});
            await popup.type("[name='password']", "Viade_sandra1", {visible: true});
            await expect(popup).toClick("button", { text: "Log In" });
            await expect(page).toMatch("Bienvenido", { waitUntil: "load", timeout: 0 });
        });

        when("We select a route from the combo", async () => {
            //First route available is already selected
            page2 = await browser.newPage();
            await page2.goto("http://localhost:3000/#/share",{waitUntil: "load", timeout: 0}); 

            //We select to share with friends
            //Friend option is already selected
            //Cargar rutas y contactos
            await expect(page2).toMatchElement("div > div > section > div > div > div > button", { id: "btnLoad" ,waitUntil: "load", timeout: 0, visible: true});
            await expect(page2).toClick("div > div > section > div > div > div > button", { id: "btnLoad" });
        });

        and("We select a friend", async () => {
            //Raquel is the only friend
            await expect(page2).toMatchElement("div > div > section > div > div > form > div > ul > li > input", { class: "ck" ,waitUntil: "load", timeout: 0, visible: true});
            await expect(page2).toClick("div > div > section > div > div > form > div > ul > li > input", { class: "ck" });
        });

        and("We click the Share button", async () => {
            await expect(page2).toMatchElement("div > div > section > div > div > form > div > button", { id: "btnShare" ,waitUntil: "load", timeout: 0, visible: true});
            await expect(page2).toClick("div > div > section > div > div > form > div > button", { id: "btnShare" });
        });
  
        then("I expect that the route has been shared", async () => {
            //Mensaje de aviso

        });
    });
});
