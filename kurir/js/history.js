const endpoint = "https://jseapiserver.azurewebsites.net/courier/history";
let shipmentData;
const { jwtToken, jwtData } = checkAuth("Courier", window.location.href);

function populateTable() {
	let tableBody = document.querySelector("#myTable tbody");

	// Ganti URL_API dengan URL sesuai dengan API yang ingin Anda gunakan
	const fetchOptions = {
		headers: {
			Authorization: `bearer ${jwtToken}`,
		},
		"Content-Type": "application/json",
	};
	fetch(endpoint, fetchOptions)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			// Periksa apakah data dari API tidak kosong
			if (data && data.length > 0) {
				data.forEach((shipment) => {
					console.log(shipment);
					let row = tableBody.insertRow();
					row.innerHTML = `<th scope="row">${
						shipment.tracking_number
					}</th>
                            <td>${shipment.intended_receiver_name}</td>
                            <td>${shipment.receiver_phone}</td>
                            <td>${shipment.receiver_address}</td>
                            <td>${
								shipment.actual_receiver_name
									? shipment.actual_receiver_name
									: "N/A"
							}</td>
                            <td>${getStatusBadge(
								shipment.delivery_status
							)}</td>`;
				});
			} else {
				console.error("Error: Data from API is undefined or empty.");
			}
		})
		.catch((error) => {
			console.error("Error fetching data from API:", error);
		});
}

// Function to generate status badge based on status
function getStatusBadge(delivery_status) {
	let badgeClass = "";
	let badgeContent = "";

	switch (delivery_status) {
		case "package_delivered":
			badgeClass = "deliver badge text-bg-success";
			badgeContent = "Delivered";
			break;
		case "delivery_failed":
			badgeClass = "cancel";
			badgeContent = `<button type="button" class="btn btn-secondary popover-trigger" data-bs-toggle="popover" data-bs-placement="top" title="Alasan Cancel" data-bs-content="${shipment.fail_message}">Cancel</button>`;
			break;
		case "returned_to_pool":
			badgeClass = "cancel";
			badgeContent = `<button type="button" class="btn btn-secondary popover-trigger" data-bs-toggle="popover" data-bs-placement="top" title="Alasan Cancel" data-bs-content="${shipment.fail_message}">Cancel</button>`;
			break;
		case "on_sender_pool":
			badgeClass = "onprocess badge text-bg-warning";
			badgeContent = `On Process`;
			break;
		case "dispatched":
			badgeClass = "badge text-bg-warning";
			badgeContent = "On Process";
			break;
		case "on_destination_pool":
			badgeClass = "onprocess badge text-bg-warning";
			badgeContent = "On Process";
			break;
		case "otw_receiver_address":
			badgeClass = "onprocess badge text-bg-primary";
			badgeContent = "With Courier";
			break;
		default:
			badgeClass = "badge text-bg-secondary";
			badgeContent = "Unknown";
	}

	return `<span class="${badgeClass}">${badgeContent}</span> <a href="/index.html" class="i"><span class="info badge badge-info">i</span><a>`;
}

function logout() {
	localStorage.removeItem("jwtToken");
	window.location.assign("../../index.html");
}

window.onload = function () {
	populateTable();
};
