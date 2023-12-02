const endpoint = "https://localhost:7023/delivery";
var shipmentData;

function populateTable() {
    var tableBody = document.querySelector("#myTable tbody");

    // Ganti URL_API dengan URL sesuai dengan API yang ingin Anda gunakan
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        // Periksa apakah data dari API tidak kosong
        if (data && data.length > 0) {
          data.forEach(function (shipment) {
            var row = tableBody.insertRow();
            row.innerHTML = `<th scope="row">${shipment.tracking_number}</th>
                            <td>${shipment.sender_name}</td>
                            <td>${shipment.intended_receiver_name}</td>
                            <td>${shipment.receiver_address}</td>
                            <td>${getStatusBadge(shipment.delivery_status)}</td>`;
          });
        } else {
          console.error("Error: Data from API is undefined or empty.");
        }
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }


// Function to generate status badge based on status
function getStatusBadge(delivery_status) {
    var badgeClass = "";
    var badgeContent = "";

    switch (delivery_status) {
        case "package_delivered":
            badgeClass = "deliver badge badge-success";
            badgeContent = "Delivered";
            break;
        case "delivery_failed":
            badgeClass = "cancel badge badge-danger";
            badgeContent = '<a href="/index.html">Canceled</a>';
            break;
        case "returned_to_pool":
            badgeClass = "cancel badge badge-danger";
            badgeContent = '<a href="/index.html">Canceled</a>';
            break;
        case "on_sender_pool":
            badgeClass = "onprocess badge badge-warning";
            badgeContent = "On Process";
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

    return `<span class="${badgeClass}">${badgeContent}</span> <a href="/index.html" class="i"><span class="info badge badge-info">i</span><a>`;
}

window.onload = function () {
    populateTable();
  };