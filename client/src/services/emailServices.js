import http from "./httpService";
const url = "http://localhost:7008/api/v1/email";

export async function joinMailList(email) {
  //   try {
  //     const data = { email };
  //     console.log(JSON.stringify({ email }));
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     console.log(await response.json());
  //   } catch (e) {
  //     console.log("error", e);
  //     alert("error");
  //   }
  return http
    .post(url, { email })
    .then((data) => (data.status === "success" ? data.status : data.message));
}
