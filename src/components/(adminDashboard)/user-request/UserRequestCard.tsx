"use client";
import Image from "next/image";
import userProfile from "@/assets/image/userImage.png";
import { Button, message, Popconfirm, PopconfirmProps } from "antd";
import React, { useState } from "react";
import UserModal from "./UserModal";
import { IUser } from "@/types";
import { deleteUser, updateUserRequest } from "@/services/users";
import { toast } from "sonner";

const UserRequestCard = ({ data }: { data: IUser }) => {
  // console.log(data);
  const [open, setOpen] = useState(false);

  // ---------- Accept User ---------- \\
  const handleAcceptRequest = async (id: string) => {
    // console.log(id);
    const userId = {
      data: {
        updateId: id,
      },
    };
    try {
      const res = await updateUserRequest(userId);
      // console.log(res);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    }
  };

  // ---------- Delete User ---------- \\
  const handleDelete = async (id: string) => {
    console.log(id);
    const deleteInfo = {
      data: {
        userId: id,
      },
    };

    try {
      const res = await deleteUser(deleteInfo);
      console.log("res", res);

      if (res?.success) {
        message.success("User deleted successfully");
      } else {
        message.error(res?.message || "Failed to delete user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-main-color-bg p-4 flex gap-x-3  text-text-color rounded-md">
      <Image
        src={userProfile}
        alt="profile_image"
        className="size-20 cursor-pointer rounded-full"
        onClick={() => setOpen(true)}
      ></Image>
      <div className="space-y-2 ">
        <h3
          className="text-xl font-bold cursor-pointer"
          onClick={() => setOpen(true)}
        >
          {data?.name}
        </h3>
        <p>
          Account Type: <span className="font-medium">{data?.status}</span>
        </p>

        <div className="flex gap-x-5">
          <Button
            onClick={() => handleAcceptRequest(data?._id as string)}
            className="bg-main-colo !border-none  !rounded-none !rounded-tl-xl  !rounded-br-xl !px-5"
          >
            Accept
          </Button>

          <Popconfirm
            title="Delete Request"
            description="Are you sure to delete this request?"
            onConfirm={() => handleDelete(data?._id as string)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="!bg-primary-red !border-none   !rounded-none !rounded-tl-xl  !rounded-br-xl !px-5">
              Delete
            </Button>
          </Popconfirm>
        </div>
      </div>
      <UserModal open={open} setOpen={setOpen}></UserModal>
    </div>
  );
};

export default UserRequestCard;
