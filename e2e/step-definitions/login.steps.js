const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/login.feature');

defineFeature(feature, test => {
	
	beforeEach(async () => {
		await page.goto('http://localhost:3000');
	})
	
  test('We want to login into Viade', ({ given, when, then, and }) => {

    given('The login page', async() => {
    });

    when('We press Iniciar Sesion', async () => {
    });

    then('I expect a new window to appear', async () => {
    });

    and('After introducing the solidCommunity user to be loged in', async() => {

    });
  }); 

});