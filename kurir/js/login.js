let validInput = false;
const submitBtn = document.querySelector(".submit");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // check if input is empty
  validateInput();
  if (!usernameInput.value || !passwordInput.value) return;

  if (validInput) {
    const baseUrl = "https://localhost:7023/courier/login";
    const jwt =
      "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiamFrYXJ0YSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMmYzMWI3MWEtYTMxMi00ZmFmLWI1OWEtMjdjZmViNGEwMmJkIiwicG9vbF9jaXR5IjoiSmFrYXJ0YSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkNvdXJpZXIiLCJleHAiOjE3MDE4MDExNTR9.FAXpeyQ2KlI1pLqL5vY3PMxGm_QsVOHpvc-ZYnsfsxEBRk77a727Ns13lFPEov-oBWUhZ1flvhQyO1Hr9yiv7g";
    localStorage.setItem("jwtToken", jwt);
    const credentials = {
      courier_username: usernameInput.value,
      courier_password: passwordInput.value,
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
          alert("Invalid username or password");
          usernameInput.value = "";
          passwordInput.value = "";
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
});

// ---------------------------------------- VALIDATE ----------------------------------------
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
