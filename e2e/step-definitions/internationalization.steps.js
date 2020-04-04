const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/login.feature');

defineFeature(feature, test => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000');
        
    });

    test('We are login into Viade and we check all views are internationalized')
});