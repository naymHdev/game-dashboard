"use client";
import {
  Input,
  message,
  Popconfirm,
  PopconfirmProps,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye, Search, Trash } from "lucide-react";
import GameDetails from "./GameDetails";
import moment from "moment";

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

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Deleted the game");
};

const AllGamesTable = ({ gamesArray }: { gamesArray: any }) => {
  console.log(gamesArray?.data?.allGames[1]);
  const [open, setOpen] = useState(false);
  const [isGameDetails, setIsGameDetails] = useState(null);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "#SL",
      key: "serial",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Game Name",
      dataIndex: "title",
    },
    {
      title: "Publisher Email",
      key: "publisherEmail",
      render: (_: any, record: any) => record?.userId?.email || "N/A",
    },
    {
      title: "Game Platforms",
      dataIndex: "platform",
      render: (platforms: string[]) => (
        <>
          {platforms?.map((platform) => (
            <Tag key={platform}>{platform}</Tag>
          ))}
        </>
      ),
    },

    {
      title: "Publish Date",
      dataIndex: "createdAt",
      render: (date: string) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Game Price",
      dataIndex: "price",
    },
    {
      title: "Status",
      key: "gameStatus",
      render: (_: any, record: any) => {
        const status = record?.gameStatus;
        const upcomingDate = record?.upcomingDate;

        if (status === "upcoming") {
          return (
            <Tooltip
              title={`Releases on: ${moment(upcomingDate).format(
                "MMMM D, YYYY"
              )}`}
            >
              <Tag color="orange" style={{ cursor: "pointer" }}>
                Upcoming
              </Tag>
            </Tooltip>
          );
        }

        if (status === "active") {
          return <Tag color="green">Active</Tag>;
        }

        return <Tag color="default">{status}</Tag>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-2 ">
          <Eye
            size={22}
            color="var(--color-text-color)"
            onClick={() => {
              setIsGameDetails(record);
              setOpen(true);
            }}
          />
          <Popconfirm
            title="Delete the game"
            description="Are you sure to delete the game?"
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
        <h1 className="  text-2xl text-text-color">All Games</h1>
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
          placeholder="Search Users..."
          prefix={<Search size={20} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable
        columns={columns}
        data={gamesArray?.data?.allGames}
        pageSize={10}
      ></DataTable>
      <GameDetails open={open} setOpen={setOpen} details={isGameDetails} />
    </div>
  );
};

export default AllGamesTable;
