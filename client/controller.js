"use strict";

import * as model from "./model.js";
import requestsView from "./views/requestsView.js";
import orderSelectorView from "./views/orderSelectorView.js";
import formView from "./views/formView.js";
import searchInputView from "./views/SearchInputView.js";

async function controlLoadRequests() {
  await model.loadRequests();
  requestsView.renderRequests(model.state.requsets);
}

async function controlUpdateVote(id, voteType) {
  await model.updateVote(id, voteType);

  // render updated vote requests
  requestsView.renderRequests(model.state.requsets);
}

async function controlNewRequest(data) {
  try {
    await model.sendRequest(data);
    requestsView.renderRequests(model.state.requsets);
  } catch (err) {
    console.log(err);
  }
}

function controlOrderRequests(orderBy) {
  model.orderRequests(orderBy);
  requestsView.renderRequests(model.state.requsets);
}
function controlSearchRequests(searchValue) {
  const searchedRequests = model.searchRequests(searchValue);
  searchInputView.rederMsg(searchedRequests.length);
  requestsView.renderRequests(searchedRequests);
}

function controlValidateInput(e) {
  // console.log(e.target.checkValidity());
  const inputValue = e.target.value;
  const inputInfo = {
    type: e.target.type,
    name: e.target.name,
    checkValidity: e.target.checkValidity(),
    required: e.target.required,
  };
  model.validateInput(inputValue, inputInfo);
  console.log(model.state.formInputs.author_email);
}

function init() {
  console.log("Start Program Holla!");
  requestsView.addHandlerRender(controlLoadRequests);
  requestsView.addHandlerUpdateVote(controlUpdateVote);
  formView.addHandlerNewRequest(controlNewRequest);
  formView.addHandlerValidateInput(controlValidateInput);
  orderSelectorView.addHandlerOrderRequests(controlOrderRequests);
  searchInputView.addHendlerSearchRequests(controlSearchRequests);
}

init();
