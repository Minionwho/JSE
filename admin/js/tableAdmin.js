const endpoint = "https://reqres.in/api/users";
var shipmentData;

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    shipmentData = data.data; // Sesuaikan dengan struktur data yang benar
    populateTable();
  })
  .catch((error) => console.error("Error fetching data:", error));

// Function to populate the table with data
function populateTable() {
  var tableBody = document.querySelector("#myTable tbody");

  shipmentData.forEach(function (shipment) {
    var row = tableBody.insertRow();
    row.innerHTML = `<th scope="row">${shipment.id}</th>
                        <td>${shipment.sender}</td>
                        <td>${shipment.receiver}</td>
                        <td>${shipment.address}</td>
                        <td>${getStatusBadge(shipment.status)}</td>`;
  });
}

// Function to generate status badge based on status
function getStatusBadge(status) {
  var badgeClass = "";
  var badgeContent = "";

  switch (status) {
    case "Delivered":
      badgeClass = "deliver badge badge-success";
      badgeContent = "Delivered";
      break;
    case "Canceled":
      badgeClass = "cancel badge badge-danger";
      badgeContent = '<a href="/index.html">Canceled</a>';
      break;
    case "On Process":
      badgeClass = "onprocess badge badge-warning";
      badgeContent = "On Process";
      break;
    default:
      badgeClass = "badge badge-secondary";
      badgeContent = "Unknown";
  }

  return `<span class="${badgeClass}">${badgeContent}</span> <a href="/index.html" class="i"><span class="info badge badge-light">i</span><a>`;
}
