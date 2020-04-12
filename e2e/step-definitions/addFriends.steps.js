const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/addFriends.feature');
const webdriver = require('selenium-webdriver');
const By = webdriver.By;

defineFeature(feature, test => {
    
	beforeEach(async () => {
    //await page.goto('http://localhost:3000/#/friends');  
	})
	
  test('We want to add a friend', ({ given, when, and, then }) => {

    given('The friends page on the application', async() => {
      //await page.goto('http://localhost:3000/#/friends');
      //await expect(page).toMatchElement('h2', { id: 'friendsTitle' });
    });

    when('We enter a WebId', async () => {
      //await page.waitFor(500);

      //driver.findElement(By.id('friendId')).sendKeys("https://es1c.solid.community");      
    });

    and('We click the Add button', async () => {
      //await expect(page).toClick('button', { id: 'add' });
    });

    then('I expect the WebId to appear on the friends list', async () => {
      //await expect(page).toMatch("https://es1c.solid.community", { timeout: 500 });
    });

  }); 

});
