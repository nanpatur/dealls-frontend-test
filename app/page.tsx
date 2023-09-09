"use client";
import Button from "@/components/atoms/Button";
import DataTable from "@/components/atoms/Table";
import { TableColumn } from "@/components/atoms/Table/type";
import Text from "@/components/atoms/Text";
import { CartItem } from "@/domains/carts/models";
import { useAllProducts } from "@/domains/products/hooks";
import { Product } from "@/domains/products/models";
import { formatCurrency } from "@/utilities/currency";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Home() {
  const { data, isLoading } = useAllProducts({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = useCallback(
    (product: Product) => {
      const existItem = cartItems.findIndex(
        (item) => item.productId === product.id
      );

      if (existItem !== -1) {
        const newCartItems = [...cartItems];
        newCartItems[existItem] = {
          ...newCartItems[existItem],
          quantity: newCartItems[existItem].quantity + 1,
        };
        setCartItems(newCartItems);
      } else {
        setCartItems((prev) => [
          ...prev,
          {
            productId: product.id,
            quantity: 1,
            price: product.price,
            title: product.title,
            thumbnail: product.thumbnail,
          },
        ]);
      }
    },
    [cartItems]
  );

  const handleRemoveFromCart = useCallback(
    (product: Product) => {
      const existItem = cartItems.find((item) => item.productId === product.id);

      if (existItem) {
        if (existItem.quantity === 1) {
          const newCartItems = cartItems.filter(
            (item) => item.productId !== product.id
          );
          setCartItems(newCartItems);
        } else {
          const newCartItems = cartItems.map((item) =>
            item.productId === product.id
              ? { ...existItem, quantity: existItem.quantity - 1 }
              : item
          );
          setCartItems(newCartItems);
        }
      }
    },
    [cartItems]
  );

  const totalProductGroupedByIdInCart = useMemo(() => {
    return cartItems.reduce((acc: any, item) => {
      return {
        ...acc,
        [item.productId]: (acc[item.productId] || 0) + item.quantity,
      };
    }, {});
  }, [cartItems]);

  const columns = useMemo<TableColumn<Product>[]>(
    () => [
      {
        title: "",
        dataKey: "thumbnail",
        render: (thumbnail) => (
          <div className="w-20 h-20">
            <Image
              src={thumbnail.toString()}
              alt="product image"
              className="w-20 h-20 object-cover rounded-md"
              width={80}
              height={80}
            />
          </div>
        ),
      },
      { title: "Title", dataKey: "title" },
      {
        title: "Price",
        dataKey: "price",
        render: (price) => (
          <Text weight="bold">{formatCurrency(Number(price))}</Text>
        ),
      },
      { title: "Description", dataKey: "description" },
      { title: "Stock", dataKey: "stock" },
      { title: "Category", dataKey: "category" },
      {
        title: "",
        dataKey: "id",
        render: (id, row) =>
          totalProductGroupedByIdInCart[Number(id)] > 0 ? (
            <div className="flex items-center gap-2 w-full">
              <Button
                className="whitespace-nowrap"
                onClick={() => handleRemoveFromCart(row)}
                color="netral"
              >
                -
              </Button>
              <Text className="mx-2 flex-1" align="center">
                {totalProductGroupedByIdInCart[Number(id)]}
              </Text>
              <Button
                className="whitespace-nowrap"
                onClick={() => handleAddToCart(row)}
                color="netral"
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              className="whitespace-nowrap"
              onClick={() => handleAddToCart(row)}
            >
              + Add to cart
              {totalProductGroupedByIdInCart[Number(id)]}
            </Button>
          ),
      },
    ],
    [totalProductGroupedByIdInCart, handleAddToCart, handleRemoveFromCart]
  );

  return (
    <div>
      <Text size="xl" weight="bold" className="mb-4 text-xl">
        Products
      </Text>
      <DataTable
        data={data?.products || []}
        columns={columns}
        totalData={data?.total || 0}
        limit={data?.limit || 0}
      />
    </div>
  );
}
