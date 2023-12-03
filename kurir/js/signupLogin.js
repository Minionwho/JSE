let kurirs = [
  { username: "kurir1", password: "kurir1pass" },
  { username: "kurir2", password: "kurir2pass" },
];
let currentKurir;

function kurirSignup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password != confirmPassword) {
    alert("Password don't match.");
    return;
  }

  if (kurirs.some((kurir) => kurir.username === username)) {
    alert("Username already taken. Please choose another.");
  } else {
    kurirs.push({ username: username, password: password });
    console.log("Sign Up:", username, password);
  }
}

function kurirLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  let found = false;

  kurirs.forEach((kurir) => {
    if (kurir.username == username && kurir.password == password) {
      found = true;
      currentKurir = kurir;
      alert("kurir found");
      window.location.assign("../kurir/history.html");
    }
  });

  if (!found) alert("Invalid username or password");
}

console.log(kurirs);
console.log(admins);
