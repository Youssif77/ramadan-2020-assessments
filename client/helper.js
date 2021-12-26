export const AJAX = async (url, method = "GET", body = null, headers = {}) => {
  const res = await fetch(url, {
    method,
    body,
    headers,
  });
  return await res.json();
};

export function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export const diffInTime = (firstDate, secondDate) => {
  return new Date(firstDate) - new Date(secondDate);
};
