const endpoint = "https://localhost:7023/delivery";
let shipmentData;
let message;

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

const { jwtToken, jwtData } = checkAuth("Admin", window.location.href);

const [deliveryData, setDeliveryData] = useState({});

function populateTable(callback) {
	let tableBody = document.querySelector("#myTable tbody");

	// Ganti URL_API dengan URL sesuai dengan API yang ingin Anda gunakan
	fetch(endpoint)
		.then((response) => response.json())
		.then((data) => {
			// Periksa apakah data dari API tidak kosong
			if (data && data.length > 0) {
				setDeliveryData(data);
				data.forEach(function (shipment) {
					let row = tableBody.insertRow();
					row.innerHTML = `
                            <th scope="row">${shipment.tracking_number}</th>
                            <td>${shipment.Courier.courier_username}</td>
                            <td class="onprocess popover-trigger">${getStatusBadge(
								shipment
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

	if (typeof callback === "function") {
		callback();
	}
}

// Function to generate status badge based on status
function getStatusBadge(shipment) {
	let badgeClass = "";
	let badgeContent = "";

	switch (shipment.delivery_status) {
		case "package_delivered":
			badgeClass = "deliver badge badge-success";
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

	return `<div class="isi"><span class="${badgeClass}">${badgeContent}</span>
   <button type="button" class="btn btn-info infoBtn" data-bs-toggle="modal" 
   data-bs-target="#infoModal" data-shipment='${shipment.tracking_number}' onclick="handleOnClickMoreInfo(event)">i</button></div>`;
}

function initializePopovers() {
	let popoverTriggerList = [].slice.call(
		document.querySelectorAll(".popover-trigger")
	);
	let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl);
	});
}

function displayInfoModal(shipmentData) {
	// Get the <td> elements by their IDs
	const nomorResi = document.getElementById("nomor-resi");
	const tanggalPengiriman = document.getElementById("tanggal-pengiriman");
	const tipePengiriman = document.getElementById("tipe-pengiriman");
	const namaPengirim = document.getElementById("nama-pengirim");
	const namaPenerima = document.getElementById("nama-penerima");
	const alamatPenerima = document.getElementById("alamat-penerima");
	const poolPengirim = document.getElementById("pool-pengirim");
	const poolPenerima = document.getElementById("pool-penerima");
	const beratPaket = document.getElementById("berat-paket");
	const hargaPengiriman = document.getElementById("harga-pengiriman");
	const namaKurir = document.getElementById("namaKurir");
	const tanggalSampai = document.getElementById("tanggal-sampai");
	const status = document.getElementById("status");
	const pesanGagal = document.getElementById("pesan-gagal");

	const messages = shipmentData.Messages;
	messages.sort((a, b) => {
		const dateb = new Date(b.timestamp);
		const datea = new Date(a.timestamp);
		return dateb.getTime() - datea.getTime();
	});

	nomorResi.innerText = shipmentData.tracking_number;
	tanggalPengiriman.innerText = shipmentData.sending_date;
	tipePengiriman.innerText = shipmentData.service_type;
	namaPengirim.innerText = shipmentData.sender_name;
	namaPenerima.innerText = shipmentData.intended_receiver_name;
	alamatPenerima.innerText = shipmentData.receiver_address;
	poolPengirim.innerText = shipmentData.pool_sender_city;
	poolPenerima.innerText = shipmentData.pool_receiver_city;
	beratPaket.innerText = shipmentData.package_weight;
	hargaPengiriman.innerText = shipmentData.delivery_price;
	namaKurir.innerText = shipmentData.Courier
		? shipmentData.Courier.courier_username
		: "N/A";
	tanggalSampai.innerText = shipmentData.arrival_date
		? shipmentData.arrival_date
		: "N/A";
	status.innerText = messages[0].message_text;
	pesanGagal.innerText = shipmentData.fail_message
		? shipmentData.fail_message
		: "N/A";
	let infoContent = document.getElementsByClassName(".modal-body");
	console.log(infoContent);
}

function handleOnClickMoreInfo(event) {
	console.log(event);
	let shipmentTrackingNumber = event.target
		.getAttribute("data-shipment")
		.toString();
	console.log(shipmentTrackingNumber);
	console.log();
	const deliveryObject = deliveryData().filter(
		(data) => data.tracking_number == shipmentTrackingNumber
	)[0];
	console.log(deliveryObject);
	displayInfoModal(deliveryObject);
	return;
}

document.addEventListener("DOMContentLoaded", function () {
	populateTable();
});

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", (event) => {
	event.preventDefault();
	searchTable();
});
searchForm.addEventListener("input", (event) => {
	event.preventDefault();
	searchTable();
});

function logout() {
	localStorage.removeItem("jwtToken");
	window.location.assign("../../index.html");
}
