const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/login.feature');
const puppeteer = require('puppeteer');
let browser = null;
let page = null;

defineFeature(feature, test => {
	
	beforeEach(async () => {
    //await page.goto('http://localhost:3000');
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
      
      const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));	
      await expect(page).toClick('button', { className: 'btn btn-primary a-solid button-login' });
      popup = await newPagePromise;

      await expect(popup).toClick('button', { text: 'Solid Community' });

      //Falla:
      //popup.goto("https://solid.community/login?scope=openid&client_id=a92112fed9e1bc89d69fe791d7230b87&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmdpdGh1Yi5pby9zb2xpZC1hdXRoLWNsaWVudC9kaXN0L3BvcHVwLmh0bWwiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoiS3k3VDl6NzE5U3czSEk5dTNtendfZk9EaU9NZEQ5bU0xZG5HSDNrMHhKMCIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoidHJ2Q245UmdvNmlOQ00xel82UzFEYUtSeTdaQzV6Q3c0OWxIS2tPY0RKd2g5eHVVOFJuTXc4WUJjZ1l0YTZiZ1UxSUNLUV9TNEI1LU9NSVRDcDM1TC1uVUJoRjhzN2x0TzVMamJjV1pxNHZRQk1KTEFqQzdLeUktdXhobWp0RnV6WUd2Uk02cGcwS2lKMFZPaHNJQ3pTeTQxdUZBUkwzM3hwMVFIZkVwZktQSUo0cHpTNEpWRjFVcE9HbWdfamRiaml1Rk1BS3JiUXlFN3E5TWc3SWowRDR2cjhJTklyV0w5eE85eUxMZXpEQWoxTkY0c1prSTVmUTJjQ3cyRHpncnB3Y1NqUHB5Y19MZWNGSlQxU3A4djRfYm9mcVI0bmM4bExPTFZrQl8yZGhuNVo4WnNiVEtFREo5N1RGZFhvR09jTTFNWUJwVXZ1R2lQaEZwcDZ5MWF3In19.&state=rzTNunu7Oe2uRLtaynk1eWzbzNkfAdZWaDT20IEuPQ8");
      await expect(popup).toMatchElement('label', { text: 'Username' });
      await popup.evaluate(() => {
        let inputs = [...document.querySelectorAll("input")];
        inputs.forEach(function (i) {
          if (i.innerText == "username"){
            popup.type("[id='username']", "es1c", {visible: true});
          }   
          if (i.innerText == "password"){
            popup.type("[id='password']", "Viade_es1c", {visible: true});
          }  
        });
      });
      await expect(popup).toClick('button', { text: 'Log In' });
      // await popup.evaluate(() => {
      //   let btns = [...document.querySelectorAll("button")];
      //   btns.forEach(function (btn) {
      //     if (btn.innerText == "Solid Community"){
           
      //       btn.click(); 
      //     }     
      //   });
      // });

       
         
      //   });
      // });
      //await page.type("[id='username']", "es1c");

      await popup.evaluate(() => {
        let btns = [...document.querySelectorAll("button")];
        btns.forEach(function (btn) {
          if (btn.innerText == "Log In"){
            btn.click();
          }     
        });
      });

        // await page.waitForNavigation({
        //   waitUntil: 'networkidle2'
        // });

        // await page.waitForSelector("[id='username']", {visible: true});
        // await page.type("[id='username']", "es1c");
  
        // await page.waitFor(500);
        // await page.waitForSelector("[id='password']", {visible: true});
        // await page.type("[id='password']", "Viade_es1c", {visible: true});
  
       // await page.waitFor(500);
  
        // await page.evaluate(() => {
        //   let btns = [...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button")];
        //   btns.forEach(function (btn) {
        //     if (btn.innerText == "Log In")
        //       btn.click();
        //   });
        // });

    });

    then('I expect a new window to appear', async () => {
      // await page.waitForNavigation({
      //   waitUntil: 'networkidle2'
      // });

      // expect(page.url()).toBe("http://localhost:3000/#/welcome")

    });

    and('After introducing the solidCommunity user to be loged in', async() => {
      //await expect(page).toMatch("Welcome", { timeout: 500 });
    });
  }); 

});