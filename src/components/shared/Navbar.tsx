"use client";
import { Avatar, Badge, Flex } from "antd";
import { FaBars } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import avatarImg from "@/assets/image/profile.png";

import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

type TNavbarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar = ({ collapsed, setCollapsed }: TNavbarProps) => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between w-[97%] font-poppins">
      {/* Header left side */}
      <Flex align="center" gap={20}>
        <button
          onClick={() => setCollapsed(collapsed ? false : true)}
          className="cursor-pointer hover:bg-gray-300 rounded-full duration-1000"
        >
          <FaBars size={28} />
        </button>
        <div className="flex flex-col ">
          <h2 className="md:text-2xl text-lg  font-medium">
            Welcome, Avinash
            <span className="block  text-sm font-normal">
              Have a great day!
            </span>
          </h2>
        </div>
      </Flex>

      {/* Header right side */}
      <Flex align="center" gap={20}>
        {/* Notification */}
        <Link href={"/notifications"}>
          <div className="flex justify-center items-center size-12  rounded-full cursor-pointer relative border border-main-color">
            <IoNotificationsOutline size={24} color="#fff" />

            <Badge
              count={1}
              style={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "var(--color-main)",
                color: "#fff",
                position: "absolute",
                top: "-24px",
                right: "-8px",
              }}
            ></Badge>
          </div>
        </Link>

        {user && user.role === "ADMIN" && (
          <Link href={"#"} className="flex items-center">
            <Avatar
              src={avatarImg.src}
              size={48}
              className="border border-main-color size-12"
            ></Avatar>
          </Link>
        )}
      </Flex>
    </div>
  );
};

export default Navbar;
