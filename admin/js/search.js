function searchTable() {
	let input, filter, table, tr, td, i, j, txtValue;
	input = document.getElementById("searchInput");
	filter = input.value.toUpperCase().replace("#", ""); // Biar kalo ketik #, ilang
	table = document.getElementById("myTable");
	tr = table.getElementsByTagName("tr");

	for (i = 1; i < tr.length; i++) {
		let displayRow = false; // Flag to track if the row should be displayed

		// Loop through all the columns in each row
		for (j = 0; j < tr[i].cells.length; j++) {
			td = tr[i].cells[j];
			if (td) {
				txtValue = td.textContent || td.innerText;
				txtValue = txtValue.replace("#", ""); // Ganti # jadi kosong kalo diketik

				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					displayRow = true;
					break; // If the filter matches in any column, display the row and exit the inner loop
				}
			}
		}

		// Set the display style for the row based on the flag
		tr[i].style.display = displayRow ? "" : "none";
	}
}
