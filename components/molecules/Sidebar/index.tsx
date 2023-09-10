"use client";
import Text from "@/components/atoms/Text";
import { menuItems } from "@/utilities/constant";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-white h-screen w-1/4 2xl:w-1/6 pt-10 shadow-md hidden lg:flex flex-col">
      <div className="mb-4 px-4">
        <Text size="2xl" weight="bold" className="uppercase">
          Dealls Shop
        </Text>
      </div>
      <ul className="flex-1 px-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => router.push(item.link)}
            className={`flex items-center py-4 px-8 mb-2 hover:bg-blue-500 hover:text-white hover:cursor-pointer rounded-md ${
              pathname === item.link
                ? "bg-blue-500 text-white"
                : "text-gray-600"
            }`}
          >
            <span className={`flex-1 font-bold`}>{item.text}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center p-4 bg-gray-100">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <Text className="text-center text-white" weight="bold">
            JD
          </Text>
        </div>
        <div className="ml-4">
          <Text>John Doe</Text>
          <Text color="gray">Admin</Text>
        </div>
        <div className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-6 w-6 hover:cursor-pointer hover:text-red-500"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
