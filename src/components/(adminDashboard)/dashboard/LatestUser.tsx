"use client";
import { Image, TableProps } from "antd";

import { useState } from "react";
import DataTable from "@/utils/DataTable";
import UserDetails from "../user/UserDetails";
import { ArrowDownWideNarrowIcon, Eye } from "lucide-react";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  type: string;
};
const data: TDataType[] = Array.from({ length: 5 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "James Tracy",
  email: "james1234@gmail.comm",
  type: "User",
  date: "11 April, 2025",
}));

const LatestUser = () => {
  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "#SL",
      dataIndex: "serial",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
          <Image
            src={"/user-profile.png"}
            alt="profile-picture"
            width={40}
            height={40}
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
      dataIndex: "date",
    },
    {
      title: "Account Type",
      dataIndex: "type",

      filters: [
        {
          text: "User",
          value: "User",
        },
        {
          text: "Vendor",
          value: "vendor",
        },
      ],
      filterIcon: () => (
        <ArrowDownWideNarrowIcon
          className="flex justify-start items-start"
          color="#fff"
        />
      ),
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
  ];

  return (
    <div className="bg-section-bg rounded-md">
      <DataTable columns={columns} data={data}></DataTable>
      <UserDetails open={open} setOpen={setOpen}></UserDetails>
    </div>
  );
};

export default LatestUser;
