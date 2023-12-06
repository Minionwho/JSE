const endpoint = "https://localhost:7023/delivery";
var shipmentData;
var message;

const { jwtToken, jwtData } = checkAuth("Admin", window.location.href);

function populateTable() {
	var tableBody = document.querySelector("#myTable tbody");

	// Ganti URL_API dengan URL sesuai dengan API yang ingin Anda gunakan
	fetch(endpoint)
		.then((response) => response.json())
		.then((data) => {
			// Periksa apakah data dari API tidak kosong
			if (data && data.length > 0) {
				data.forEach(function (shipment) {
					var row = tableBody.insertRow();
					row.innerHTML = `<th scope="row">${
						shipment.tracking_number
					}</th>
                            <td>${shipment.sender_name}</td>
                            <td>${shipment.intended_receiver_name}</td>
                            <td>${shipment.receiver_address}</td>
                            <td class="onprocess popover-trigger">${getStatusBadge(
								shipment.delivery_status
							)}</td>`;
				});
				initializePopovers();
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
	var badgeClass = "";
	var badgeContent = "";

	switch (delivery_status) {
		case "package_delivered":
			badgeClass = "deliver badge badge-success";
			badgeContent = "Delivered";
			break;
		case "delivery_failed":
			badgeClass = "cancel";
			badgeContent =
				'<button type="button" class="btn btn-secondary popover-trigger" data-bs-toggle="popover" data-bs-placement="top" title="Alasan Cancel" data-bs-content="${shipment.fail_message}">Cancel</button>';
			break;
		case "returned_to_pool":
			badgeClass = "cancel";
			badgeContent =
				'<button type="button" class="btn btn-secondary popover-trigger" data-bs-toggle="popover" data-bs-placement="top" title="Alasan Cancel" data-bs-content="${shipment.fail_message}">Cancel</button>';
			break;
		case "on_sender_pool":
			badgeClass = "onprocess badge badge-warning";
			badgeContent = `On Process`;
			break;
		case "dispatched":
			badgeClass = "onprocess badge badge-warning";
			badgeContent = "On Process";
			break;
		case "on_destination_pool":
			badgeClass = "onprocess badge badge-warning";
			badgeContent = "On Process";
			break;
		case "otw_receiver_address":
			badgeClass = "onprocess badge badge-warning";
			badgeContent = "On Process";
			break;
		default:
			badgeClass = "badge badge-secondary";
			badgeContent = "Unknown";
	}

	return `<span class="${badgeClass}">${badgeContent}</span> <a href="/index.html" class="i"><span class="info badge badge-info">i</span><a>`;
}

function initializePopovers() {
	var popoverTriggerList = [].slice.call(
		document.querySelectorAll(".popover-trigger")
	);
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl);
	});
}

function logout() {
	localStorage.removeItem("jwtToken");
	window.location.assign("../../index.html");
}

window.onload = function () {
	populateTable();
};
