const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/addFriends.feature');
const puppeteer = require('puppeteer');
let browser = null;
let page = null;

defineFeature(feature, test => {
    
	beforeEach(async () => {
    jest.setTimeout(2000000);  
	})
	
  test('We want to add a friend', ({ given, when, and, then }) => {

    given('The friends page on the application', async() => {
      let popup;
      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
      })
      page = await browser.newPage();
      await page.goto("http://localhost:3000/#/",{waitUntil: 'load', timeout: 0}); 
      const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));	
      await expect(page).toClick('button', { className: 'btn btn-primary a-solid button-login' });
      popup = await newPagePromise;
      expect(popup).toClick('button', { text: 'Solid Community' });
      await popup.waitForNavigation({waitUntil: 'load', timeout: 0});
      await popup.type("[name='username']", "es1c", {visible: true});
      await popup.type("[name='password']", "Viade_es1c", {visible: true});
      await expect(popup).toClick('button', { text: 'Log In' });
      await expect(page).toMatch("Bienvenido", { timeout: 500 });

      //Friends page:
      page2 = await browser.newPage();
      await page2.goto("http://localhost:3000/#/friends",{waitUntil: 'load', timeout: 0}); 
      await expect(page2).toMatchElement('h2', { id: 'friendsTitle' });
    });

    when('We enter a WebId', async () => {
      page2.type("[id='friendId']", "https://sandracast.solid.community", {visible: true});   
      await page.waitFor(1000);
    });

    and('We click the Add button', async () => {
      expect(page2).toClick('div > div > section > div > div > div > div > button', { id: 'add' });
      await page2.waitForNavigation({waitUntil: 'load', timeout: 0});
    });

    then('I expect the WebId to appear on the friends list', async () => {
      await page.waitFor(1000);
      await expect(page2).toMatchElement('div > div > section > div > div > div > div > ul > li', { name: 'listFriend' });
    });

    and('I delete my new friend', async () => {
      expect(page2).toClick('div > div > section > div > div > div > div > ul > li > input', { class: 'radio' });
      await page2.waitFor(1500);

      await page2.evaluate(() => {
        let btns = [...document.querySelectorAll("button")];
        btns.forEach(function (btn) {
          if (btn.innerText == "Borrar"){
            btn.click();
          }  
        });
      });
      await page2.waitFor(500);
    });
  }); 

});
