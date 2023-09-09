"use client";
import Button from "@/components/atoms/Button";
import Spinner from "@/components/atoms/Spinner";
import DataTable from "@/components/atoms/Table";
import { TableColumn } from "@/components/atoms/Table/type";
import Text from "@/components/atoms/Text";
import { useAllCarts, useCartByID } from "@/domains/carts/hooks";
import { Cart, ProductCart } from "@/domains/carts/models";
import { Product } from "@/domains/products/models";
import { formatCurrency } from "@/utilities/currency";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const CartDetailOrganism = () => {
  const { cartID } = useParams();

  const { data: cartDetail, isLoading } = useCartByID({
    key: ["useCartByID", String(cartID)],
    params: {
      cartID,
    },
  });

  const router = useRouter();

  const columns = useMemo<TableColumn<ProductCart>[]>(
    () => [
      {
        title: "Product Name",
        dataKey: "title",
      },
      {
        title: "Quantity",
        dataKey: "quantity",
      },
      {
        title: "Price",
        dataKey: "price",
      },
      {
        title: "Total Price",
        dataKey: "id",

        render: (id, row) => {
          return (
            <div className="flex flex-col gap-1">
              {row?.discountPercentage > 0 && (
                <Text size="xs" className="mt-2 line-through">
                  {formatCurrency(row?.total)}
                </Text>
              )}
              <Text size="md" weight="bold">
                {formatCurrency(row?.discountedPrice) ?? row?.total}
              </Text>
              {row?.discountPercentage > 0 && (
                <Text size="xs" color="green" weight="bold">
                  Save {formatCurrency(row?.total - row?.discountedPrice)} (
                  {row?.discountPercentage}%)
                </Text>
              )}
            </div>
          );
        },
      },
    ],
    []
  );
  return (
    <div>
      <Text size="3xl" weight="bold" className="mb-4">
        Cart Detail ()
      </Text>
      {isLoading ? (
        <div className="mt-8">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="flex w-full rounded-md bg-white mb-4 p-6">detail</div>
          <DataTable data={cartDetail?.products ?? []} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default CartDetailOrganism;
