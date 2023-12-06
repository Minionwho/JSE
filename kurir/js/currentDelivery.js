const { jwtToken, jwtData } = checkAuth("Courier", window.location.href);

function toggleStatus(status) {
	document
		.querySelectorAll(".on-process, .delivered, .cancelled")
		.forEach((div) => (div.style.display = "none"));

	document.querySelector("." + status).style.display = "block";
}

function logout() {
	localStorage.removeItem("jwtToken");
	window.location.assign("../../index.html");
}
