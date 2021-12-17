"use strict";

const moment = require("moment");

console.log("Start Program Holla!");

const formInputs = document.querySelectorAll(".form-control");
const requestBtn = document.querySelector("#request-btn");
const requestsContainer = document.querySelector("#listOfRequests");
window.onload = function () {
  const requests = getRequests();
  renderRequests(requests);
};

requestBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputsObj = {};
  formInputs.forEach((formInput) => {
    inputsObj[formInput.name] = formInput.value;
  });
  sendRequest(inputsObj);
});

const sendRequest = async (enteredData) => {
  const res = await fetch("http://localhost:7777/video-request", {
    method: "POST",
    body: JSON.stringify(enteredData),
    headers: { "Content-Type": " application/json" },
  });
  const data = await res.json();
  console.log(data);
  // TODO: bind the dom
};

const getRequests = async () => {
  const res = await fetch("http://localhost:7777/video-request");
  const data = await res.json();
  console.log(data);
  return data;
};

const renderRequests = (data) => {
  data.forEach((item) => {
    `      <div class='card mb-3'>
        <div class='card-body d-flex justify-content-between flex-row'>
          <div class='d-flex flex-column'>
            <h3>${item.topic_title}</h3>
            <p class='text-muted mb-2'>${item.topic_details}</p>
            <p class='mb-0 text-muted'>
              <strong>${item.expected_result}:</strong>
              Dummy expected result text
            </p>
          </div>
          <div class='d-flex flex-column text-center'>
            <a class='btn btn-link'>🔺</a>
            <h3>0</h3>
            <a class='btn btn-link'>🔻</a>
          </div>
        </div>
        <div class='card-footer d-flex flex-row justify-content-between'>
          <div>
            <span class='text-info'>NEW</span>
            &bullet; added by
            <strong>${item.author_name}</strong>
            on
            <strong>${moment(item.submit_date).format(
              "ddd MMM M y"
            )}Sat Apr 11 2020</strong>
          </div>
          <div class='d-flex justify-content-center flex-column 408ml-auto mr-2'>
            <div class='badge badge-success'>Beginners</div>
          </div>
        </div>
      </div>`;
  });
};
