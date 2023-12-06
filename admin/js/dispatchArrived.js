const { jwtToken, jwtData } = checkAuth("Admin", window.location.href);

function dispatch() {
    var trackingNumber = document.getElementById("trackingNumberInput").value;

    if (trackingNumber.trim() !== "") {
        var apiUrl = "https://localhost:7023/dispatch?tracking_number=" + trackingNumber;

        fetch(apiUrl, {
            method: 'PATCH', // Menggunakan metode PATCH
            headers: {
                'Content-Type': 'application/json'
                // Jika diperlukan, Anda dapat menambahkan header lain di sini
            },
            // Jika Anda perlu mengirim data JSON dalam tubuh permintaan, tambahkan properti body di sini
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Terjadi kesalahan dalam permintaan");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("message").innerText = data.message_text;
        })
        .catch(error => {
            document.getElementById("message").innerText = "Terjadi kesalahan: " + error.message;
        });
    } else {
        document.getElementById("message").innerText = "Nomor Resi tidak boleh kosong";
    }
}




function logout() {
    localStorage.removeItem("jwtToken");
    window.location.assign("../../index.html");
}
