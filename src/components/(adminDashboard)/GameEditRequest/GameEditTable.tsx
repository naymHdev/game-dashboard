"use client";
import {
  Image,
  Input,
  message,
  Popconfirm,
  PopconfirmProps,
  TableProps,
} from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye, Search, Trash } from "lucide-react";
import EditDetails from "./EditDetails";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  publisherEmail: string;
  phone: string;
  date: string;
  price: string;
  gamePlatform: string[];
};
const data: TDataType[] = Array.from({ length: 18 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "James Tracy",
  publisherEmail: "james1234@gmail.comm",
  phone: "12345678",
  date: "11 Oct, 2024",
  price: "$9.80",
  gamePlatform: ["Ios", "Android"],
}));

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};

const GameEditTable = () => {
  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "#SL",
      dataIndex: "serial",
    },
    {
      title: "Game Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
          <Image
            src={"/user-profile.png"}
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
      title: "Publisher Email",
      dataIndex: "publisherEmail",
    },
    {
      title: "Game Platforms",
      dataIndex: "gamePlatform",
    },
    {
      title: "Request Date",
      dataIndex: "date",
    },
    {
      title: "Game Price",
      dataIndex: "price",
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
            title="Denied the request!"
            description="Are you sure to denied the edit request?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <Trash size={22} color="#CD0335" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-section-bg rounded-md">
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="  text-2xl text-text-color">Game Edit Requests</h1>
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
          placeholder="Search Users..."
          prefix={<Search size={20} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable columns={columns} data={data} pageSize={10}></DataTable>
      <EditDetails open={open} setOpen={setOpen} />
    </div>
  );
};

export default GameEditTable;
