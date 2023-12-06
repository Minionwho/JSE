const { jwtToken, jwtData } = checkAuth("Admin", window.location.href);

function dispatch() {
    var trackingNumber = document.getElementById("trackingNumberInput").value;

    var messageElement = document.getElementById("message");

    if (trackingNumber.trim() !== "") {
        var apiUrl = "https://localhost:7023/dispatch?tracking_number=" + trackingNumber;

        fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Terjadi kesalahan dalam permintaan");
            }
            return response.json();
        })
        .then(data => {
            messageElement.innerText = data.message_text;
            messageElement.className = data.success ? "message success" : "message error";
        })
        .catch(error => {
            messageElement.innerText = "Terjadi kesalahan: " + error.message;
            messageElement.className = "message error";
        });
    } else {
        messageElement.innerText = "Nomor Resi tidak boleh kosong";
        messageElement.className = "message error";
    }
}

function arrived() {
    var trackingNumber = document.getElementById("trackingNumberInput").value;

    var messageElement = document.getElementById("message");

    if (trackingNumber.trim() !== "") {
        var apiUrl = "https://localhost:7023/arrived?tracking_number=" + trackingNumber;

        fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Terjadi kesalahan dalam permintaan");
            }
            return response.json();
        })
        .then(data => {
            messageElement.innerText = data.message_text;
            messageElement.className = data.success ? "message success" : "message error";
        })
        .catch(error => {
            messageElement.innerText = "Terjadi kesalahan: " + error.message;
            messageElement.className = "message error";
        });
    } else {
        messageElement.innerText = "Nomor Resi tidak boleh kosong";
        messageElement.className = "message error";
    }
}


function logout() {
    localStorage.removeItem("jwtToken");
    window.location.assign("../../index.html");
}
