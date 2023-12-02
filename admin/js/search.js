function searchTable() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase().replace("#", ""); // Biar kalo ketik #, ilang
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("th")[0]; // biar pas search th nya ga ilang
    if (td) {
      txtValue = td.textContent || td.innerText;

      txtValue = txtValue.replace("#", ""); // Ganti # jdi kosong kalo diketik

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
