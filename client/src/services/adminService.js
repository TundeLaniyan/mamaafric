import http from "./httpService";
import { api } from "./config";
import { get } from "lodash";
const url = api + "api/v1/";

export async function login(data) {
  try {
    const response = await http.post(url + "users/login", data);
    return response.data.status;
  } catch (e) {
    console.log({ e });
    return get(e, "response.data.message", "opps something went wrong");
  }
}

export async function checkLoggedIn() {
  try {
    const response = await http.get(url + "users/islogin");
    return `${response.status}`;
  } catch (e) {
    console.log({ e });
    return "401";
  }
}

export async function logOut() {
  try {
    await http.get(url + "users/logout");
    return true;
  } catch {
    return false;
  }
}

export async function addItem(product) {
  try {
    const { data } = await http.post(url + "admin", product);
    return data.status;
  } catch (e) {
    return get(e, "response.data.message", "opps something went wrong");
  }
}

export async function updateItem(id, product) {
  try {
    const { data } = await http.patch(`${url}admin/${id}`, product);
    return data.status;
  } catch (e) {
    console.log({ e });
    return get(e, "response.data.message", "opps something went wrong");
  }
}

export async function deleteItem(id) {
  try {
    const { data } = await http.delete(`${url}admin/${id}`);
    return data.status;
  } catch (e) {
    console.log({ e });
    return get(e, "response.data.message", "opps something went wrong");
  }
}
