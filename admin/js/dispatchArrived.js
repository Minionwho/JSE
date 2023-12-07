const { jwtToken, jwtData } = checkAuth("Admin", window.location.href);

// const alertTrigger = document.getElementById("liveAlertBtn");
// if (alertTrigger) {
// 	alertTrigger.addEventListener("click", () => {
// 		appendAlert("Nice, you triggered this alert message!", "success");
// 	});
// }

function dispatch() {
	let trackingNumber = document.getElementById("trackingNumberInput").value;

	let messageElement = document.getElementById("message");
}

function arrived() {
	let trackingNumber = document.getElementById("trackingNumberInput").value;

	let messageElement = document.getElementById("message");
}

function arrived() {
	let trackingNumber = document.getElementById("trackingNumberInput").value;

	let messageElement = document.getElementById("message");
}

document.addEventListener("DOMContentLoaded", () => {
	const trackingNumberElement = document.getElementById(
		"trackingNumberInput"
	);

	const dispatchButton = document.getElementById("dispatchButton");
	const arrivedButton = document.getElementById("arrivedButton");
	const returnedToPoolButton = document.getElementById(
		"returnedToPoolButton"
	);

	const alertPlaceholder = document.getElementById("message-container");
	const appendAlert = (message, type) => {
		const alertHTML = [
			`<div class="alert alert-${type} alert-dismissible" role="alert">` +
				`   <div>${message}</div>` +
				'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
				"</div>",
		].join("");

		alertPlaceholder.innerHTML = alertHTML;
	};

	dispatchButton.addEventListener("click", () => {
		const trackingNumber = trackingNumberElement.value;
		console.log(trackingNumber);
		if (trackingNumber.trim() !== "") {
			let apiUrl =
				"https://localhost:7023/delivery/dispatch?tracking_number=" +
				trackingNumber;

			fetch(apiUrl, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `bearer ${jwtToken}`,
				},
			})
				.then((response) => {
					if (!response.ok) {
						return response.json().then((errorData) => {
							throw new Error(errorData.message);
						});
					}
					return response.json();
				})
				.then((data) => {
					console.log(data);
					appendAlert(data.message_text, "success");
					// messageElement.innerText = data.message_text;
					// messageElement.className = data.success
					// 	? "message success"
					// 	: "message error";
				})
				.catch((error) => {
					// messageElement.innerText =
					// 	"Terjadi kesalahan: " + error.message;
					// messageElement.className = "message error";
					console.log(error);
					appendAlert(error.message, "danger");
				});
		} else {
			appendAlert("Nomor Resi tidak boleh kosong", "danger");
		}
	});
	arrivedButton.addEventListener("click", () => {
		const trackingNumber = trackingNumberElement.value;

		if (trackingNumber.trim() !== "") {
			let apiUrl =
				"https://localhost:7023/delivery/arrived?tracking_number=" +
				trackingNumber;

			fetch(apiUrl, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `bearer ${jwtToken}`,
				},
			})
				.then((response) => {
					if (!response.ok) {
						return response.json().then((errorData) => {
							throw new Error(errorData.message);
						});
					}
					return response.json();
				})
				.then((data) => {
					console.log(data);
					appendAlert(data.message_text, "success");
					// messageElement.innerText = data.message_text;
					// messageElement.className = data.success
					// 	? "message success"
					// 	: "message error";
				})
				.catch((error) => {
					// messageElement.innerText =
					// 	"Terjadi kesalahan: " + error.message;
					// messageElement.className = "message error";
					console.log(error);
					appendAlert(error.message, "danger");
				});
		} else {
			// messageElement.innerText = "Nomor Resi tidak boleh kosong";
			// messageElement.className = "message error";
			appendAlert("Nomor Resi tidak boleh kosong", "danger");
		}
	});

	returnedToPoolButton.addEventListener("click", () => {
		const trackingNumber = trackingNumberElement.value;

		if (trackingNumber.trim() !== "") {
			let apiUrl =
				"https://localhost:7023/delivery/returnedToPool?tracking_number=" +
				trackingNumber;

			fetch(apiUrl, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `bearer ${jwtToken}`,
				},
			})
				.then((response) => {
					if (!response.ok) {
						return response.json().then((errorData) => {
							throw new Error(errorData.message);
						});
					}
					return response.json();
				})
				.then((data) => {
					console.log(data);
					appendAlert(data.message_text, "success");
					// messageElement.innerText = data.message_text;
					// messageElement.className = data.success
					// 	? "message success"
					// 	: "message error";
				})
				.catch((error) => {
					// messageElement.innerText =
					// 	"Terjadi kesalahan: " + error.message;
					// messageElement.className = "message error";
					console.log(error);
					appendAlert(error.message, "danger");
				});
		} else {
			// messageElement.innerText = "Nomor Resi tidak boleh kosong";
			// messageElement.className = "message error";
			appendAlert("Nomor Resi tidak boleh kosong", "danger");
		}
	});
});

function logout() {
	localStorage.removeItem("jwtToken");
	window.location.assign("../../index.html");
}
