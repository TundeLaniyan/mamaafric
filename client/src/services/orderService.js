import http from "./httpService";
import { api as apiStart } from "./config";

const api = apiStart + "api/v1/order";

export async function getStripeSession(products) {
  try {
    const { data } = await http.post(`${api}/checkout-session`, {
      email: "test@me.com",
      products,
      name: "James",
      shippingAddress: {
        street: "test street",
        city: "test city",
        postalCode: "ts1 ct2",
      },
    });
    console.log("data", data);
    const { error } = await data.stripe.redirectToCheckout({
      sessionId: data.session.id,
    });
    if (error) alert(error.message);
  } catch (error) {
    console.log("Error:", error.response.data.message);
  }
}
