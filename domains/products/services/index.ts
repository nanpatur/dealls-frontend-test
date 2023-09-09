import { Product, ProductListResponse } from "../models";

export class ProductService {
  async getAllProduct(params?: any): Promise<ProductListResponse> {
    let path = "https://dummyjson.com/products";
    if (params?.category) {
      path += `/category/${params.category}`;
    }
    if (params?.search) {
      path += `/search`;
      params.q = params.search;
    }
    delete params.category;
    delete params.search;
    const response = await fetch(path + "?" + new URLSearchParams(params));
    const data = await response.json();
    return data;
  }

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  }

  async getProductCategories(): Promise<string[]> {
    const response = await fetch("https://dummyjson.com/products/categories");
    const data = await response.json();
    return data;
  }
}
