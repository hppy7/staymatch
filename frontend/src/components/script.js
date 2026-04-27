document.addEventListener("DOMContentLoaded", () => {

const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");


// TAB SWITCH

loginTab.addEventListener("click", () => {

loginForm.style.display = "block";
signupForm.style.display = "none";

loginTab.classList.add("active");
signupTab.classList.remove("active");

});


signupTab.addEventListener("click", () => {

loginForm.style.display = "none";
signupForm.style.display = "block";

signupTab.classList.add("active");
loginTab.classList.remove("active");

});


// SIGNUP

signupForm.addEventListener("submit", (e) => {

e.preventDefault();

const name = document.getElementById("reg-name").value;
const email = document.getElementById("reg-email").value;
const password = document.getElementById("reg-pass").value;

const user = {
name,
email,
password
};

localStorage.setItem("stayMatchUser", JSON.stringify(user));

window.location.href = "dashboard.html";

});


// LOGIN

loginForm.addEventListener("submit", (e) => {

e.preventDefault();

const email = document.getElementById("login-email").value;
const password = document.getElementById("login-pass").value;

const storedUser = JSON.parse(localStorage.getItem("stayMatchUser"));

if(storedUser && storedUser.email === email && storedUser.password === password){

window.location.href = "dashboard.html";

}else{

alert("User not found. Please sign up first.");

}

});

});