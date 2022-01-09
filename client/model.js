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
  user: {
    isLogged: false,
    info: {
      id: "",
      email: "",
      name: "",
      role: "",
    },
  },
};

export const loadRequests = async () => {
  try {
    const data = await AJAX(`${API_URL}/video-request`);
    state.requsets = data;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
  }
};

export const updateVote = async (id, vote_type, userId) => {
  const currentRequest = state.requsets.find((requset) => {
    return requset._id === id;
  });
  if (currentRequest.votes.users.includes(userId)) return;
  currentRequest.votes.users.push(userId);
  const updatedRequest = await AJAX(
    `${API_URL}/video-request/vote`,
    "PUT",
    JSON.stringify({
      id,
      vote_type,
      userId,
    }),
    { "Content-Type": " application/json" }
  );

  currentRequest.votes.ups = updatedRequest.votes.ups;
  currentRequest.votes.downs = updatedRequest.votes.downs;
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
  let { validate } = state.formInputs[info.name];
  state.formInputs[info.name].value = value;

  if (info.type === "email" && !validateEmail(value)) {
    validate[0] = false;
    validate[1] = value ? `Please enter vaild email` : "This input is required";
  } else if (info.maxLength != -1 && value.length == 100) {
    validate[0] = false;
    validate[1] = value
      ? `Maximum length is 100 char`
      : "This input is required";
  } else if (info.required && !value) {
    validate[0] = false;
    validate[1] = `This input is required`;
  } else {
    validate[0] = true;
    validate[1] = ``;
  }
}

export const login = async (loginData) => {
  const loginBody = JSON.stringify({
    author_name: loginData.name,
    author_email: loginData.email,
  });
  try {
    const data = await AJAX(`${API_URL}/users/login`, "POST", loginBody, {
      "Content-Type": " application/json",
    });
    state.user.isLogged = true;
    state.user.info.name = data.author_name;
    state.user.info.email = data.author_email;
    state.user.info.id = data._id;
    state.user.info.role = data.role;
  } catch (err) {
    console.log(err);
  }
};
export const deleteRequest = async (id) => {
  try {
    await AJAX(`${API_URL}/video-request`, "DELETE", JSON.stringify({ id }), {
      "Content-Type": " application/json",
    });
    const requestIndex = state.requsets.findIndex(
      (element) => element._id === id
    );
    state.requsets.splice(requestIndex, 1);
  } catch (err) {
    console.log(err);
  }
};
export const updateStatusRequest = async (id, status, resVideo) => {
  try {
    const updatedRequest = await AJAX(
      `${API_URL}/video-request`,
      "PUT",
      JSON.stringify({ id, status, resVideo }),
      {
        "Content-Type": " application/json",
      }
    );
    const request = state.requsets.find((element) => element._id === id);
    request.status = updatedRequest.status;
    request.video_ref = updatedRequest.video_ref;
  } catch (err) {
    alert(err);
  }
};
