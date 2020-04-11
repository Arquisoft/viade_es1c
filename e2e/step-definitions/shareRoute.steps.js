const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/shareRoute.feature');

defineFeature(feature, test => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/');
    });

    test('We want to share a route with a friend',({given,when,and,then}) =>{

        given('The share route page on the application', async() => {

        });

        when('We select a route from the combo', async () => {
            
        });

        and('We select a friend', async () => {
            
        });

        and('We click the Share button', async () => {
            
        });
  
        then('I expect that the route has been shared', async () => {

        });
    });
});
