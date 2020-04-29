const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./e2e/features/addFriends.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;


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
    });

    and("Click in the NavBar to friends", async () => {
      await expect(page).toMatchElement("div > div > section > nav > div > a", { id: "navBarFriends", waitUntil: "load", timeout: 0});
      
      await page.evaluate(() => {
        let links = [...document.querySelectorAll("a")];
        links.forEach(function (a) {
          if (a.id === "navBarFriends"){
            a.click();
          }  
        });
       });
      await expect(page).toMatchElement("h2", { id: "friendsTitle" });
    });

    when("We enter a WebId", async () => {
      await page.waitFor(500);
      await page.type("[id='friendId']", "https://sandracast.solid.community/profile/card#me", {visible: true, waitUntil: "load", timeout: 0});   
      await page.waitFor(1500); //Time that it needs to write the WebID
    });

    and("We click the Add button", async () => {
      expect(page).toClick("div > div > section > div > div > div > div > div > div > button", { id: "btnAdd" });
      await page.waitForNavigation({waitUntil: "load", timeout: 0});
    });

    then("I expect the WebId to appear on the friends list", async () => {
      await expect(page).toMatchElement("div > div > section > div > div > div > div > div div > ul > li > input", { id: "friendElementInput" ,waitUntil: "load", timeout: 0});
    });

    and("I delete my new friend", async () => {
      await expect(page).toMatchElement("div > div > section > div > div > div > div > div > div > ul > li > input", { id: "friendElementInput" ,waitUntil: "load", timeout: 0});
      await expect(page).toClick("div > div > section > div > div > div > div > div > div > ul > li > input", { id: "friendElementInput"});

      await expect(page).toMatchElement("div > div > section > div > div > div > div > div > div > button ", { id: "deleteFriend", waitUntil: "load", timeout: 0});

      await page.evaluate(() => {
       let btns = [...document.querySelectorAll("button")];
       btns.forEach(function (btn) {
         if (btn.innerText === "Borrar"){
           btn.click();
         }  
       });
      });
    });
  }); 

});
