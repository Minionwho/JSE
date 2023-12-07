function checkAuth(role, url) {
	console.log("selected role", role);
	const checkRole = () => {
		if (role == "Admin") {
			console.log("reached admin case");
			const adminLoginUrl = `/admin/login.html?redirect=${url}`;
			window.location.href = adminLoginUrl;
		} else if (role == "Courier") {
			console.log("reached courier case");
			const courierLoginUrl = `/kurir/login.html?redirect=${url}`;
			window.location.href = courierLoginUrl;
		}
	};

	const jwtToken = localStorage.getItem("jwtToken");
	if (jwtToken == null) {
		alert("You are not logged in, please log in and try again!");
		checkRole();
		return;
	}
	const jwtData = JSON.parse(atob(jwtToken.split(".")[1]));
	console.log(jwtData);
	const jwtRole =
		jwtData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

	if (role == jwtRole) {
		return { jwtToken, jwtData };
	} else {
		alert(
			"You don't have permissions to access this page! Please log in and try again"
		);
		checkRole();
		return;
	}
}

function useState(defaultValue) {
	let value = defaultValue;

	function getValue() {
		return value;
	}
	function setValue(newValue) {
		value = newValue;
	}
	return [getValue, setValue];
}
