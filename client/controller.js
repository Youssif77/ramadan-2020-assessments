"use strict";

import * as model from "./model.js";
import requestsView from "./views/requestsView.js";

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

function init() {
  console.log("Start Program Holla!");
  requestsView.addHandlerRender(controlLoadRequests);
  requestsView.addHandlerUpdateVote(controlUpdateVote);
}

init();
