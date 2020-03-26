Feature: Login into Viade

	Scenario: We want to login into Viade
		Given The login page
		When We press Iniciar Sesion
		Then I expect a new window to appear
		And After introducing the solidCommunity user to be loged in 
		