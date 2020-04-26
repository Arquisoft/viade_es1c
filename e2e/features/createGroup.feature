Feature: Create a group

	Scenario: We want create a group of friends
		Given The friends page on the application 
		And Click in the NavBar to friend
		When We enter a group name
		And We select the friends that we want
		Then I press the button to create de group
