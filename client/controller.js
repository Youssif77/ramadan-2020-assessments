"use strict";

import * as model from "./model.js";
import requestsView from "./views/requestsView.js";
import orderSelectorView from "./views/orderSelectorView.js";
import formView from "./views/formView.js";
import searchInputView from "./views/SearchInputView.js";
import loginVeiw from "./views/loginVeiw.js";
async function controlLoadRequests() {
  await model.loadRequests();
  requestsView.renderRequests(model.state.requsets, model.state.user.info.role);
}

async function controlUpdateVote(id, voteType) {
  console.log(model.state.user);
  if (model.state.user.isLogged) {
    await model.updateVote(id, voteType, model.state.user.info.id);
  } else {
    loginVeiw.showLoginPage();
  }

  // render updated vote requests
  requestsView.renderRequests(model.state.requsets, model.state.user.info.role);
}

async function controlNewRequest(data) {
  try {
    await model.sendRequest(data);
    requestsView.renderRequests(
      model.state.requsets,
      model.state.user.info.role
    );
  } catch (err) {
    console.log(err);
  }
}

function controlOrderRequests(orderBy) {
  model.orderRequests(orderBy);
  requestsView.renderRequests(model.state.requsets, model.state.user.info.role);
}

function controlSearchRequests(searchValue) {
  const searchedRequests = model.searchRequests(searchValue);
  searchInputView.rederMsg(searchedRequests.length);
  requestsView.renderRequests(searchedRequests, model.state.user.info.role);
}

function controlValidateInput(e) {
  const inputValue = e.target.value;
  const inputInfo = {
    type: e.target.type,
    name: e.target.name,
    checkValidity: e.target.checkValidity(),
    required: e.target.required,
    maxLength: e.target.maxLength,
  };
  model.validateInput(inputValue, inputInfo);
  formView.renderValidationMsg(model.state.formInputs[e.target.name], e.target);
}

async function controlLogin(loginData) {
  await model.login(loginData);
  requestsView.renderRequests(model.state.requsets, model.state.user.info.role);
}
async function controlDeleteRequest(id) {
  await model.deleteRequest(id);
  requestsView.renderRequests(model.state.requsets, model.state.user.info.role);
}
async function controlUpdateStatusRequest(id, status) {
  await model.updateStatusRequest(id, status);
  requestsView.renderRequests(model.state.requsets, model.state.user.info.role);
}
function init() {
  console.log("Start Program Holla!");
  requestsView.addHandlerRender(controlLoadRequests);
  requestsView.addHandlerUpdateVote(controlUpdateVote);
  formView.addHandlerNewRequest(controlNewRequest);
  formView.addHandlerValidateInput(controlValidateInput);
  orderSelectorView.addHandlerOrderRequests(controlOrderRequests);
  searchInputView.addHendlerSearchRequests(controlSearchRequests);
  loginVeiw.addHandlerLogin(controlLogin);
  requestsView.addHandlerDeleteRequest(controlDeleteRequest);
  requestsView.addHandlerUpdateRequestStatus(controlUpdateStatusRequest);
}

init();
