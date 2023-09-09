"use client";
import { useCallback, useMemo, useState } from "react";
import Button from "../../atoms/Button";
import DataTable from "../../atoms/Table";
import Text from "../../atoms/Text";
import { TableColumn } from "../../atoms/Table/type";
import { Product } from "@/domains/products/models";
import Image from "next/image";
import { useAllProducts, useProductCategories } from "@/domains/products/hooks";
import { CartItem } from "@/domains/carts/models";
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
      <Text size="3xl" weight="bold" className="">
        Products
      </Text>
      {isLoading ? (
        <div className="mt-8">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="flex justify-end gap-4 py-4">
            <Input
              type="text"
              placeholder="Search..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onEnter={handleSearch}
              prefixIcon={
                // search icon
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
