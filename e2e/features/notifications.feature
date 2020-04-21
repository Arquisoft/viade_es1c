Feature: View Notifications

	Scenario: We want see our notifications
		Given My notifications page on the application
		When I check my notifications
		Then I can see them
		And I can select them