"use client";
import { useMemo, useState } from "react";
import DataTable from "../../atoms/Table";
import Text from "../../atoms/Text";
import { TableColumn } from "../../atoms/Table/type";
import { Product } from "@/domains/products/models";
import Image from "next/image";
import { useAllProducts, useProductCategories } from "@/domains/products/hooks";
import { formatCurrency } from "@/utilities/currency";
import Spinner from "@/components/atoms/Spinner";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

const ProductListOrganism = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [productsParams, setProductParams] = useState({
    category: "",
    search: "",
    limit: 10,
    page: 1,
  });

  const { data: categories } = useProductCategories({
    key: "useProductCategories",
  });
  const { data, isLoading } = useAllProducts({
    key: [
      "useAllProducts",
      productsParams?.category,
      productsParams?.search,
      productsParams?.page,
    ],
    params: {
      ...productsParams,
    },
  });

  const handleSearch = () => {
    setProductParams({
      ...productsParams,
      search: searchKeyword,
      category: "",
    });
  };

  const categoryOptions = useMemo(() => {
    return categories
      ? categories?.map((category) => ({
          label: category,
          value: category,
        }))
      : [];
  }, [categories]);

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
      {
        title: "Title",
        dataKey: "title",
        render: (title, row) => (
          <div>
            <Text>{title}</Text>
            <Text size="xs" color="gray">
              {row.category}
            </Text>
          </div>
        ),
      },
      {
        title: "Price",
        dataKey: "price",
        render: (price) => (
          <Text weight="bold">{formatCurrency(Number(price))}</Text>
        ),
      },
      { title: "Description", dataKey: "description" },
      { title: "Stock", dataKey: "stock" },
    ],
    []
  );

  return (
    <div>
      <Text size="3xl" weight="bold" className="">
        Products
      </Text>
      {isLoading ? (
        <div className="mt-8">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="flex flex-col xl:flex-row justify-end gap-4 py-4">
            <Input
              type="text"
              placeholder="Search..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onEnter={handleSearch}
              className="w-full xl:w-60"
              prefixIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              }
            />
            <Select
              options={categoryOptions}
              value={productsParams?.category}
              onChange={(e) => {
                setProductParams({
                  ...productsParams,
                  search: "",
                  category: e.target.value,
                });
                setSearchKeyword("");
              }}
              placeholder="Select category"
              className="w-full xl:w-60"
            />
          </div>

          <DataTable
            data={data?.products ?? []}
            columns={columns}
            totalData={data?.total ?? 0}
            limit={data?.limit ?? 0}
            onPaginate={(page) => setProductParams({ ...productsParams, page })}
            page={productsParams?.page}
          />
        </div>
      )}
    </div>
  );
};

export default ProductListOrganism;
