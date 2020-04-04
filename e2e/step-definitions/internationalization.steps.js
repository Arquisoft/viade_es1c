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
            //const linkHandlers = await page.$x("//li[contains(text(), 'Link to documentation')]");
            //console.log(linkHandlers);
            //await linkHandlers[0].click();
            await expect(page).toMatchElement('a', { href: 'https://arquisoft.github.io/viade_es1c/docs/'});
            await expect(page).toClick('a', { href: 'https://arquisoft.github.io/viade_es1c/docs/'});

        });
  
        then('All words on the page change will change language to the one selected by the user', async () => {});
  

    });
});