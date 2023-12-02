var shipmentData = [
  { id: "#A218VT24", tanggal: "22 - 10 - 2023", status: "Delivered" },
  { id: "#B45CSH64", tanggal: "01 - 2 - 2023", status: "On Process" },
  { id: "#C12EAA38", tanggal: "13 - 3 - 2023", status: "Canceled" },
  { id: "#D421CD22", tanggal: "25 - 5 - 2023", status: "Back to Pool" },
];

// Function to populate the table with data
function populateTable() {
  var tableBody = document.querySelector("#myTable tbody");

  shipmentData.forEach(function (shipment) {
    var row = tableBody.insertRow();
    row.innerHTML = `<th scope="row">${shipment.id}</th>
                        <td>${shipment.tanggal}</td>
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
    case "Back to Pool":
      badgeClass = "cancel badge badge-danger";
      badgeContent = "Back to Pool";
      break;
    default:
      badgeClass = "badge badge-secondary";
      badgeContent = "Unknown";
  }

  return `<span class="${badgeClass}">${badgeContent}</span> <a href="/index.html" class="i"><span class="info badge badge-light">i</span><a>`;
}

// Call the function to populate the table
populateTable();
