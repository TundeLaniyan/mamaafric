import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(null, (err) => {
  if (err.response && err.response.status > 500) {
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(err);
});

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export default {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: fetch.delete,
};
