Feature: Load the comboBox of Visualize with routes stored in the pod

	Scenario: There are some routes on the POD
		Given the 'Visualize' page
		When I press the button 'Cargar rutas del POD'
		Then I expect the comboBox to be filled
		And I expect the comboBox to have the same amount of routes as the POD
