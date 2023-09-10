"use client";
import Spinner from "@/components/atoms/Spinner";
import DataTable from "@/components/atoms/Table";
import { TableColumn } from "@/components/atoms/Table/type";
import Text from "@/components/atoms/Text";
import { useCartByID } from "@/domains/carts/hooks";
import { ProductCart } from "@/domains/carts/models";
import { useUserById } from "@/domains/users/hooks";
import { formatCurrency } from "@/utilities/currency";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

const CartDetailOrganism = () => {
  const { cartID } = useParams();

  const { data: cartDetail, isLoading } = useCartByID({
    key: ["useCartByID", String(cartID)],
    params: {
      cartID,
    },
    config: {
      enabled: !!cartID,
    },
  });

  const { data: user } = useUserById({
    key: ["useUserById", String(cartDetail?.userId)],
    params: {
      userId: cartDetail?.userId,
    },
    config: {
      enabled: !!cartDetail?.userId,
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
      <div className="flex flex-row items-center mb-4 gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover:cursor-pointer hover:text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => router.back()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <Text size="3xl" weight="bold">
          Cart Detail #{cartID}
        </Text>
      </div>
      {isLoading ? (
        <div className="mt-8">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="flex flex-col w-full rounded-md bg-white mb-4 p-6">
            <div className="flex flex-col xl:flex-row flex-1 py-2">
              <Text className="flex-1 mb-4 xl:mb-0">
                <b>User:</b> {user?.firstName} {user?.lastName}
              </Text>
              <Text className="flex-1">
                <b>Email:</b> {user?.email}
              </Text>
            </div>
            <div className="flex flex-col xl:flex-row flex-1 py-2">
              <Text className="flex-1 mb-4 xl:mb-0">
                <b>Number of Products:</b> {cartDetail?.totalProducts} products
              </Text>
              <Text className="flex-1">
                <b>Total quantity:</b> {cartDetail?.totalQuantity}
              </Text>
            </div>
            <div className="flex flex-col xl:flex-row flex-1 py-2">
              <Text className="flex-1 mb-4 xl:mb-0">
                <b>Total price:</b> {formatCurrency(Number(cartDetail?.total))}
              </Text>
              <Text className="flex-1">
                <b>Total discounted price:</b>{" "}
                {formatCurrency(Number(cartDetail?.discountedTotal))}
              </Text>
            </div>
          </div>
          <DataTable data={cartDetail?.products ?? []} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default CartDetailOrganism;
