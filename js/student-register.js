document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById('registrationForm');
const message = document.getElementById('message');

function setError(input, msg) {

const errorDiv = input.nextElementSibling;

if (errorDiv) errorDiv.innerText = msg;

input.classList.add("error-input");
input.classList.remove("success");

}

function setSuccess(input) {

const errorDiv = input.nextElementSibling;

if (errorDiv) errorDiv.innerText = "";

input.classList.add("success");
input.classList.remove("error-input");

}

function validateInputs() {

let valid = true;

const fullName = form.full_name;
const regno = form.registration_no;
const email = form.email;
const password = form.password;
const confirm = form.confirm_password;

/* ---------------- FULL NAME ---------------- */

if (fullName.value.trim() === "") {

setError(fullName, "Full name required");
valid = false;

} else {

setSuccess(fullName);

}

/* ---------------- REGISTRATION NUMBER ---------------- */

const regPattern = /^[0-9]{4}(FY|SY|TY|BE|DS)(CO|IT|ME|CE|CH|AID|ET)[0-9]{3}$/;

const regValue = regno.value.trim().toUpperCase();

if (regValue === "") {

setError(regno, "Registration number required");
valid = false;

} 
else if (!regPattern.test(regValue)) {

setError(regno, "Format example: 2025FYCO001");
valid = false;

}
else {

setSuccess(regno);

/* Detect Direct Second Year */

if (regValue.includes("DS")) {

console.log("Direct Second Year Student Detected");

}

}

/* ---------------- EMAIL ---------------- */

const emailPattern = /^[^ ]+@[^ ]+\.[a-zA-Z]{2,}$/;

if (email.value.trim() === "") {

setError(email, "Enter email");
valid = false;

}
else if (!emailPattern.test(email.value.trim())) {

setError(email, "Invalid email format");
valid = false;

}
else {

setSuccess(email);

}

/* ---------------- PASSWORD ---------------- */

const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

if (password.value.trim() === "") {

setError(password, "Enter password");
valid = false;

}
else if (!passPattern.test(password.value)) {

setError(password, "Password must be 8+ chars, include upper, lower, number, special");
valid = false;

}
else {

setSuccess(password);

}

/* ---------------- CONFIRM PASSWORD ---------------- */

if (confirm.value.trim() === "") {

setError(confirm, "Confirm your password");
valid = false;

}
else if (confirm.value !== password.value) {

setError(confirm, "Passwords do not match");
valid = false;

}
else {

setSuccess(confirm);

}

return valid;

}

/* ---------------- FORM SUBMIT ---------------- */

form.addEventListener('submit', function (e) {

e.preventDefault();

if (!validateInputs()) return;

const formData = new FormData(form);

fetch("studentregister.php", {

method: "POST",
body: formData

})
.then(res => res.json())
.then(data => {

if (data.status === "success") {

message.style.color = "green";
message.innerText = data.message;

setTimeout(() => {

window.location.href = "studentdashboards.php";

}, 2000);

}
else {

message.style.color = "red";
message.innerText = data.message;

if (data.field) {

const fieldInput = form[data.field];

if (fieldInput) setError(fieldInput, data.message);

}

}

})
.catch(err => {

console.error(err);

message.style.color = "red";
message.innerText = "Server error!";

});

});

});