"use client";
import { TableProps } from "antd";

import { useState } from "react";
import DataTable from "@/utils/DataTable";
import moment from "moment";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  type: string;
  photo?: string;
};

const LatestUser = ({ usersData }: { usersData: any }) => {
  // console.log(" usersData", usersData?.allUsers);
  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "#SL",
      dataIndex: "serial",
    },
    {
      title: "Full Name",
      dataIndex: "name",
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
      title: "Account Type",
      dataIndex: "role",
    },
  ];

  return (
    <div className="bg-section-bg rounded-md">
      <DataTable columns={columns} data={usersData?.allUsers}></DataTable>
    </div>
  );
};

export default LatestUser;
