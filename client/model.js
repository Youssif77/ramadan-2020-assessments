import { API_URL } from "./config.js";
import { getJson } from "./helper.js";

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
};

export const loadRequests = async () => {
  try {
    const data = await getJson(`${API_URL}/video-request`);
    console.log(data);
    state.requsets = data;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
  }
};

export const updateVote = async (id, vote_type) => {
  const updatedRequest = await getJson(`${API_URL}/video-request/vote`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      vote_type,
    }),
    headers: { "Content-Type": " application/json" },
  });

  const oldRequest = state.requsets.find((requset) => {
    return requset._id === updatedRequest._id;
  });

  oldRequest.votes.ups = updatedRequest.votes.ups;
  oldRequest.votes.downs = updatedRequest.votes.downs;
};

export const sendRequest = async (enteredData) => {
  const newRequest = await getJson(`${API_URL}/video-request`, {
    method: "POST",
    body: JSON.stringify(enteredData),
    headers: { "Content-Type": " application/json" },
  });
  state.requsets.unshift(newRequest);
};
