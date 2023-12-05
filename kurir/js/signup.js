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
    !phoneInput.value
  )
    return;
  if (!poolCityInput) {
    alert("Input pool city");
    return;
  }

  if (confirmPassword.value !== passwordInput.value) return;

  if (validInput) {
    const baseUrl = "https://localhost:7023/courier/register";
    const jwt =
      "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiamFrYXJ0YSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMmYzMWI3MWEtYTMxMi00ZmFmLWI1OWEtMjdjZmViNGEwMmJkIiwicG9vbF9jaXR5IjoiSmFrYXJ0YSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkNvdXJpZXIiLCJleHAiOjE3MDE4MDExNTR9.FAXpeyQ2KlI1pLqL5vY3PMxGm_QsVOHpvc-ZYnsfsxEBRk77a727Ns13lFPEov-oBWUhZ1flvhQyO1Hr9yiv7g";
    const credentials = {
      courier_username: usernameInput.value,
      courier_password: passwordInput.value,
      courier_confirm_password: confirmPassword.value,
      pool_city: poolCityInput,
      courier_phone: phoneInput.value,
    };
    const headers = new Headers({
      Authorization: "Bearer " + jwt,
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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(jwt);
        console.log(data);
        window.location.assign("../kurir/history.html");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
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
