"use client";

import { Image, Input, message, Popconfirm, TableProps, Tag } from "antd";
import { useState } from "react";
import { CgUnblock } from "react-icons/cg";
import { ArrowDownWideNarrowIcon, Eye, Search } from "lucide-react";
import moment from "moment";
import UserDetails from "./UserDetails";
import DataTable from "@/utils/DataTable";
import { IUser } from "@/types";
import { TDataType } from "@/types/userTable";

interface Props {
  usersData: {
    allUsers: IUser[];
    meta: {
      page: number;
      limit: number;
      total: number;
    };
  };
}

const UsersTable = ({
  usersData,
}) => {
  const [open, setOpen] = useState(false);

  const confirmBlock = () => {
    message.success("Blocked the user");
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
            onClick={() => setOpen(!open)}
          />
          <Popconfirm
            title="Block the user"
            description="Are you sure to block this user?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <CgUnblock size={22} color="#CD0335" className="cursor-pointer" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-section-bg rounded-md">
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-2xl text-text-color">All Users</h1>
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white placeholder:text-gray-500"
          placeholder="Search Users..."
          prefix={<Search size={20} color="#000" />}
        />
      </div>
      <DataTable columns={columns} usersData={usersData} pageSize={10} />
      <UserDetails open={open} setOpen={setOpen} />
    </div>
  );
};

export default UsersTable;
