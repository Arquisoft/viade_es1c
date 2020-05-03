Feature: Share Route

	Scenario: We want to share a route with a friend
		Given The share route page on the application 
		When We select a route from the combo
		And We select a friend
		And We click the Share button
		Then I expect that the route has been shared
		