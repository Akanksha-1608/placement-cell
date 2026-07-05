document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

function setError(input,msg){
const errorDiv = input.nextElementSibling;
if(errorDiv) errorDiv.innerText = msg;
input.classList.add("error-input");
input.classList.remove("success");
}

function setSuccess(input){
const errorDiv = input.nextElementSibling;
if(errorDiv) errorDiv.innerText = "";
input.classList.add("success");
input.classList.remove("error-input");
}

function validateInputs(){

let valid = true;

const fullName = form.full_name;
const adminReg = form.admin_reg_no;
const email = form.email;
const password = form.password;
const confirm = form.confirm_password;

/* FULL NAME (First Middle Last) */

const namePattern = /^[A-Za-z]+( [A-Za-z]+){1,2}$/;

if(fullName.value.trim() === ""){
setError(fullName,"Full name required");
valid=false;
}
else if(!namePattern.test(fullName.value.trim())){
setError(fullName,"Enter First Middle Last name");
valid=false;
}
else{
setSuccess(fullName);
}

/* ADMIN REG NUMBER */

const regPattern = /^[A-Z]{2}[0-9]{3}$/;

if(adminReg.value.trim() === ""){
setError(adminReg,"Admin ID required");
valid=false;
}
else if(!regPattern.test(adminReg.value.trim().toUpperCase())){
setError(adminReg,"Format: TS001");
valid=false;
}
else{
setSuccess(adminReg);
}

/* EMAIL */

const emailPattern = /^[^ ]+@[^ ]+\.[a-zA-Z]{2,}$/;

if(email.value.trim()===""){
setError(email,"Enter email");
valid=false;
}
else if(!emailPattern.test(email.value)){
setError(email,"Invalid email");
valid=false;
}
else{
setSuccess(email);
}

/* PASSWORD */

const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

if(password.value===""){
setError(password,"Enter password");
valid=false;
}
else if(!passPattern.test(password.value)){
setError(password,"Password must contain uppercase, lowercase, number & symbol");
valid=false;
}
else{
setSuccess(password);
}

/* CONFIRM PASSWORD */

if(confirm.value===""){
setError(confirm,"Confirm password");
valid=false;
}
else if(confirm.value !== password.value){
setError(confirm,"Passwords do not match");
valid=false;
}
else{
setSuccess(confirm);
}

return valid;
}

form.addEventListener("submit",function(e){

e.preventDefault();

if(!validateInputs()) return;

const formData = new FormData(form);

fetch("adminregister.php",{
method:"POST",
body:formData
})
.then(res=>res.json())
.then(data=>{

if(data.status==="success"){

message.style.color="green";
message.innerText=data.message;

setTimeout(()=>{
window.location.href="admindashboard.php";
},2000);

}
else{

message.style.color="red";
message.innerText=data.message;

if(data.field){
const fieldInput = form[data.field];
if(fieldInput) setError(fieldInput,data.message);
}

}

})
.catch(()=>{
message.style.color="red";
message.innerText="Server error!";
});

});

});