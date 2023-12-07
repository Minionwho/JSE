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

	const jwtToken = localStorage.getItem("jwtToken");
	console.log("reached");

	const jwtData = JSON.parse(atob(jwtToken.split(".")[1]));
	console.log("reached");

	const jwtRole =
		jwtData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
	console.log(jwtToken);
	$("#adminLogin").click((event) => {
		console.log("reached adminlogin");
		event.preventDefault();
		if (jwtRole == "Admin") {
			window.location.href =
				window.location.origin + "/admin/dashboard/manage.html";
		} else {
			const adminLoginUrl = window.location.origin + `/admin/login.html`;
			window.location.href = adminLoginUrl;
		}
	});
	$("#kurirLogin").click((event) => {
		event.preventDefault();

		if (jwtRole == "Courier") {
			window.location.href =
				window.location.origin + "/kurir/history.html";
		} else {
			const courierLoginUrl =
				window.location.origin + `/kurir/login.html`;
			window.location.href = courierLoginUrl;
		}
	});
});
