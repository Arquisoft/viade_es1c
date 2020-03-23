Feature: Load combo routes

	Scenario: load
		Given 
		When I press the button "Cargar rutas del POD" 
		Then I expect the comboBox to be filled
		And I expect the comboBox to have the same amount of routes as the POD
		