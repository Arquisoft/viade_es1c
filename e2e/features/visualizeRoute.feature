Feature: Visualize a route stored in the pod
	
	Scenario: There are some routes on the comboBox
		Given the 'Visualize' page with the comboBox filled
		When I press the button 'Visualizar'
		Then I expect the elevation diagram to appear
		