const form = document.getElementById("form");
const submitBtn = document.querySelector(".submit");
const serviceTypes = form.elements["serviceType"];

let packageWeight = document.getElementById("inputPackageWeight");
let optionValue = document.querySelectorAll("option-value");
let dateInput = document.getElementById("inputDate");

packageWeight.addEventListener("input", async () => {
  calcTotalCost();
});

// get jwt to determine sendercity;
const { jwtToken, jwtData } = checkAuth("Admin", window.location.href);
console.log(jwtData);
const inputSenderCity = document.getElementById("inputSenderCity");
inputSenderCity.value = jwtData.pool_city;
console.log(jwtData.pool_city);
inputSenderCity.setAttribute("disabled", "disabled");
// set sending date to today
const today = new Date().toISOString().slice(0, 10);
dateInput.value = today;

document.addEventListener("DOMContentLoaded", () => {});
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Package Information
  let packageWeight = document.getElementById("inputPackageWeight").value;
  let totalCost = document.querySelector(".total");

  // Sender Information
  const senderName = document.getElementById("inputSenderName").value;
  const senderAddress = document.getElementById("inputSenderAddress").value;
  const senderPhone = document.getElementById("inputSenderPhone").value;
  const senderCity = document.getElementById("inputSenderCity").value;

  // Receiver Information
  const intendedReceiverName = document.getElementById(
    "inputIntendedReceiverName"
  ).value;
  const receiverAddress = document.getElementById("inputReceiverAddress").value;
  const receiverPhone = document.getElementById("inputReceiverPhone").value;
  const receiverCity = document.getElementById("inputReceiverCity").value;
  let resi, serviceType;

  for (let i = 0; i < serviceTypes.length; i++) {
    if (serviceTypes[i].checked) serviceType = serviceTypes[i].value;
  }

  let decimalPart = Number(packageWeight) - Math.floor(Number(packageWeight));
  const roundedDecimalPart = parseFloat(decimalPart.toFixed(5));
  let roundPackageWeight =
    roundedDecimalPart >= 0.3
      ? Math.ceil(packageWeight)
      : Math.floor(packageWeight);
  const deliveryPrice =
    serviceType === "REG"
      ? roundPackageWeight * 5000
      : roundPackageWeight * 5000 + 5000;

  totalCost.innerHTML = formatRupiah(parseInt(deliveryPrice));
  if (
    !serviceType ||
    !packageWeight ||
    !senderName ||
    !senderAddress ||
    !senderPhone ||
    !senderCity ||
    !intendedReceiverName ||
    !receiverAddress ||
    !receiverPhone ||
    !receiverCity
  ) {
    alert("Check the missing informations, and try again!");
    return;
  }

  const baseUrl = "https://localhost:7023/create_delivery";
  const credentials = {
    sender_name: senderName,
    sender_phone: senderPhone,
    sender_address: senderAddress,
    intended_receiver_name: intendedReceiverName,
    receiver_phone: receiverPhone,
    receiver_address: receiverAddress,
    service_type: serviceType,
    package_weight: parseInt(packageWeight),
    delivery_price: parseInt(deliveryPrice),
    pool_sender_city: senderCity,
    pool_receiver_city: receiverCity,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  async function fetchData() {
    try {
      const response = await fetch(baseUrl, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      alert("Package created.");
      // window.location.assign("../admin/dashboard/create.html");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchData();
});

function calcTotalCost() {
  let serviceType;
  let packageWeight = document.getElementById("inputPackageWeight").value;
  let totalCost = document.querySelector(".total");
  for (let i = 0; i < serviceTypes.length; i++)
    if (serviceTypes[i].checked) serviceType = serviceTypes[i].value;

  let decimalPart = Number(packageWeight) - Math.floor(Number(packageWeight));
  const roundedDecimalPart = parseFloat(decimalPart.toFixed(5));
  let roundPackageWeight =
    roundedDecimalPart >= 0.3
      ? Math.ceil(packageWeight)
      : Math.floor(packageWeight);
  const deliveryPrice =
    serviceType === "REG"
      ? roundPackageWeight * 5000
      : roundPackageWeight * 5000 + 5000;

  totalCost.innerHTML = formatRupiah(parseInt(deliveryPrice));
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
