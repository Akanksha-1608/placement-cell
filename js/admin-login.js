document.addEventListener("DOMContentLoaded",function(){

const form=document.getElementById("adminLoginForm");
const message=document.getElementById("message");

form.addEventListener("submit",function(e){

e.preventDefault();

const formData=new FormData(form);

fetch("adminlogin.php",{
method:"POST",
body:formData
})

.then(response=>response.json())

.then(data=>{

if(data.status==="success"){

message.style.color="white";
message.innerText=data.message;

setTimeout(function(){

window.location.href="admindashboard.php";

},1500);

}
else{

message.style.color="yellow";
message.innerText=data.message;

}

})

.catch(function(){

message.style.color="yellow";
message.innerText="Server error";

});

});

});