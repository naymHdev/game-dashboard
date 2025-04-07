"use client";
import Image from "next/image";
import userProfile from "@/assets/image/userProfile.png";
import { Button, message, Popconfirm, PopconfirmProps } from "antd";
import { useState } from "react";
import UserDetails from "../user/UserDetails";

type TProps = {
  name: string;
  type: string;
};

const UserRequestCard = ({ data }: { data: TProps }) => {
  const [open, setOpen] = useState(false);
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    message.success("Successfully blocked this user");
  };
  return (
    <div className="bg-primary-white p-4 flex gap-x-3 rounded">
      <Image
        src={userProfile}
        alt="profile_image"
        className="size-20 cursor-pointer"
        onClick={() => setOpen(true)}
      ></Image>
      <div className="space-y-2 ">
        <h3
          className="text-xl font-bold cursor-pointer"
          onClick={() => setOpen(true)}
        >
          {data?.type}
        </h3>
        <p>
          Account Type: <span className="font-medium">{data?.name}</span>
        </p>

        <div className="flex gap-x-5">
          <Button className="bg-primary-orange text-primary-white rounded-none rounded-tl-lg  rounded-br-lg">
            Accept
          </Button>

          <Popconfirm
            title="Delete Request"
            description="Are you sure to delete this request?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button className="border-primary-orange text-primary-orange rounded-none rounded-tl-lg  rounded-br-lg">
              Delete
            </Button>
          </Popconfirm>
        </div>
      </div>
      <UserDetails open={open} setOpen={setOpen}></UserDetails>
    </div>
  );
};

export default UserRequestCard;
