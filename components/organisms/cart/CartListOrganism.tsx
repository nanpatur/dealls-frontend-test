"use client";
import Button from "@/components/atoms/Button";
import Spinner from "@/components/atoms/Spinner";
import DataTable from "@/components/atoms/Table";
import { TableColumn } from "@/components/atoms/Table/type";
import Text from "@/components/atoms/Text";
import { useAllCarts } from "@/domains/carts/hooks";
import { Cart, ProductCart } from "@/domains/carts/models";
import { Product } from "@/domains/products/models";
import { formatCurrency } from "@/utilities/currency";
import Image from "next/image";
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
              {row?.products?.map((product) => (
                <Text>- {product.title}</Text>
              ))}
            </div>
          </div>
        ),
      },
      {
        title: "Total Quantity",
        dataKey: "totalQuantity",
      },
      //   {
      //     title: "Product List",
      //     dataKey: "id",
      //     render: (id, row) => {
      //       return (
      //         <div className="flex flex-col gap-2">
      //           {row?.products?.map((product) => (
      //             <div className="flex flex-col mr-4 border border-gray-200 p-2 rounded-md">
      //               <Text size="md" className="mt-2">
      //                 {product?.title} -{" "}
      //                 <b className="text-sm">
      //                   {formatCurrency(product?.price)} x {product?.quantity}
      //                 </b>
      //               </Text>
      //               {product?.discountPercentage > 0 && (
      //                 <Text size="xs" className="mt-2 line-through">
      //                   {formatCurrency(product?.total)}
      //                 </Text>
      //               )}
      //               <Text size="md" weight="bold">
      //                 {formatCurrency(product?.discountedPrice) ?? product?.total}
      //               </Text>
      //               {product?.discountPercentage > 0 && (
      //                 <Text size="xs" color="green" weight="bold">
      //                   Save{" "}
      //                   {formatCurrency(
      //                     product?.total - product?.discountedPrice
      //                   )}{" "}
      //                   ({product?.discountPercentage}%)
      //                 </Text>
      //               )}
      //             </div>
      //           ))}
      //         </div>
      //       );
      //     },
      //   },
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
        title: "View detail button",
        dataKey: "id",
        render: (id, row) => (
          <Button onClick={() => router.push(`/carts/${id}`)}>
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
