Feature: Visualize a route stored in the pod

	Scenario: There are some routes on the POD
		Given the 'Visualize' page
		When I press the button 'Cargar rutas del POD'
		Then I expect the comboBox to be filled
		And I expect the comboBox to have the same amount of routes as the POD
	
	Scenario: There are some routes on the comboBox
		Given the 'Visualize' page with the comboBox filled
		When I press the button 'Visualizar'
		Then I expect the elevation diagram to appear
		