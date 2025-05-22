"use client";

import { Image, Input, message, Popconfirm, TableProps, Tag } from "antd";
import { useState } from "react";
import { ArrowDownWideNarrowIcon, Eye, Search, Trash2 } from "lucide-react";
import moment from "moment";
import UserDetails from "./UserDetails";
import DataTable from "@/utils/DataTable";
import { IUser } from "@/types";
import { TDataType } from "@/types/userTable";
import { deleteUser } from "@/services/users";

const UsersTable = ({
  usersData,
}: {
  usersData: { allUsers: IUser[]; meta: any };
}) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [open, setOpen] = useState(false);

  // console.log("usersData", usersData);

  const confirmBlock = async (id: string) => {
    console.log(id);
    try {
      const deleteInfo = {
        data: {
          userId: id,
        },
      };
      const res = await deleteUser(deleteInfo);
      // console.log("res", res);

      if (res?.success) {
        message.success("User deleted successfully");
      } else {
        message.error(res?.message || "Failed to delete user");
      }
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "#SL",
      dataIndex: "serial",
      render: (_, __, index) => index + 1,
    },
    {
      title: "User Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex items-center gap-x-2">
          <Image
            src={record.photo || "/user-profile.png"}
            alt="profile-picture"
            width={40}
            height={40}
            className="rounded-full object-cover"
            preview={false}
          />
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      render: (date: string) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Acc Type",
      dataIndex: "role",
      filterIcon: () => <ArrowDownWideNarrowIcon className="text-white" />,
      onFilter: (value, record) => record.role.indexOf(value as string) === 0,
    },
    {
      title: "Status",
      dataIndex: "approvedUpdate",
      render: (approved: boolean) => (
        <Tag color={approved ? "green" : "orange"}>
          {approved ? "Approved" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Eye
            size={22}
            className="cursor-pointer"
            onClick={() => {
              setSelectedUser(record);
              setOpen(true);
            }}
          />
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => confirmBlock(record?.id as string)}
            okText="Yes"
            cancelText="No"
          >
            <Trash2 size={22} color="#CD0335" className="cursor-pointer" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-section-bg rounded-md">
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-2xl text-text-color">
          All Users ({usersData?.meta?.total})
        </h1>
      </div>
      <DataTable columns={columns} usersData={usersData} pageSize={10} />
      <UserDetails open={open} setOpen={setOpen} user={selectedUser} />
    </div>
  );
};

export default UsersTable;
