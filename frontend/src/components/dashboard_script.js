document.addEventListener("DOMContentLoaded", () => {

const storedUser = JSON.parse(localStorage.getItem("stayMatchUser"));

if(!storedUser){

window.location.href = "index.html";
return;

}

const greeting = document.getElementById("user-greeting");

if(greeting){

greeting.innerText = `Welcome back, ${storedUser.name} 👋`;

}

});



function openMatching(){

window.location.href = "matching.html";

}



function logout(){

localStorage.removeItem("stayMatchUser");

window.location.href = "index.html";

}



window.logout = logout;
window.openMatching = openMatching;