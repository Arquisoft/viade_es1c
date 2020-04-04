const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/internationalization.feature');

defineFeature(feature, test => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000');
        
    });

    test('We are login into Viade and we check all views are internationalized',({given,when,then}) =>{


        given('A view', async() => {});

        when('The user press the boton Language or Idioma (depending on the language you have selected) and select the other language', async () => {});
  
        then('All words on the page change will change language to the one selected by the user', async () => {});
  

    });
});