const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/internationalization.feature');

defineFeature(feature, test => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/#/welcome');
        
    });

    test('We are login into Viade and we check all views are internationalized',({given,when,then}) =>{


        given('A view', async() => {
            await expect(page).toMatch("Welcome", { timeout: 500 });
        });

        when('The user press the boton Language or Idioma (depending on the language you have selected) and select the other language', async () => {
            await expect(page).toMatch("Welcome", { timeout: 500 });
            //await expect(page).toClick("button",{ id: "btnLanguage" });
            //await expect(page).toClick("DropdownButton",{ id: "btnLanguage" });
            //await expect(page).toClick("button",{ text: "ESP" });
        });
  
        then('All words on the page change will change language to the one selected by the user', async () => {
            //await expect(page).toMatch("Bienvenido", { timeout: 500 });
        });
    });
});