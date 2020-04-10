const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/notifications.feature');

defineFeature(feature, test => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/');
    });

    test('We want see our notifications',({given,when,and,then}) =>{

        given('My notifications page on the application', async() => {

        });

        when('We select a notification', async () => {
            
        });

        and('We click the Mark button', async () => {
            
        });

        then('I expect the notification to dissapear', async () => {

        });
    });
});

