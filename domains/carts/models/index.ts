import { Product } from "@/domains/products/models";

export interface CartItem {
  id?: string;
  price: number;
  quantity: number;
  thumbnail: string;
  productId: number;
  title: string;
}

export interface ProductCart {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface Cart {
  id?: string;
  products: ProductCart[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartListResponse {
  carts: Cart[];
  total: number;
  limit: number;
  skip: number;
}
