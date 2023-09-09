// create class service for product API using fetch
// Path: domains/products/services/product.service.ts
import { Product, ProductResponse } from "../models";

export class ProductService {
  async getAllProduct(params?: any): Promise<ProductResponse> {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data;
  }

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  }
}
