"use strict";

import moment from "./node_modules/moment/dist/moment.js";
console.log("Start Program Holla!");

const formInputs = document.querySelectorAll(".form-control");
const requestBtn = document.querySelector("#request-btn");
const requestsContainer = document.querySelector("#listOfRequests");

window.onload = async function () {
  const requests = await getRequests();
  renderRequests(requests);
};

requestBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const inputsObj = {};
  formInputs.forEach((formInput) => {
    inputsObj[formInput.name] = formInput.value;
  });
  const request = await sendRequest(inputsObj);
  renderRequests(request, true);
});

const sendRequest = async (enteredData) => {
  const res = await fetch("http://localhost:7777/video-request", {
    method: "POST",
    body: JSON.stringify(enteredData),
    headers: { "Content-Type": " application/json" },
  });
  const data = await res.json();
  return [data];
};

const getRequests = async () => {
  const res = await fetch("http://localhost:7777/video-request");
  const data = await res.json();
  return data;
};

const renderRequests = (data, newRequest = false) => {
  let template = "";
  data.forEach((item) => {
    template += `<div class='card mb-3 request' data-id=${item._id}>
        <div class='card-body d-flex justify-content-between flex-row'>
          <div class='d-flex flex-column'>
            <h3>${item.topic_title}</h3>
            <p class='text-muted mb-2'>${item.topic_details}</p>
            <p class='mb-0 text-muted'>
          ${
            item.expected_result &&
            `<strong>Expected results:</strong>${item.expected_result} </p>
          </div>`
          }
          <div class='d-flex flex-column text-center'>
            <a class='btn btn-link vote_up' data-voteType="ups">🔺</a>
            <h3>
               ${item.votes.ups - item.votes.downs}
                         </h3>
            <a class='btn btn-link vote_down' data-voteType="downs">🔻</a>
          </div>
        </div>
        <div class='card-footer d-flex flex-row justify-content-between'>
          <div>
            <span class='text-info'>NEW</span>
            &bullet; added by
            <strong>${item.author_name}</strong>
            on
            <strong>${moment(item.submit_date).format("ddd MMM M y")}</strong>
          </div>
          <div class='d-flex justify-content-center flex-column 408ml-auto mr-2'>
            <div class='badge badge-success'>${item.target_level}</div>
          </div>
        </div>
      </div>`;
  });
  if (!newRequest) {
    requestsContainer.innerHTML = template;
  } else {
    requestsContainer.innerHTML = template + requestsContainer.innerHTML;
  }
  const listOfRequests = document.querySelectorAll("#listOfRequests > div");
  voteHandler(listOfRequests);
};

const voteHandler = (requestsElms) => {
  requestsElms.forEach((requestElm) => {
    requestElm.removeEventListener("click", addVoteHandler);
    requestElm.addEventListener("click", addVoteHandler);
  });
};

const addVoteHandler = (e) => {
  if (!e.target.dataset.votetype) return;
  let requestElem = e.target.closest(".request");
  console.log(requestElem.dataset.id);
  updateVote(requestElem.dataset.id, e.target.dataset.votetype);
};
const updateVote = async (id, vote_type) => {
  const res = await fetch("http://localhost:7777/video-request/vote", {
    method: "PUT",
    body: JSON.stringify({
      id,
      vote_type,
    }),
    headers: { "Content-Type": " application/json" },
  });
  const data = await res.json();
  // console.log(data);
};
