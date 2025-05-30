"use client";
import Image from "next/image";
import userProfile from "@/assets/image/profile-avatart.png";
import { Button, message, Popconfirm } from "antd";
import React, { useState } from "react";
import UserModal from "./UserModal";
import { IUser } from "@/types";
import { rejectUserRequest, updateUserRequest } from "@/services/users";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const UserRequestCard = ({ data }: { data: IUser }) => {
  // console.log(" data", data);
  const [open, setOpen] = useState(false);

  // ---------- Accept User ---------- \\
  const handleAcceptRequest = async (id: string) => {
    // console.log(id);
    const acceptedData = {
      data: {
        updateId: id,
      },
    };

    // console.log("acceptedData", acceptedData);

    try {
      const res = await updateUserRequest(acceptedData);
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
    const deleteInfo = {
      data: {
        updateId: id,
      },
    };
    // console.log("deleteInfo", deleteInfo);

    try {
      const res = await rejectUserRequest(deleteInfo);
      // console.log("res", res);

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
        src={data?.photo || userProfile}
        alt="profile_image"
        className="size-20 cursor-pointer rounded-full"
        onClick={() => setOpen(true)}
        width={1000}
        height={1000}
      ></Image>
      <div className="space-y-2 ">
        <h3
          className="text-xl font-bold cursor-pointer"
          onClick={() => setOpen(true)}
        >
          {data?.name}
        </h3>
        <p>
          Account Type:
          <span
            className={cn(
              "font-medium text-sm capitalize px-1",
              data?.status === "pending" && "text-red-500",
              data?.status === "approved" && "text-green-600"
            )}
          >
            {data?.status}
          </span>
        </p>

        <div className="flex gap-x-5">
          <Button
            onClick={() => handleAcceptRequest(data?.id as string)}
            className="bg-main-colo !border-none  !rounded-none !rounded-tl-xl  !rounded-br-xl !px-5"
          >
            Accept
          </Button>

          <Popconfirm
            title="Delete Request"
            description="Are you sure to delete this request?"
            onConfirm={() => handleDelete(data?.id as string)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="!bg-primary-red !border-none   !rounded-none !rounded-tl-xl  !rounded-br-xl !px-5">
              Delete
            </Button>
          </Popconfirm>
        </div>
      </div>
      <UserModal open={open} setOpen={setOpen} user={data} />
    </div>
  );
};

export default UserRequestCard;
