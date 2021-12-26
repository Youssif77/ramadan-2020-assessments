"use strict";

import * as model from "./model.js";
import requestsView from "./views/requestsView.js";
import orderSelectorView from "./views/orderSelectorView.js";

async function controlLoadRequests() {
  await model.loadRequests();
  requestsView.renderRequests(model.state.requsets);
}

async function controlUpdateVote(id, voteType) {
  await model.updateVote(id, voteType);

  // render updated vote requests
  requestsView.renderRequests(model.state.requsets);
}

async function controlNewRequest() {
  try {
  } catch (err) {
    console.log(err);
  }
}
//
function controlOrderRequests() {}

function init() {
  console.log("Start Program Holla!");
  requestsView.addHandlerRender(controlLoadRequests);
  requestsView.addHandlerUpdateVote(controlUpdateVote);
  orderSelectorView.addHandlerOrderRequests(controlOrderRequests);
}

init();
