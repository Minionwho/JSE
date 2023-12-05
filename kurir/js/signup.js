let couriers = [
  {
    username: "kurir1",
    password: "kurir1pass",
    poolCity: "Jakarta",
    phone: "12112",
  },
  {
    username: "kurir2",
    password: "kurir2pass",
    poolCity: "Tangerang",
    phone: "12131",
  },
];

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
    // check username already taken or not
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
