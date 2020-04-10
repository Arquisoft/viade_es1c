Feature: View Notifications

	Scenario: We want see our notifications
		Given My notifications page on the application
		When We select a notification
		And We click the Mark button
		Then I expect the notification to dissapear