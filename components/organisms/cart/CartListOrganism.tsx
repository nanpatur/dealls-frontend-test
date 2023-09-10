"use client";
import Button from "@/components/atoms/Button";
import Spinner from "@/components/atoms/Spinner";
import DataTable from "@/components/atoms/Table";
import { TableColumn } from "@/components/atoms/Table/type";
import Text from "@/components/atoms/Text";
import { useAllCarts } from "@/domains/carts/hooks";
import { Cart } from "@/domains/carts/models";
import { formatCurrency } from "@/utilities/currency";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const CartListOrganism = () => {
  const [cartParams, setCartParams] = useState({
    limit: 10,
    page: 1,
  });
  const { data, isLoading } = useAllCarts({
    key: ["useAllCarts", cartParams?.page],
    params: {
      ...cartParams,
    },
  });

  const router = useRouter();

  const columns = useMemo<TableColumn<Cart>[]>(
    () => [
      {
        title: "User ID",
        dataKey: "userId",
      },
      {
        title: "Total Products",
        dataKey: "totalProducts",
        render: (totalProducts, row) => (
          <div>
            <Text weight="bold">{Number(totalProducts)} products:</Text>
            <div className="pl-2">
              {row?.products?.map((product, i) => (
                <Text key={i}>- {product.title}</Text>
              ))}
            </div>
          </div>
        ),
      },
      {
        title: "Total Quantity",
        dataKey: "totalQuantity",
      },
      {
        title: "Total Price",
        dataKey: "total",
        render: (total, row) => (
          <Text weight="bold">{formatCurrency(Number(total))}</Text>
        ),
      },
      {
        title: "Discounted Total",
        dataKey: "discountedTotal",
        render: (discountedTotal, row) => (
          <Text weight="bold">{formatCurrency(Number(discountedTotal))}</Text>
        ),
      },
      {
        title: "",
        dataKey: "id",
        render: (id, row) => (
          <Button
            className="whitespace-nowrap"
            onClick={() => router.push(`/carts/${id}`)}
          >
            View detail
          </Button>
        ),
      },
    ],
    []
  );
  return (
    <div>
      <Text size="3xl" weight="bold" className="mb-4">
        Carts
      </Text>
      {isLoading ? (
        <div className="mt-8">
          <Spinner />
        </div>
      ) : (
        <div>
          <DataTable
            data={data?.carts ?? []}
            columns={columns}
            totalData={data?.total ?? 0}
            limit={data?.limit ?? 0}
            onPaginate={(page) => setCartParams({ ...cartParams, page })}
            page={cartParams?.page}
          />
        </div>
      )}
    </div>
  );
};

export default CartListOrganism;
