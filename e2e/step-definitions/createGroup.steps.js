const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/createGroup.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;
let page2 = null;


defineFeature((feature), (test) => {

  test("We want create a group of friends", ({ given, when, and, then }) => {

    given("The friends page on the application", async() => {
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
      await page2.goto("http://localhost:3000/#/friends",{waitUntil: "load", timeout: 0}); 
      await expect(page2).toMatchElement("h2", { id: "friendsTitle" });
    });

    when("We enter a group name", async () => {
      //await page2.type("[id='friendId']", "https://sandracast.solid.community/profile/card#me", {visible: true, waitUntil: "load", timeout: 0});   
      //await page2.waitFor(1500); //Tiempo que tarda en escribir los datos del formulario el test
    });

    and("We select the friends that we want", async () => {
      
    });

    then("I press the button to create de group", async () => {
      
    });


  }); 

});
