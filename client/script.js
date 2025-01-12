"use strict";

import moment from "./node_modules/moment/dist/moment.js";
console.log("Start Program Holla!");

let requestsArray = [];
const formInputs = document.querySelectorAll(".form-control");
const requestBtn = document.querySelector("#request-btn");
const requestsContainer = document.querySelector("#listOfRequests");
const orderedBy = document.querySelector("#ordered_by");
const searchInput = document.querySelector(".search");

const search = (e) => {
  let searchArray = requestsArray.filter((request) => {
    if (request.topic_title.includes(e.target.value)) {
      return request;
    }
  });
  if (!searchArray.length) {
    requestsContainer.innerHTML = `<p class="text-danger">no requsts matchs<p/>`;
    return;
  }
  renderRequests(searchArray);
};
searchInput.addEventListener("input", search);

window.onload = async function () {
  await getRequests();

  renderRequests(requestsArray);
};

let isValide = false;

requestBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const inputsObj = {};

  formInputs.forEach((formInput) => {
    inputsObj[formInput.name] = formInput.value;

    if (!formInput.checkValidity()) {
      validateInput.call(formInput);
    }
  });

  if (isValide) {
    await sendRequest(inputsObj);
    orderRequests();
  }
});

function validateInput() {
  const inputContainer = this.closest(".form-group");
  if (this.required && !this.checkValidity()) {
    renderErrorMsg(inputContainer, `this feild is required`);
    isValide = false;
    if (this.type === "email" && !this.checkValidity() && this.value) {
      renderErrorMsg(inputContainer, `this email not valid`);
      isValide = false;
    }
    if (this.name == "topic_title" && this.value.length == 100) {
      renderErrorMsg(inputContainer, `maximum length is 100 char`);
      isValide = false;
    }
    return;
  } else {
    renderErrorMsg(inputContainer, ``);

    isValide = true;
  }
}

formInputs.forEach((formInput) => {
  formInput.addEventListener("input", validateInput);
});

const renderErrorMsg = (inputContainer, msg) => {
  // let template = ` <p class='text-danger mt-2 fw-bold'>${msg}</p>`;
  inputContainer.lastElementChild.innerHTML = msg;
  // inputContainer.insertAdjacentHTML("beforeEnd", template);
};

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const sendRequest = async (enteredData) => {
  const res = await fetch("http://localhost:7777/video-request", {
    method: "POST",
    body: JSON.stringify(enteredData),
    headers: { "Content-Type": " application/json" },
  });
  const data = await res.json();
  requestsArray.unshift(data);
};

const getRequests = async () => {
  const res = await fetch("http://localhost:7777/video-request");
  const data = await res.json();
  requestsArray = data;
  return requestsArray;
};

const renderRequests = (data) => {
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
            <h3 class="vote">
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

  requestsContainer.innerHTML = template;

  const listOfRequests = document.querySelectorAll("#listOfRequests > div");
  voteHandler(listOfRequests);
};

const voteHandler = (requestsElms) => {
  requestsElms.forEach((requestElm) => {
    requestElm.removeEventListener("click", addVoteHandler);
    requestElm.addEventListener("click", addVoteHandler);
  });
};

const addVoteHandler = async (e) => {
  if (!e.target.dataset.votetype) return;
  const requestElem = e.target.closest(".request");
  const updatedVoteData = await updateVote(
    requestElem.dataset.id,
    e.target.dataset.votetype
  );
  const updatedRequest = requestsArray.find((element) => {
    return element._id === requestElem.dataset.id;
  });
  updatedRequest.votes.ups = updatedVoteData.votes.ups;
  updatedRequest.votes.downs = updatedVoteData.votes.downs;

  orderRequests();
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
  return data;
};

const orderRequests = () => {
  if (orderedBy.value === "newest") {
    requestsArray.sort((b, a) => {
      return diffInTime(a.submit_date, b.submit_date);
    });
    renderRequests(requestsArray);
  } else if (orderedBy.value === "most_voted") {
    requestsArray.sort((b, a) => {
      return a.votes.ups - a.votes.downs - (b.votes.ups - b.votes.downs);
    });
    renderRequests(requestsArray);
  }
};

orderedBy.addEventListener("change", orderRequests);
const diffInTime = (firstDate, secondDate) => {
  return new Date(firstDate) - new Date(secondDate);
};
