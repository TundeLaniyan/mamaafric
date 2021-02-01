import http from "./httpService";
import { api as apiStart } from "./config";

const api = apiStart + "api/v1/product";

export async function getProducts(url) {
  try {
    const { data } = await http.get(api + url);
    return data.products;
  } catch (e) {
    console.log({ e });
    return [];
  }
}

export async function getProduct(id) {
  try {
    const { data } = await http.get(api + "/" + id);
    return data.product;
  } catch (e) {
    return {};
  }
}

export async function getRandomProducts(limit) {
  try {
    const { data } = await http.get(
      `${api}/random-products${limit ? `?limit=${limit}` : ""}`
    );
    return data.products;
  } catch (e) {
    return [];
  }
}
