// import axios from "axios";
import { toast } from "react-toastify";
// fetch.defaults.withCredentials = true;
// fetch.interceptors.response.use(null, (err) => {
//   if (err.response && err.response.status > 500) {
//     toast.error("An unexpected error occurrred.");
//   }

//   return Promise.reject(err);
// });

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export default {
  get: fetch.get,
  post: postData,
  patch: fetch.patch,
  delete: fetch.delete,
};
