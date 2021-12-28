import { API_URL } from "./config.js";
import { validateEmail, AJAX, diffInTime } from "./helper.js";

export const state = {
  requsets: [],

  searchQuery: "",

  formInputs: {
    author_name: { value: "", validate: [false, ""] },
    author_email: { value: "", validate: [false, ""] },
    topic_details: { value: "", validate: [false, ""] },
    topic_title: { value: "", validate: [false, ""] },
    target_level: { value: "Beginner", validate: [true, ""] },
    expected_result: { value: "", validate: [true, ""] },
  },
  sorted: false,
};

export const loadRequests = async () => {
  try {
    const data = await AJAX(`${API_URL}/video-request`);
    state.requsets = data;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
  }
};

export const updateVote = async (id, vote_type) => {
  const updatedRequest = await AJAX(
    `${API_URL}/video-request/vote`,
    "PUT",
    JSON.stringify({
      id,
      vote_type,
    }),
    { "Content-Type": " application/json" }
  );

  const oldRequest = state.requsets.find((requset) => {
    return requset._id === updatedRequest._id;
  });

  oldRequest.votes.ups = updatedRequest.votes.ups;
  oldRequest.votes.downs = updatedRequest.votes.downs;
};

export const sendRequest = async (enteredData) => {
  try {
    const newRequest = await AJAX(
      `${API_URL}/video-request`,
      "POST",
      JSON.stringify(enteredData),
      { "Content-Type": " application/json" }
    );
    if (state.sorted) {
      const startIndex = state.requsets.findIndex(
        (req) => req.votes.ups - req.votes.downs === 0
      );

      state.requsets.splice(startIndex, 0, newRequest);
    } else state.requsets.unshift(newRequest);
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
  }
};

export function orderRequests(orderedBy) {
  // Sort by submit date Asc
  if (orderedBy === "newest") {
    state.requsets.sort((b, a) => {
      return diffInTime(a.submit_date, b.submit_date);
    });

    // Return the default sort state
    state.sorted = false;
  }
  // Sort by most votes
  else if (orderedBy === "most_voted") {
    state.requsets.sort((b, a) => {
      return a.votes.ups - a.votes.downs - (b.votes.ups - b.votes.downs);
    });

    // Raise the sorted flag
    state.sorted = true;
  }
}

export function searchRequests(enteredValue) {
  state.searchQuery = enteredValue;
  if (state.searchQuery) {
    return state.requsets.filter((request) => {
      if (request.topic_title.includes(state.searchQuery)) {
        return request;
      }
    });
  } else {
    return state.requsets;
  }
}
export function validateInput(value, info) {
  let [isValide, msg] = state.formInputs[info.name].validate;

  state.formInputs[info.name].value = value;

  if (info.required && !info.checkValidity) {
    isValide = false;
    msg = ` this ${info.name.toUpperCase()} is required`;
    if (
      info.type === "email" &&
      !validateEmail(value)
      // !info.checkValidity &&
      // info.value
    ) {
      console.log("s");
      isValide = false;
    }

    // if (info.name == "topic_title" && info.value.length == 100) {
    // isValide = false;
    // }
  } else {
    // console.log(state.formInputs);
    isValide = true;
    console.log("check validity");
  }
}
