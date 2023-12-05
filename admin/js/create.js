const submitBtn = document.querySelector(".submit");

submitBtn.addEventListener("click", (e) => {
  // e.preventDefault();

  // Package Information
  const form = document.getElementById("form");
  let resiInput = document.querySelector(".resi");
  const dateInput = document.getElementById("inputDate").value;
  const serviceTypes = form.elements["serviceType"];
  const packageWeight = document.getElementById("inputPackageWeight").value;

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

  if (
    !dateInput ||
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
    return;
  }

  alert("Package created.");
});
