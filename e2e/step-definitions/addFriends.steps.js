const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/addFriends.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;
let page2 = null;


defineFeature((feature), (test) => {

  test("We want to add a friend", ({ given, when, and, then }) => {

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

    when("We enter a WebId", async () => {
      await page2.type("[id='friendId']", "https://sandracast.solid.community/profile/card#me", {visible: true, waitUntil: "load", timeout: 0});   
      await page2.waitFor(1500); //Tiempo que tarda en escribir los datos del formulario el test
    });

    and("We click the Add button", async () => {
      expect(page2).toClick("div > div > section > div > div > div > div > div > div > button", { id: "btnAdd" });
      await page2.waitForNavigation({waitUntil: "load", timeout: 0});
    });

    then("I expect the WebId to appear on the friends list", async () => {
      await expect(page2).toMatchElement("div > div > section > div > div > div > div > div div > ul > li > input", { id: "friendElementInput" ,waitUntil: "load", timeout: 0});
    });

    and("I delete my new friend", async () => {
      //Nueva versión
      await expect(page2).toMatchElement("div > div > section > div > div > div > div > div div > ul > li > input", { id: "friendElementInput" ,waitUntil: "load", timeout: 0});
      //console.log("Lo encuentra");
      await expect(page2).toClick("div > div > section > div > div > div > div > div div > ul > li > input", { id: "friendElementInput"});
      //console.log("Hace click");
      
      //Busca boton borrar
      await expect(page2).toMatchElement("div > div > section > div > div > div > div > div > div > button ", { id: "deleteFriend", waitUntil: "load", timeout: 0});
      //console.log("Encuentra el borrar");
      //await page2.waitFor(1500);
      //await expect(page2).toClick("div > div > section > div > div > div > div > div > div > button ", { id: "deleteFriend", className:"correct-margin"});
      //console.log("Click en el borrar");
      //await page2.waitFor(1500);
      //Fin nueva versión

      //await expect(page2).toMatchElement("div > div > section > div > div > div > div > div > div > ul > li > input", { name: "friend" ,waitUntil: "load", timeout: 0, visible: true});
      //await expect(page2).toClick("div > div > section > div > div > div > div > div > div > ul > li > input", { name: "friend" });

      //Así no, con bucle funciona
      //await expect(page2).toMatchElement("div > div > section > div > div > div > div > button", { id: "delete", waitUntil: "load", timeout: 0});
      //await expect(page2).toClick("div > div > section > div > div > div > div > button", { id: "delete" });

      await page2.evaluate(() => {
       let btns = [...document.querySelectorAll("button")];
       btns.forEach(function (btn) {
         if (btn.innerText === "Borrar"){
           btn.click();
         }  
       });
      });
      await page2.waitFor(1500);
    });
  }); 

});
