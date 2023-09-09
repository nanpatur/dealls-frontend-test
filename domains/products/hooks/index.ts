// hooks for products domain using product services

import { useEffect, useState } from "react";
import { ProductService } from "../services";
import { Product, ProductListResponse } from "../models";
import { useQuery } from "@/utilities/query";
import { QueryParams } from "@/domains/commons/models";

export const useAllProducts = ({
  key,
  config,
  params,
}: QueryParams<ProductListResponse>) => {
  return useQuery<ProductListResponse>(
    key,
    async () => {
      const productService = new ProductService();
      return productService.getAllProduct(params);
    },
    config
  );
};

export const useProductById = ({ key, config }: QueryParams<Product>) => {
  return useQuery<Product>(
    key,
    async () => {
      const productService = new ProductService();
      return productService.getProductById(String(key));
    },
    config
  );
};

export const useProductCategories = ({
  key,
  config,
}: QueryParams<string[]>) => {
  return useQuery<string[]>(
    key,
    async () => {
      const productService = new ProductService();
      return productService.getProductCategories();
    },
    config
  );
};
