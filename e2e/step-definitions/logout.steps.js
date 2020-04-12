const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/logout.feature');
const puppeteer = require('puppeteer');
let browser = null;
let page = null;

defineFeature(feature, test => {

	beforeEach(async () => {
    jest.setTimeout(2000000);  
	})
	
  test('We want to logout', ({ given, when, then }) => {
    
    given('The application page', async() => {
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
    });

    when('We press Logout', async () => {
      await page.waitFor(2000);
      await expect(page).toClick('div > div > section > nav > div > button', { id: "logoutButton" });
    });

    then('I expect to be in the Log In page', async () => {
      await page.waitFor(2000);
      await expect(page).toMatchElement('h2', { text: 'Bienvenido a ViaDe_ES1C' })
    });

  }); 

});