const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/login.feature');
const puppeteer = require('puppeteer');
let browser = null;
let page = null;

defineFeature(feature, test => {
	
	beforeEach(async () => {
    jest.setTimeout(2000000);
	})
	
  test('We want to login into Viade', ({ given, when, then, and }) => {
    let popup;
    given('The login page', async() => {
    
      browser = await puppeteer.launch({
        headless: false
      })

      page = await browser.newPage();
      await page.goto("http://localhost:3000/#/",{waitUntil: 'load', timeout: 0}); 
    });

    when('We press Iniciar Sesion', async () => {
      
      //Acceso a la primera parte del popup correcto
      const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));	
      await expect(page).toClick('button', { className: 'btn btn-primary a-solid button-login' });
      popup = await newPagePromise;

      expect(popup).toClick('button', { text: 'Solid Community' });
      //------------------------------------------

      //----Ahora el popup redirecciona y falla:

      //1. Esto debería funcionar
      await popup.waitFor(500);
      await popup.type("[name='username']", "es1c", {visible: true});
      await popup.type("[name='password']", "Viade_es1c", {visible: true});
      await expect(popup).toClick('button', { text: 'Log In' });
      
      //2.Accediendo desde otra pestaña nos lleva a al pod de solid en vez de a ViaDe -> mal
      // page2 = await browser.newPage();
      // page2.goto("https://solid.community/login");
      // await page2.waitFor(500);
      // await page2.type("[name='username']", "es1c", {visible: true});
      // await page2.type("[name='password']", "Viade_es1c", {visible: true});
      // await expect(page2).toClick('button', { text: 'Log In' });
    });

    then('I expect a new window to appear', async () => {
      //await page2.waitFor(500);
      // expect(page.url()).toBe("http://localhost:3000/#/welcome")

    });

    and('After introducing the solidCommunity user to be loged in', async() => {
      //await expect(page).toMatch("Welcome", { timeout: 500 });
    });
  }); 

});