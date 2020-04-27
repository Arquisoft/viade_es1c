const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/createGroup.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


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
      await popup.type("[name='username']", "sandracast", {visible: true});
      await popup.type("[name='password']", "Viade_sandra1", {visible: true});
      await expect(popup).toClick("button", { text: "Log In" });
      await expect(page).toMatch("Bienvenido", { waitUntil: "load", timeout: 0 });
    });

    and("Click in the NavBar to friend", async () => {
      await expect(page).toMatchElement("div > div > section > nav > div > a", { id: "navBarFriends", waitUntil: "load", timeout: 0});
      
      await page.evaluate(() => {
        let links = [...document.querySelectorAll("a")];
        links.forEach(function (a) {
          if (a.id === "navBarFriends"){
            a.click();
          }  
        });
       });
    });

    when("We enter a group name", async () => {
      await page.type("[id='groupId']", "GrupoPrueba", {visible: true, waitUntil: "load", timeout: 0});   
      await page.waitFor(1500); ///Time that it needs to write the name of the group
    });

    and("We select the friends that we want", async () => {
      await page.evaluate(() => {
        let btns = [...document.querySelectorAll("input")];
        let n=0;
        btns.forEach(function (btn) {
          if (n === 3) {
            btn.click();
          }  
          n++;
        });
       });
    });

    then("I press the button to create de group", async () => {
      await page.evaluate(() => {
        let btns = [...document.querySelectorAll("button")];
        btns.forEach(function (btn) {
          if (btn.innerText === "Crear grupo"){
            btn.click();
          }  
        });
      });
    });


  }); 

});
