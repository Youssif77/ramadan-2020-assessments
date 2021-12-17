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
  sendRequest(inputsObj);
});

const sendRequest = async (enteredData) => {
  await fetch("http://localhost:7777/video-request", {
    method: "POST",
    body: JSON.stringify(enteredData),
    header: { "Content-Type": "application/json" },
  });
};
const getRequests = async () => {
  const res = await fetch("http://localhost:7777/video-request");
  const data = await res.json();
  console.log(data);
};
getRequests();
