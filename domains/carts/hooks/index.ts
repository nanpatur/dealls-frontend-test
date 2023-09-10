import { QueryParams } from "@/domains/commons/models";
import { useQuery } from "@/utilities/query";
import { CartService } from "../services";
import { Cart, CartListResponse } from "../models";

export const useAllCarts = ({
  key,
  config,
  params,
}: QueryParams<CartListResponse>) => {
  return useQuery<CartListResponse>(
    key,
    async () => {
      const cartService = new CartService();
      return cartService.getAllCarts(params);
    },
    config
  );
};

export const useCartByID = ({ key, config, params }: QueryParams<Cart>) => {
  return useQuery<Cart>(
    key,
    async () => {
      const cartService = new CartService();
      return cartService.getCartById(params?.cartID);
    },
    config
  );
};
