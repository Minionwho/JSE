/*
const { jwtToken, jwtData } = checkAuth("Courier", window.location.href);
const form = document.getElementById("form");
const submitBtn = document.querySelector(".submit");
const status = form.elements["status"];
const currentTime = getCurrentTime();
const resi = document.querySelector(".resi");
const arrivalDate = document.querySelector(".date");
const intendedReceiverName = document.querySelector(".intended-receiver-name");
const receiverPhone = document.querySelector(".receiver-phone");
const receiverAddress = document.querySelector(".receiver-address");
let deliveryStatus;

document.addEventListener("DOMContentLoaded", () => {});
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  for (let i = 0; i < status.length; i++) {
    if (status[i].checked) deliveryStatus = status[i].value;
  }

  // on process
  const descOnProcess = document.getElementById("descOnProcess");

  // delivered
  const receiverName = document.getElementById("inputReceiverName");
  const image = document.getElementById("inputImage");

  // cancelled
  const alasan = document.getElementById("alasanGagalKirim");
  const returnedPool = document.getElementById("inputReturnedPool");

  // Get package data
  const infoBaseUrl = "https://localhost:7023/courier/current_delivery";
  const option = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwtToken,
      "Content-Type": "application/json",
    },
  };

  fetch(infoBaseUrl, option)
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      return response.json();
    })
    .then((data) => {
      console.log(data);
      resi.textContent = data.tracking_number;
      arrivalDate.textContent = data.sending_date;
      intendedReceiverName.textContent = data.intended_receiver_name;
      receiverPhone.textContent = data.receiver_phone;
      receiverAddress.textContent = data.receiver_address;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // Post current delivery status
  const baseUrl = "https://localhost:7023/courier/request_delivery";
  const options = {
    method: "POST",
    headers: {
      // Authorization: "Bearer " + jwtToken,
      "Content-Type": "application/json",
    },
  };
  let credentials;
  if (deliveryStatus === "onProcess") {
    credentials = {
      tracking_number: resi.value,
      message_text: descOnProcess.value,
      timestamp: getCurrentTime(),
    };
  }
  alert("ok");
});

// ------------------------------------------------ FUNCTIONS ------------------------------------------------
function getCurrentTime() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, "0");

  const formattedTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;

  return formattedTime;
}

function toggleStatus(status) {
  document
    .querySelectorAll(".on-process, .delivered, .cancelled")
    .forEach((div) => (div.style.display = "none"));

  document.querySelector("." + status).style.display = "block";
}

function logout() {
  localStorage.removeItem("jwtToken");
  window.location.assign("../../index.html");
}

*/
/*
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style/currentDelivery.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=PT+Serif&family=Poppins:wght@100;200;300;400;500;600;700&family=Raleway:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=PT+Serif&family=Poppins:wght@100;200;300;400;500;600;700&family=Raleway:wght@300;400;500;600;700;800&family=Roboto+Condensed:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />
    <title>Kurir - Delivery Status</title>
  </head>
  <body>
    <nav
      class="navbar navbar-dark navbar-expand-lg bg-body-tertiary"
      style="background-color: #222 !important; color: white !important"
    >
      <div class="container-fluid container">
        <a class="navbar-brand" href="../index.html"
          ><span class="jse">JSE</span><span class="express">express</span></a
        ><button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-between"
          id="navbarNavAltMarkup"
        >
          <div class="navbar-nav">
            <a class="nav-link" href="history.html">History</a>
            <a class="nav-link active" href="currentDelivery.html">Delivery</a>
          </div>
          <div class="navbar-nav right-nav">
            <a
              class="nav-link logout"
              style="
                background-color: #e21e2c;
                color: white;
                font-size: 14px;
                font-weight: 500;
                padding: 6px 20px;
                border-radius: 3px;
              "
              onclick="logout()"
              >Logout</a
            >
          </div>
        </div>
      </div>
    </nav>
    <!---------------------------------------------- STATUS ---------------------------------------------->
    <div class="container container-status">
      <h2>Delivery Status</h2>
      <div class="info">
        <h5>Tracking Number</h5>
        <h3 class="resi">ZVVF3R241SR123AEW1C</h3>
      </div>
      <div class="info">
        <h5>Arrival date</h5>
        <p class="date">dd/mm/yy</p>
      </div>
      <div class="info">
        <h5>Intended receiver name</h5>
        <p class="intended-receiver-name">John Locke</p>
      </div>
      <div class="info">
        <h5>Receiver phone</h5>
        <p class="receiver-phone">0123456789</p>
      </div>
      <div class="info">
        <h5>Address</h5>
        <p class="receiver-address">alamat</p>
      </div>
      <div class="info">
        <h5>Delivery Status</h5>
        <form id="form" action="">
          <input
            type="radio"
            id="onProcess"
            name="status"
            value="onProcess"
            onchange="toggleStatus('on-process')"
            checked
          />
          <label class="status-label label-1" for="onProcess">on process</label>
          <input
            type="radio"
            id="delivered"
            name="status"
            value="delivered"
            onchange="toggleStatus('delivered')"
          />
          <label class="status-label label-2" for="delivered">delivered</label>
          <input
            type="radio"
            id="cancelled"
            name="status"
            value="cancelled"
            onchange="toggleStatus('cancelled')"
          />
          <label class="status-label label-3" for="cancelled">cancelled</label>

          <!------------------------------------------ ON PROCESS ------------------------------------------->
          <div class="on-process">
            <h2>On Process</h2>
            <div class="mb-3 row">
              <label for="descOnProcess" class="col-sm-2 col-form-label"
                >Delivery Message</label
              >
              <div class="col-sm-6">
                <textarea class="form-control" id="descOnProcess"></textarea>
              </div>
            </div>
          </div>
          <!------------------------------------------- DELIVERED -------------------------------------------->
          <div class="delivered" style="display: none">
            <h2>Delivered</h2>
            <div class="mb-3 row">
              <label for="inputReceiverName" class="col-sm-2 col-form-label"
                >Receiver name</label
              >
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control"
                  id="inputReceiverName"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputImage" class="col-sm-2 col-form-label"
                >Upload Image</label
              >
              <div class="col-sm-6">
                <input class="form-control" type="file" id="inputImage" />
              </div>
            </div>
          </div>
          <!------------------------------------------- CANCELLED -------------------------------------------->
          <div class="cancelled" style="display: none">
            <h2>Cancelled</h2>
            <div class="mb-3 row">
              <label for="alasanGagalKirim" class="col-sm-2 col-form-label"
                >Alasan gagal kirim</label
              >
              <div class="col-sm-6">
                <textarea class="form-control" id="alasanGagalKirim"></textarea>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputReturnedPool" class="col-sm-2 col-form-label"
                >Returned pool</label
              >
              <div class="col-sm-2">
                <select id="inputReturnedPool" class="form-select">
                  <option value="Jakarta">Jakarta</option>
                  <option value="Tangerang">Tangerang</option>
                  <option value="Depok">Depok</option>
                  <option value="Bogor">Bogor</option>
                </select>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="returnedStatus" class="col-sm-2 col-form-label"
                >Returned status</label
              >
              <div class="col-sm-6">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  id="returnedStatus"
                  value="true"
                />
              </div>
            </div>
          </div>
          <button type="submit" class="submit btn btn-primary">
            Update Status
          </button>
        </form>
      </div>
    </div>
    <footer id="footer">
      <div class="container">
        <h3>Download us at</h3>
        <div class="imaga-logo">
          <img src="../../src/images/Googleplay.png" alt="" />
          <img src="../../src/images/Applestore-removebg-preview.png" alt="" />
        </div>
        <div class="content">
          <h3>
            © 2023 JSE - Melacak Nomor Resi dengan Presisi. Hak Cipta
            Dilindungi.
          </h3>
          <h3>Hubungi Kami</h3>
          <h3>08123141237234</h3>
          <h3>JSEContact@gmail.com</h3>
        </div>
      </div>
    </footer>
    <script src="../checkAuth.js"></script>
    <script src="js/currentDelivery.js"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"
    ></script>
  </body>
</html>

*/

/*
body {
  font-family: "Roboto condensed", sans-serif;
}

nav {
  font-family: "Raleway", sans-serif;
  color: white !important;
  height: min-content;
}

nav .jse {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.5rem;
  color: #e21e2c;
}

nav .express {
  font-weight: 500;
  font-size: 1rem;
}

.right-nav a:hover {
  background-color: rgba(226, 30, 44, 0.7) !important;
  color: white;
}

.container-status {
  margin-bottom: 6rem;
}

.container h2 {
  margin: 2rem 0;
  font-weight: 700;
  color: #e21e2c;
  font-family: "Raleway", sans-serif;
}

.info {
  margin-bottom: 2rem;
}

input[type="radio"] {
  display: none;
}

.status-label {
  padding: 5px 10px;
  color: #aaa;
  font-weight: 600;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.1s;
}

#onProcess:checked ~ .label-1 {
  background-color: #fbbc04;
  border-radius: 5px;
  color: white;
  transition: background-color 0.5s;
}

#delivered:checked ~ .label-2 {
  background-color: #55cc77;
  border-radius: 5px;
  color: white;
  transition: background-color 0.5s;
}

#cancelled:checked ~ .label-3 {
  background-color: #ea4335;
  border-radius: 5px;
  color: white;
  transition: background-color 0.5s;
}

.on-process h2 {
  color: #fbbc04;
  font-weight: 600;
  margin-top: 3rem;
}

.delivered h2 {
  color: #55cc77;
  font-weight: 600;
  margin-top: 3rem;
}

.cancelled h2 {
  font-weight: 600;
  margin-top: 3rem;
}

.submit {
  margin-top: 2rem;
  border-radius: 4px;
  font-size: 1.4rem;
  border: none;
  padding: 7px 45px;
  font-weight: 500;
  background-color: #e21e2c;
}

.submit:hover,
.submit:focus {
  background-color: #ff4351 !important;
}

.logout {
  cursor: pointer;
}

#footer {
  display: flex;
  background-color: #2b3035;
  height: 0%;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  color: white;
  bottom: 0;
  position: sticky;
  top: 100%;
}

footer h3 {
  font-size: 20px;
}

footer img {
  height: 40px;
  width: 40px;
}

footer .content {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

*/
