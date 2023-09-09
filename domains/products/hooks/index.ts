// hooks for products domain using product services

import { useEffect, useState } from "react";
import { ProductService } from "../services";
import { Product, ProductResponse } from "../models";
import { useQuery } from "@/utilities/query";

export const useAllProducts = ({
  key,
  config = { enabled: true },
}: {
  key?: string;
  config?: { enabled?: boolean; initialData?: ProductResponse };
}) => {
  return useQuery<ProductResponse>(async () => {
    const productService = new ProductService();
    return productService.getAllProduct();
  }, config);
};

export const useProduct = ({
  key,
  params,
  config = { enabled: true },
}: {
  key: string;
  params: { id: string };
  config?: { enabled?: boolean; initialData?: Product };
}) => {
  const [data, setData] = useState<Product | null>(config?.initialData || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const productService = new ProductService();
      productService
        .getProductById(params?.id)
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    };
    config?.enabled && fetchData();
  }, [config?.enabled, params?.id]);

  return { data, isLoading, error };
};
