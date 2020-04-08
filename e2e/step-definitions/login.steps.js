const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/login.feature');

defineFeature(feature, test => {
	
	beforeEach(async () => {
    await page.goto('http://localhost:3000');
    
	})
	
  test('We want to login into Viade', ({ given, when, then, and }) => {

    let popup;

    given('The login page', async() => {
      await expect(page).toMatchElement('h2', { text: 'Welcome to ViaDe_ES1C' })
    });

    when('We press Iniciar Sesion', async () => {
      const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));	
      await expect(page).toClick('button', { text: 'Log In' });
      popup = await newPagePromise;
      
      //console.log(popup.url()); 
    });

    then('I expect a new window to appear', async () => {
      //await expect(popup.title()).resolves.toMatch('Select your Identity Provider');
      //
      //await expect(popup).toMatch("Solid Community", { timeout: 1000 });
      //await expect(popup).toMatch("Inrupt", { timeout: 1000 });
      //await expect(popup).toMatch("solid.github.io", { timeout: 1000 });

      //await expect(popup).toClick("div > div > div > button",{ text: "Solid Community" }, {delay: 5000});

      //await expect(popup).toMatch("Login", { timeout: 5000 });
      
      
      //await expect(popup).toMatchElement('div > div > form > button', { text: "Go" });

      //await expect(popup).toClick("div > div > div > button",{ text: "Solid Community" });
      
      
      //Hasta aqui bien 

      
      //await expect(popup).toMatchElement('div > div > h1', { text: "Login" });

      //const newPagePromise2 = new Promise(x => browser.once('targetcreated', target => x(target.page())));	
      //await expect(popup).toClick('form > button', { text: "Go" });
      
     
      // await expect(popup).toClick('form > button', { text: 'Log In' });
      // const popup = await newPagePromise;
      // console.log(popup.url());

      // await expect(popup.title()).resolves.toMatch('Login');
      // await expect(page).toFillForm('form[name="formIniciar"]', {
      //     email: email,
      // })
      // await expect(page).toClick('button', { text: 'Submit' })

      //await expect(popup).toMatchElement('form > button', { text: "Solid Community" });

      //await expect(popup).toClick('button', { text: 'Solid Community' })
      //await expect(page).toMatchElement('h1', { text: "Log in to" })
    });

    and('After introducing the solidCommunity user to be loged in', async() => {

    });
  }); 

});