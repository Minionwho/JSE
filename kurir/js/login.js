const baseUrl = "https://localhost:7023/courier/login";
const credentials = {
  courier_username: "kurir1",
  courier_password: "pass1",
};
const option = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(credentials),
};

async function fetchData() {
  try {
    const response = await fetch(baseUrl, option);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    data.forEach((courier) => {
      console.log("Courier Username:", courier.courier_username);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

let currentCourier,
  validInput = false;
const submitBtn = document.querySelector(".submit");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // check if input is empty
  validateInput();
  if (!usernameInput.value || !passwordInput.value) return;

  if (validInput) {
    couriers.forEach((courier) => {
      if (
        courier.courier_username === usernameInput.value &&
        courier.password === passwordInput.value
      ) {
        currentCourier = courier;
      }
    });

    if (!currentCourier) {
      alert("Invalid email or password");
      usernameInput.value = "";
      passwordInput.value = "";
      return;
    }
    console.log(currentCourier);
    window.location.assign("../kurir/history.html");
  }
});

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

  if (!passwordValue) setError(passwordInput, "Username is required");
  else setSuccess(passwordInput);
};
