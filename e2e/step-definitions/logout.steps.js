const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/logout.feature');
const puppeteer = require('puppeteer');
let browser = null;
let page = null;

defineFeature(feature, test => {
    
	beforeEach(async () => {
    //jest.setTimeout(2000000);  
	})
	
  test('We want to logout', ({ given, when, then }) => {

    given('The application page', async() => {
      browser = await puppeteer.launch({
        headless: false
      })
      page = await browser.newPage();
      //await page.goto("http://localhost:3000/#/welcome",{waitUntil: 'load', timeout: 0}); 
      
      await expect(page).toMatchElement('h2', { text: 'Welcome to ViaDe_ES1C' });
    });

    when('We press Logout', async () => {
      await expect(page).toClick('button', { className: 'logout btn btn-light' });
    });

    then('I expect to be in the Log In page', async () => {
      await expect(page).toMatchElement('h2', { text: 'Welcome to ViaDe_ES1C' })
    });

  }); 

});