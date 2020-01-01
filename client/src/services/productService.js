import http from "./httpService";
import { api as apiStart } from "./config";

const api = apiStart + "api/v1/product";

export async function getProducts(url) {
  try {
    console.log("api", api);
    const { data } = await (await fetch(api + url)).json();
    return (data && data.products) || [];
  } catch (e) {
    console.log("error", e);
    alert("error _2");
    return [];
  }
}

export async function getProduct(id) {
  try {
    const { data } = await (await fetch(api + `/${id}`)).json();
    return (data && data.product) || {};
  } catch (e) {
    console.log("error", e);
    alert("error okay");
  }
}

export async function getRandomProducts(limit) {
  try {
    console.log("api", api);
    const { data } = await (
      await fetch(api + `/random-products${limit ? `?limit=${limit}` : ""}`)
    ).json();
    console.log("data", data);
    return data && data.products;
  } catch (e) {
    console.log("error", e);
    alert("error");
    return [];
  }
}
