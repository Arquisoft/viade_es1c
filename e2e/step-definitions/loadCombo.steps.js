const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/loadCombo.feature');

defineFeature(feature, test => {
	
	beforeEach(async () => {
		await page.goto('http://localhost:3000/#/visualize');
	})
	
  test('There are some routes on the POD', ({ given, when, then, and }) => {

    given('The Visualize page', async() => {
        await expect(page).toMatchElement('h2', { text: 'Welcome to ViaDe_ES1C' })
    });

    when('I press the button Cargar rutas del POD', async () => {
          await expect(page).toClick('button', { name: 'btnCargar' })
    });

    then('I expect the comboBox to be filled', async () => {
      await expect(page).toMatchElement('button', { id: 'rutaDePrueba1' }) 
    });

    and('I expect the comboBox to have the same amount of routes as the POD', async() => {

    });
  }); 

});