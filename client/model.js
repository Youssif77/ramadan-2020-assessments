import { API_URL } from "./config.js";
import { getJson, diffInTime } from "./helper.js";

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
  // orderedByVote
};

export const loadRequests = async () => {
  try {
    const data = await getJson(`${API_URL}/video-request`);
    state.requsets = data;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
  }
};

export const updateVote = async (id, vote_type) => {
  const updatedRequest = await getJson(
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
  const newRequest = await getJson(
    `${API_URL}/video-request`,
    "POST",
    JSON.stringify(enteredData),
    { "Content-Type": " application/json" }
  );
  state.requsets.unshift(newRequest);
};

//

export const orderRequests = (orderedBy) => {
  if (orderedBy === "newest") {
    state.requsets.sort((b, a) => {
      return diffInTime(a.submit_date, b.submit_date);
    });
  } else if (orderedBy === "most_voted") {
    state.requsets.sort((b, a) => {
      return a.votes.ups - a.votes.downs - (b.votes.ups - b.votes.downs);
    });
  }
};
