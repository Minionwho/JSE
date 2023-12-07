const { jwtToken, jwtData } = checkAuth("Courier", window.location.href);

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

const [deliveryData, setDeliveryData] = useState({});

document.addEventListener("DOMContentLoaded", () => {
  const trackingNumber = document.getElementById("resi");
  const arrivalDate = document.getElementById("date");
  const namaPenerima = document.getElementById("nama-penerima");
  const nomorTelepon = document.getElementById("nomor-telepon");
  const alamatPenerima = document.getElementById("alamat");

  const baseUrl = "https://localhost:7023/courier/current_delivery";

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${jwtToken}`,
    },
  };

  fetch(baseUrl, options)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        alert("You do not have any current deliveries!");
      }
    })
    .then((data) => {
      setDeliveryData(data);
      trackingNumber.innerText = data.tracking_number;
      arrivalDate.innerText = data.arrival_date ? data.arrival_date : "N/A";
      namaPenerima.innerText = data.intended_receiver_name;
      nomorTelepon.innerText - data.receiver_phone_number;
      alamatPenerima.innerText = data.receiver_address;
    });

  const packagedDeliveredForm = document.getElementById(
    "packagedDeliveredForm"
  );
  const inputImage = document.getElementById("formFile");
  const inputActualReceiver = document.getElementById("inputActualReceiver");
  packagedDeliveredForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const deliveryBody = {
      tracking_number: deliveryData().tracking_number,
      receiver_name: inputActualReceiver.value,
    };
    console.log(deliveryBody);
    const imageBody = new FormData();
    if (inputImage.files.length > 0) {
      imageBody.append("image", inputImage.files[0]);
    } else {
      alert("You must upload image proof!");
      return; // stops fetching execution
    }
    const imageUploadURL = `https://localhost:7023/image/${
      deliveryData().tracking_number
    }`;
    const successDeliveryURL =
      "https://localhost:7023/delivery/successDelivery";
    const cancelledDeliveryURL =
      "https://localhost:7023/delivery/failedDelivery";

    const imageUploadoptions = {
      method: "POST",
      body: imageBody,
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    };
    const successDeliveryURLoptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${jwtToken}`,
      },
      body: JSON.stringify(deliveryBody),
    };
    const cancelledDeliveryURLoptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${jwtToken}`,
      },
      body: JSON.stringify(deliveryBody),
    };

    fetch(imageUploadURL, imageUploadoptions)
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          alert("Error uploading image proof, please try again.");
        }
      })
      .then((data) => {
        console.log(data);
        console.log("reached imageSuccessCheck");

        // fetch post if image is successful
        fetch(successDeliveryURL, successDeliveryURLoptions)
          .then((deliveryResponse) => {
            console.log(deliveryResponse);

            if (deliveryResponse.status == 200) {
              return deliveryResponse.json();
            } else {
              alert("Error updating package status! Please try again.");
            }
          })
          .then((dataResponse) => {
            console.log(deliveryData);
            alert(dataResponse.message_text);
          });
      });
  });
});
