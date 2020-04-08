const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/loadRoute.feature');

defineFeature(feature, test => {
	
	beforeEach(async () => {
		await page.goto('http://localhost:3000');
	})
	
  test('We want to load route files into the POD', ({ given, when, then, and }) => {

    given('The loadRoutes page', async() => {
      await page.goto('http://localhost:3000/upload');
    });

    when('I select route files from my computer and I press the button upload', async () => {
      
      await expect(page).toClick('h2', { id: 'titleUpload' });
      //Select files
      
      //Press button
      await expect(page).toClick('button', { id: 'uploadButton' });
    });

    then('I expect a message to be shown', async () => {
		
    });

  }); 

});