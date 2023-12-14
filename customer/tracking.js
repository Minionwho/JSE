function parseAndFormatTimestamp(originalTimestamp) {
	// Parse the original timestamp
	const dateObj = new Date(originalTimestamp);

	// Define arrays for month names and days of the week
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	// Extract date components
	const day = dateObj.getDate();
	const month = months[dateObj.getMonth()];
	const year = dateObj.getFullYear();

	// Extract and format hours, minutes, and seconds with leading zeros
	const hours = String(dateObj.getHours()).padStart(2, "0");
	const minutes = String(dateObj.getMinutes()).padStart(2, "0");
	const seconds = String(dateObj.getSeconds()).padStart(2, "0");

	// Format the date and time as desired
	const formattedTimestamp = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;

	return formattedTimestamp;
}

$(document).ready(async () => {
	const url = window.location.search;
	const params = new URLSearchParams(url);
	const tracking_number = params.get("tracking_number");

	const tracking_number_element = $(".nomor-resi");
	const receiver_name = $(".nama-penerima");
	const receiver_phone = $(".nomor-penerima");
	const courier_name = $(".nama-kurir");

	const package_information = $(".package-information");

	const delivery_tracking = $(".delivery-tracking");

	const modal = $("#modal");
	const modalContent = $(".modal-content");
	const openModalBtn = $("#openModalBtn");
	const closeModalBtn = $("#closeModalBtn");

	const infoBaseUrl = `https://jseapiserver.azurewebsites.net/delivery/${tracking_number}`;
	const imageBaseUrl = `https://jseapiserver.azurewebsites.net/image/${tracking_number}`;
	const option = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	// fetch tracking number data
	fetch(infoBaseUrl, option)
		.then((response) => {
			if (response.status == 200) {
				return response.json();
			}
		})
		.then((data) => {
			console.log(data);
			$(tracking_number_element).text(tracking_number);
			$(receiver_name).text(data.intended_receiver_name);
			$(receiver_phone).text(data.receiver_phone);
			const courier_username = data.Courier?.courier_username;
			if (courier_username == null || courier_username == undefined) {
				$(courier_name).text("N/A");
			} else {
				$(courier_name).text(courier_username);
			}

			const messages = data.Messages;
			// sort messages in descending order.
			messages.sort((a, b) => {
				const dateb = new Date(b.timestamp);
				const datea = new Date(a.timestamp);
				return dateb.getTime() - datea.getTime();
			});

			messages.forEach((message) => {
				let dateString = parseAndFormatTimestamp(message.timestamp);
				let statusMessage = '<div class="row m-3 track-info">';
				statusMessage += `<div class="col-sm-5 date">${dateString}</div>`;
				statusMessage += '<div class="col-sm-7 message">';
				statusMessage += message.message_text;
				statusMessage += "</div></div>";

				$(delivery_tracking).append(statusMessage);
			});
		});
	fetch(imageBaseUrl).then((response) => {
		if (response.ok) {
			const linkpicture = $(".link-picture");
			$(linkpicture).css("display", "block");
			const imgElement = $("<img>")
				.attr("src", imageBaseUrl)
				.attr("alt", `${tracking_number} received picture proof.`);

			$(modalContent).append(imgElement);
		}
	});

	openModalBtn.on("click", (event) => {
		event.preventDefault();
		modal.css("display", "block");
	});
	closeModalBtn.on("click", () => {
		modal.css("display", "none");
	});
	$(window).on("click", function (event) {
		if (event.target === modal[0]) {
			modal.css("display", "none");
		}
	});

	console.log(data);
});
