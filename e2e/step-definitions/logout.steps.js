const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/logout.feature');

defineFeature(feature, test => {
    
	beforeEach(async () => {
    await page.goto('http://localhost:3000');  
	})
	
  test('We want to logout', ({ given, when, then }) => {

    given('The application page', async() => {
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