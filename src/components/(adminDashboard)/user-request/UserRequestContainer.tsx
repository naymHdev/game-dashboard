"use client";
import { Button, Dropdown, Input, MenuProps } from "antd";
import { ArrowDownWideNarrowIcon } from "lucide-react";

import { IoIosSearch } from "react-icons/io";
import UserRequestCard from "./UserRequestCard";
import { IUser } from "@/types";

const UserRequestContainer = ({ userData }: { userData: any }) => {
  // console.log("userData", userData);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Publisher",
    },
    {
      key: "2",
      label: "User",
    },
  ];

  return (
    <div className="min-h-[80vh] bg-section-bg px-4 py-2 rounded-md text-text-color">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold w-full text-primary-white">
          User Requests ({userData?.data?.length})
        </h1>
        <div className="flex gap-x-2 justify-center items-center">
          <Input
            type="search"
            size="large"
            placeholder="Search..."
            prefix={<IoIosSearch size={20} />}
            className=" xl:min-w-[500px]"
          />
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            arrow
            className="!border-none"
          >
            <Button className="text-primary-white bg-primary-orange py-4">
              <ArrowDownWideNarrowIcon size={16} /> Filter
            </Button>
          </Dropdown>
        </div>
      </div>
      {/* show request users data */}
      <div className="mt-10 grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-4">
        {userData?.data?.map((user: IUser, inx) => (
          <UserRequestCard key={inx + 1} data={user} />
        ))}
      </div>
    </div>
  );
};

export default UserRequestContainer;
