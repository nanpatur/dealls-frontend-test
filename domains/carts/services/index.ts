import { Cart, CartListResponse } from "../models";

export class CartService {
  async getAllCarts(params: any): Promise<CartListResponse> {
    const response = await fetch(
      "https://dummyjson.com/carts" + "?" + new URLSearchParams(params)
    );
    const data = await response.json();
    return data;
  }

  async getCartById(id: string): Promise<Cart> {
    const response = await fetch(`https://dummyjson.com/carts/${id}`);
    const data = await response.json();
    return data;
  }
}
