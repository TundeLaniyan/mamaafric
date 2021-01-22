import http from "./httpService";

const api = "http://localhost:7008/api/v1/product";

export async function getProducts(url) {
  try {
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
    const { data } = await (
      await fetch(api + `/random-products${limit ? `?limit=${limit}` : ""}`)
    ).json();
    console.log("data", data);
    return data && data.products;
  } catch (e) {
    console.log("error", e);
    alert("error");
  }
}
