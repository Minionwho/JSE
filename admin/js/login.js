const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitBtn = document.querySelector(".submit");
let validInput = false;

submitBtn.addEventListener("click", (e) => {
	e.preventDefault();

	// check if input is empty
	validateInput();
	if (!usernameInput.value || !passwordInput.value) return;
	const url = window.location.search;
	const params = new URLSearchParams(url);
	const redirect = params.get("redirect");
	if (validInput) {
		const baseUrl = "https://localhost:7023/auth/admin/login";
		const credentials = {
			admin_username: usernameInput.value,
			admin_password: passwordInput.value,
		};
		const headers = new Headers({
			"Content-Type": "application/json",
		});

		async function fetchData() {
			try {
				const response = await fetch(baseUrl, {
					method: "POST",
					headers: headers,
					body: JSON.stringify(credentials),
				});

				if (!response.ok) {
					alert("Invalid username or password");
					usernameInput.value = "";
					passwordInput.value = "";
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();
				const jwt = data.token;
				localStorage.setItem("jwtToken", jwt);
				console.log(jwt);
				console.log(data);
				if (redirect) {
					window.location.assign(redirect);
				} else {
					window.location.assign("/admin/dashboard/create.html");
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
		fetchData();
	}
});

// --------------------------------------- VALIDATION ---------------------------------------
const setError = (element, message) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = message;
	inputControl.classList.add("error");
	inputControl.classList.remove("success");

	validInput = false;
};

const setSuccess = (element) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = "";
	inputControl.classList.add("success");
	inputControl.classList.remove("add");

	validInput = true;
};

const validateInput = () => {
	const usernameValue = usernameInput.value;
	const passwordValue = passwordInput.value;

	if (!usernameValue) setError(usernameInput, "Username is required");
	else setSuccess(usernameInput);

	if (!passwordValue) setError(passwordInput, "Password is required");
	else setSuccess(passwordInput);
};
