const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/loadCombo.feature');

defineFeature(feature, test => {
	
	beforeEach(async () => {
		await page.goto('http://localhost:3000');
	})
	

  test('There are some routes on the POD', ({ given, when, then, and }) => {
    let email;
    given('A POD with routes in it', () => {
        //email = "foo@test.com"
    });

    when('I press the button Cargar rutas del POD', async () => {
        // await expect(page).toFillForm('form[name="register"]', {
          //       // email: email,
          //       // remail: email,
          //     // })
           await expect(page).toClick('button', { name: 'btnCargar' })
    });

    then('I expect the comboBox to be filled', async () => {
        //await expect(page).toMatchElement('span', { text: 'ERROR: User '+email+' is already registered!' })
    });

    and('I expect the comboBox to have the same amount of routes as the POD', async() => {

    });
  });
  

});