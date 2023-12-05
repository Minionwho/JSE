/*let currentCourier,
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

    const baseUrl = "https://localhost:7023/courier/login";
    const credentials = {
      courier_username: "bekasi",
      courier_password: "bekasi",
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
        const jwt = data.token;
        console.log(jwt);

        data.forEach((courier) => {
          console.log("Courier Username:", courier.courier_username);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

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

*/

/*
// let couriers = [
//   {
//     username: "kurir1",
//     password: "kurir1pass",
//     poolCity: "Jakarta",
//     phone: "12112",
//   },
//   {
//     username: "kurir2",
//     password: "kurir2pass",
//     poolCity: "Tangerang",
//     phone: "12131",
//   },
// ];

const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const phoneInput = document.getElementById("phone");
const submitBtn = document.querySelector(".submit");
const cities = form.elements["city"];
let currentCourier,
  poolCityInput,
  validInput = false;

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  for (let i = 0; i < cities.length; i++) {
    if (cities[i].checked) poolCityInput = cities[i].value;
  }

  // check if input is empty
  validateInput();
  if (
    !usernameInput.value ||
    !passwordInput.value ||
    !confirmPassword.value ||
    !phoneInput.value ||
    !poolCityInput
  ) {
    if (!poolCityInput) alert("Input pool city");
    return;
  }

  if (confirmPassword.value !== passwordInput.value) return;

  if (validInput) {
    // check if username already taken or not
    if (couriers.some((courier) => courier.username === usernameInput.value)) {
      alert("Username already taken. Please choose another.");
      return;
    }

    couriers.push({
      username: usernameInput.value,
      password: passwordInput.value,
      poolCity: poolCityInput,
      phone: phoneInput.value,
    });

    currentCourier = couriers[couriers.length - 1];
    console.log(couriers);
    console.log(currentCourier);
    window.location.assign("../kurir/currentDelivery.html");
  }
  return;
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
  const confirmPasswordValue = confirmPassword.value;
  const phoneValue = phoneInput.value;

  if (!usernameValue) setError(usernameInput, "Username is required");
  else setSuccess(usernameInput);

  if (!passwordValue) setError(passwordInput, "Password is required");
  else setSuccess(passwordInput);

  if (!confirmPasswordValue)
    setError(confirmPassword, "Confirm Password is required");
  else if (confirmPasswordValue !== passwordValue)
    setError(confirmPassword, "Password doesn't match");
  else if (confirmPasswordValue === passwordValue) {
    setError(confirmPassword, "");
    setSuccess(passwordInput);
  }

  if (!phoneValue) setError(phoneInput, "Phone is required");
  else setSuccess(phoneInput);
};

*/
