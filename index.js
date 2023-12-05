$(document).ready(function () {
	console.log("reached");
	$("#trackingForm").submit(function (event) {
		event.preventDefault();

		// Get the user input from the input field
		const userInput = $("#trackingNumber").val();

		// Build the URL with the query parameter
		const url = `customer/tracking.html?tracking_number=${userInput}`;

		// Redirect to the new URL
		window.location.href = url;
	});
});
