document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById("detailsForm");
const message = document.getElementById("message");

const dob = document.getElementById("dob");
const age = document.getElementById("age");

const internshipSelect = document.getElementById("internshipSelect");
const internshipCertificate = document.getElementById("internshipCertificate");

const finalCgpa = document.getElementById("finalCgpa");

/* FILE INPUTS */

const photoInput = document.getElementById("profileImage");
const photoPreview = document.getElementById("previewImg");

const internshipFile = document.getElementById("internCert");
const marksheet = document.getElementById("marksheet");

/* FILE UI */

const fileName = document.getElementById("fileName");
const removePhoto = document.getElementById("removePhoto");

const marksheetName = document.getElementById("marksheetName");
const removeMarksheet = document.getElementById("removeMarksheet");

removePhoto.style.display = "none";
removeMarksheet.style.display = "none";

/* REGISTRATION NUMBER */

const regno = document.getElementById("regno");
const branchSelect = document.getElementById("branch");

/* SEM GROUPS */

const sem1 = document.getElementById("sem1Group");
const sem2 = document.getElementById("sem2Group");

let isDS = false;

/* ---------------- AUTO BRANCH + DS DETECTION ---------------- */

if (regno) {

let reg = regno.value.toUpperCase().trim();

if (branchSelect) {

if (reg.includes("CO")) branchSelect.value = "Computer Engineering";
else if (reg.includes("IT")) branchSelect.value = "Information Technology";
else if (reg.includes("ME")) branchSelect.value = "Mechanical Engineering";
else if (reg.includes("CE")) branchSelect.value = "Civil Engineering";
else if (reg.includes("CH")) branchSelect.value = "Chemical Engineering";
else if (reg.includes("AID")) branchSelect.value = "Artificial Intelligence and Data Science";
else if (reg.includes("ET")) branchSelect.value = "Electronics & Telecommunication Engineering";

}

/* DIRECT SECOND YEAR */

if (reg.includes("DS")) {

isDS = true;

if (sem1) sem1.style.display = "none";
if (sem2) sem2.style.display = "none";

if (form["sem1_cgpa"]) form["sem1_cgpa"].value = "";
if (form["sem2_cgpa"]) form["sem2_cgpa"].value = "";

}

}

/* ---------------- ERROR FUNCTIONS ---------------- */

function setError(input,msg){

const parent=input.parentElement;
const error=parent.querySelector(".error");

input.classList.add("error-input");
input.classList.remove("success");

if(error) error.innerText=msg;

}

function setSuccess(input){

const parent=input.parentElement;
const error=parent.querySelector(".error");

input.classList.remove("error-input");
input.classList.add("success");

if(error) error.innerText="";

}

/* ---------------- PHOTO PREVIEW ---------------- */

photoInput.addEventListener("change",function(){

const file=this.files[0];

if(file){

const allowed=["image/jpeg","image/png","image/jpg","image/jfif"];

if(!allowed.includes(file.type)){

setError(photoInput,"Only JPG or PNG allowed");
photoInput.value="";
return;

}

if(file.size > 2 * 1024 * 1024){

setError(photoInput,"Photo must be less than 2MB");
photoInput.value="";
return;

}

fileName.innerText=file.name;
removePhoto.style.display="inline";

const reader=new FileReader();

reader.onload=function(e){

photoPreview.src=e.target.result;
photoPreview.style.display="block";

};

reader.readAsDataURL(file);

setSuccess(photoInput);

}

});

removePhoto.addEventListener("click",function(){

photoInput.value="";
photoPreview.style.display="none";
fileName.innerText="No file selected";
removePhoto.style.display="none";

});

/* ---------------- FILE VALIDATION ---------------- */

function validatePDF(input){

const file=input.files[0];

if(file){

if(file.type!=="application/pdf"){

setError(input,"Only PDF allowed");
input.value="";
return false;

}

if(file.size > 5 * 1024 * 1024){

setError(input,"PDF must be less than 5MB");
input.value="";
return false;

}

setSuccess(input);
return true;

}

return true;

}

internshipFile.addEventListener("change",function(){

if(!validatePDF(this)) return;

if(this.files[0]){
document.getElementById("internCertName").innerText=this.files[0].name;
}

});

marksheet.addEventListener("change",function(){

if(!validatePDF(this)) return;

if(this.files[0]){
marksheetName.innerText=this.files[0].name;
removeMarksheet.style.display="inline";
}

});

removeMarksheet.addEventListener("click",function(){

marksheet.value="";
marksheetName.innerText="No file selected";
removeMarksheet.style.display="none";

});

/* ---------------- AGE CALCULATION ---------------- */

dob.addEventListener("change",function(){

const birth=new Date(this.value);
const today=new Date();

let a=today.getFullYear()-birth.getFullYear();

const m=today.getMonth()-birth.getMonth();

if(m<0||(m===0&&today.getDate()<birth.getDate())) a--;

age.value=a;

});

/* ---------------- INTERNSHIP SHOW/HIDE ---------------- */

internshipSelect.addEventListener("change",function(){

if(this.value==="yes"){
internshipCertificate.classList.remove("hidden");
}
else{
internshipCertificate.classList.add("hidden");
}

});

/* ---------------- CGPA CALCULATION ---------------- */

function calculateCGPA(){

let total=0;
let count=0;

let startSem=isDS ? 3 : 1;

for(let i=startSem;i<=8;i++){

let val=parseFloat(form["sem"+i+"_cgpa"].value);

if(!isNaN(val)){
total+=val;
count++;
}

}

let final=0;

if(count>0){
final=(total/count).toFixed(2);
}

finalCgpa.value=final;

return final;

}
/* 🔥 CGPA LIVE TRIGGER FIX */

for(let i=1;i<=8;i++){
    if(form["sem"+i+"_cgpa"]){
        form["sem"+i+"_cgpa"].addEventListener("input", calculateCGPA);
    }
}

/* ---------------- VALIDATION ---------------- */

function validateForm(){

let valid=true;

if(form.first_name.value.trim()===""){
setError(form.first_name,"First name required");
valid=false;
}else setSuccess(form.first_name);

if(form.last_name.value.trim()===""){
setError(form.last_name,"Last name required");
valid=false;
}else setSuccess(form.last_name);

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(form.email.value)){
setError(form.email,"Enter valid email");
valid=false;
}else setSuccess(form.email);

const phonePattern=/^[0-9]{10}$/;

if(!phonePattern.test(form.phone.value)){
setError(form.phone,"Enter valid 10 digit phone");
valid=false;
}else setSuccess(form.phone);

if(form.address.value.trim()===""){
setError(form.address,"Address required");
valid=false;
}else setSuccess(form.address);

if(form.dob.value===""){
setError(form.dob,"Select date of birth");
valid=false;
}else setSuccess(form.dob);

if(form.tenth_percentage.value===""){
setError(form.tenth_percentage,"Enter 10th percentage");
valid=false;
}else setSuccess(form.tenth_percentage);

if(form.twelfth_percentage.value===""){
setError(form.twelfth_percentage,"Enter 12th percentage");
valid=false;
}else setSuccess(form.twelfth_percentage);

if(form.backlogs.value<0){
setError(form.backlogs,"Backlogs cannot be negative");
valid=false;
}else setSuccess(form.backlogs);

if(form.skills.value.trim()===""){
setError(form.skills,"Enter your skills");
valid=false;
}else setSuccess(form.skills);

if(marksheet.files.length===0){
setError(marksheet,"Upload combined marksheet PDF");
valid=false;
}else setSuccess(marksheet);

if(internshipSelect.value==="yes"){
if(internshipFile.files.length===0){
setError(internshipFile,"Upload internship certificate");
valid=false;
}else setSuccess(internshipFile);
}

if(photoInput.files.length===0){
setError(photoInput,"Upload profile photo");
valid=false;
}else setSuccess(photoInput);

return valid;

}

/* REMOVE ERROR ON INPUT */

const inputs=form.querySelectorAll("input,textarea,select");

inputs.forEach(function(input){

input.addEventListener("input",function(){

const parent=this.parentElement;
const error=parent.querySelector(".error");

if(error) error.innerText="";

this.classList.remove("error-input");

});

});

/* ---------------- FORM SUBMIT ---------------- */

form.addEventListener("submit",function(e){

e.preventDefault();

if(!validateForm()){
message.style.color="red";
message.innerText="Please correct errors above";
return;
}

const final=calculateCGPA();

const formData=new FormData(form);
formData.set("final_cgpa",final);

message.style.color="blue";
message.innerText="Saving...";

fetch("save_studentdetails.php",{
method:"POST",
body:formData
})
.then(res=>res.text())
.then(text=>{

let data=JSON.parse(text);

message.style.color=data.status==="success"?"green":"red";
message.innerText=data.message;

if(data.status==="success"){

setTimeout(()=>{
window.location.href="studentdashboards.php";
},1500);

}

})
.catch(()=>{

message.style.color="red";
message.innerText="Server error";

});

});

});