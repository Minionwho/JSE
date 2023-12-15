const { jwtToken, jwtData } = checkAuth("Courier", window.location.href);
console.log(jwtData);

const resi = document.querySelector(".resi");
const sendingDate = document.querySelector(".sending-date");
const serviceType = document.querySelector(".service-type");
const weight = document.querySelector(".package-weight");
const totalCost = document.querySelector(".cost");

// Sender Information
const senderName = document.querySelector(".sender-name");
const senderAddress = document.querySelector(".sender-address");
const senderPhone = document.querySelector(".sender-phone");
const senderCity = document.querySelector(".sender-city");

// Receiver Information
const intendedReceiverName = document.querySelector(".intended-receiver-name");
const receiverAddress = document.querySelector(".receiver-address");
const receiverPhone = document.querySelector(".receiver-phone");
const receiverCity = document.querySelector(".receiver-city");

// Request Delivery
const reqMessage = document.querySelector(".req-message");
const submitBtn = document.querySelector(".submit");
const informations = document.querySelector(".information");
// Package Information

const currDeliveryUrl =
	"https://jseapiserver.azurewebsites.net/courier/current_delivery";
const currOptions = {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
		Authorization: `bearer ${jwtToken}`,
	},
};

// fetch /courier/current_delivery
fetch(currDeliveryUrl, currOptions)
	.then((response) => {
		if (response.status == 200) {
			toggleRequest(false);
			window.location.assign("/kurir/currentDelivery.html");
			alert("You already have on going delivery!");
			return response.json();
		} else {
			toggleRequest(true);
			// fetchRequest();
		}
	})
	.then((data) => {
		console.log(data);
		// Package Info
	});

submitBtn.addEventListener("click", (e) => {
	e.preventDefault();

	const reqDeliveryUrl =
		"https://jseapiserver.azurewebsites.net/courier/request_delivery";
	const reqOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${jwtToken}`,
		},
	};

	toggleRequest(false);
	// fetch /courier/request_delivery
	fetch(reqDeliveryUrl, reqOptions)
		.then((response) => {
			if (response.status == 200) {
				return response.json();
			} else {
				return response.json().then((err) => {
					throw new Error(err.message);
				});
			}
		})
		.then((data) => {
			console.log(data);
			resi.innerHTML = data.tracking_number;
			sendingDate.innerHTML = data.sending_date;
			serviceType.innerHTML = data.service_type;
			weight.innerHTML = data.package_weight;
			totalCost.innerHTML = formatRupiah(data.delivery_price);

			// Sender Info
			senderName.innerHTML = data.sender_name;
			senderAddress.innerHTML = data.sender_address;
			senderPhone.innerHTML = data.sender_phone;
			senderCity.innerHTML = data.pool_sender_city;

			// Receiver Info
			intendedReceiverName.innerHTML = data.intended_receiver_name;
			receiverAddress.innerHTML = data.receiver_address;
			receiverPhone.innerHTML = data.receiver_phone;
			receiverCity.innerHTML = data.pool_receiver_city;
		})
		.catch((err) => {
			alert(err);
		});
});

function toggleRequest(available) {
	// Request Delivery
	const reqMessage = document.querySelector(".req-message");
	const submitBtn = document.querySelector(".submit");
	const informations = document.querySelector(".information");
	if (available) {
		informations.style.display = "none";
		reqMessage.innerHTML = "You do not have any current deliveries!";
		submitBtn.disabled = false;
	} else {
		informations.style.display = "block";
		reqMessage.innerHTML = "You already have on going delivery!";
		submitBtn.disabled = true;
	}
}

function formatRupiah(number) {
	const parts = number.toFixed(2).toString().split(".");
	const formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	const formattedRupiah = `Rp${formattedInteger}`;

	return formattedRupiah;
}
function logout() {
	localStorage.removeItem("jwtToken");
	window.location.assign("../../index.html");
}
