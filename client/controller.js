"use strict";

import * as model from "./model.js";
import requestsView from "./views/requestsView.js";
import orderSelectorView from "./views/orderSelectorView.js";
import formView from "./views/formView.js";

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

function init() {
  console.log("Start Program Holla!");
  requestsView.addHandlerRender(controlLoadRequests);
  requestsView.addHandlerUpdateVote(controlUpdateVote);
  formView.addHandlerNewRequest(controlNewRequest);
  orderSelectorView.addHandlerOrderRequests(controlOrderRequests);
}

init();
