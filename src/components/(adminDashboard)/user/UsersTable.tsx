"use client";
import {
  Image,
  Input,
  message,
  Popconfirm,
  PopconfirmProps,
  TableProps,
  Tag,
} from "antd";
import UserDetails from "./UserDetails";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { CgUnblock } from "react-icons/cg";
import { ArrowDownWideNarrowIcon, Eye, Search } from "lucide-react";
import { IUser } from "@/types";
import moment from "moment";
import { TDataType } from "@/types/userTable";

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};

const UsersTable = ({ usersData }: { usersData: IUser[] }) => {
  console.log("usersData", usersData);

  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "#SL",
      dataIndex: "serial",
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
            className="size-10"
          ></Image>
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
      key: "createdAt",
      render: (createdAt: string) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      title: "Acc Type",
      dataIndex: "role",
      filterIcon: () => (
        <ArrowDownWideNarrowIcon
          className="flex justify-start items-start"
          color="#fff"
        />
      ),
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
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
      render: () => (
        <div className="flex gap-2 ">
          <Eye
            size={22}
            color="var(--color-text-color)"
            onClick={() => setOpen(!open)}
          />
          <Popconfirm
            title="Block the user"
            description="Are you sure to block this user?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <CgUnblock size={22} color="#CD0335" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-section-bg rounded-md">
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="  text-2xl text-text-color">All Users</h1>
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
          placeholder="Search Users..."
          prefix={<Search size={20} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable
        columns={columns}
        data={usersData.allUsers}
        pageSize={10}
      ></DataTable>
      <UserDetails open={open} setOpen={setOpen}></UserDetails>
    </div>
  );
};

export default UsersTable;
