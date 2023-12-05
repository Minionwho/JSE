$(document).ready(async () => {
	const tracking_number = "REG2023120200001";
	const tracking_number_element = $("nomor-resi");
	const receiver_name = $("nama-penerima");
	const receiver_phone = $("nomor-penerima");
	const courier_name = $("nama-kurir");

	const baseUrl = `https://localhost:7023/delivery/${tracking_number}`;

	const option = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	const response = await fetch(baseUrl, option);

	if (response.ok) {
		data = response.json()
		$(tracking_number).text(data.)
	}
});
