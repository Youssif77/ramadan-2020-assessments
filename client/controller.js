"use strict";

import * as model from "./model.js";
import requestsView from "./views/requestsView.js";

const controlNewRequest = async () => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const init = async () => {
  console.log("Start Program Holla!");
  await model.loadRequests();
  requestsView.addHandlerRender(
    requestsView.renderRequests(model.state.requsets)
  );
};

init();
