"use strict";
console.log("holla");

const formInputs = document.querySelectorAll(".form-control");
const requestBtn = document.querySelector("#request-btn");

requestBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputsObj = {};
  formInputs.forEach((formInput) => {
    inputsObj[formInput.name] = formInput.value;
  });
});

const sendRequest = async (data) => {
  const res = await fetch("");
};
