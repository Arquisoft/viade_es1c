const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/loadRoute.feature');

defineFeature(feature, test => {
	
	beforeEach(async () => {
		await page.goto('http://localhost:3000');
	})
	
  test('We want lo load route files into the POD', ({ given, when, then, and }) => {

    given('We have some routes in our computer that we want to load into de POD', async() => {
		
    });

    when('I am on the loadRoutes page and choose the files', async () => {

    });

    then('I expect a message to be shown', async () => {
		
    });

  }); 

});