"use client";
import Text from "@/components/atoms/Text";
import { menuItems } from "@/utilities/constant";
import { usePathname, useRouter } from "next/navigation";
import { MobileNavBarProps } from "./type";

const MobileNavBar: React.FC<MobileNavBarProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex items-center h-16 bg-white shadow-sm p-4 gap-2 flex xl:hidden">
      <Text size="lg" weight="bold" className="uppercase flex-1">
        Dealls Shop
      </Text>
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => router.push(item.link)}
          className={`flex items-center hover:text-blue-500 hover:text-white hover:cursor-pointer rounded-md ${
            pathname === item.link ? "text-blue-500" : "text-gray-600"
          }`}
        >
          <span className={`flex-1 font-bold`}>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default MobileNavBar;
