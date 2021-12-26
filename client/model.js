import { API_URL } from "./config.js";
import { AJAX, diffInTime } from "./helper.js";

export const state = {
  requsets: [],
  search: {
    query: "",
    searchedRequsets: [],
  },
  formInputs: {
    userName: { value: "", isVaild: false },
    email: { value: "", isVaild: false },
    topic: { value: "", isVaild: false },
    targetLevel: { value: "Beginner", isVaild: false },
    details: { value: "", isVaild: false },
    expectedResults: { value: "", isVaild: false },
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
