Feature: Logout of Viade

	Scenario: We want to logout 
		Given The application page
		When We press Logout
		Then I expect to be in the Log In page
		