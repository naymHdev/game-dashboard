"use client";

import {
  Image,
  message,
  Popconfirm,
  PopconfirmProps,
  TableProps,
  Tag,
} from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye, Trash } from "lucide-react";
import EditDetails from "./EditDetails";
import { TGameSubmission } from "@/types/games";

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Denied the edit request");
};

const GameEditTable = ({
  gameEditData,
}: {
  gameEditData: TGameSubmission[];
}) => {
  console.log("gameEditData", gameEditData);

  const [open, setOpen] = useState(false);

  // Map real data to table data keys expected in columns
  const data = gameEditData.map((game, index) => ({
    key: game.id,
    serial: index + 1,
    title: game.title,
    publisherEmail:
      typeof game.userId === "object" && game.userId !== null
        ? (game.userId.email as string)
        : "N/A",
    platform: game.platform,
    date: new Date(game.submittedAt).toLocaleDateString(),
    price: `$${game.price.toFixed(2)}`,
  }));

  const columns: TableProps<(typeof data)[0]>["columns"] = [
    {
      title: "#SL",
      dataIndex: "serial",
      width: 60,
    },
    {
      title: "Game Name",
      dataIndex: "title",
      render: (text) => (
        <div className="flex items-center gap-x-2">
          <Image
            src={"/user-profile.png"}
            alt="profile-picture"
            width={40}
            height={40}
            preview={false}
          />
          <span>{text}</span>
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Publisher Email",
      dataIndex: "publisherEmail",
      ellipsis: {
        showTitle: false,
      },
      render: (email: string) => (
        <span title={email} className="block max-w-[200px] truncate">
          {email || "N/A"}
        </span>
      ),
    },
    {
      title: "Game Platforms",
      dataIndex: "platform",
      render: (platforms: string[]) => (
        <>
          {platforms.map((platform) => (
            <Tag key={platform} color="blue" style={{ marginBottom: 4 }}>
              {platform}
            </Tag>
          ))}
        </>
      ),
      ellipsis: true,
    },
    {
      title: "Request Date",
      dataIndex: "date",
      width: 120,
      responsive: ["md"],
    },
    {
      title: "Game Price",
      dataIndex: "price",
      width: 100,
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <div className="flex gap-3 items-center justify-center">
          <Eye
            size={22}
            color="var(--color-text-color)"
            onClick={() => setOpen(true)}
            className="cursor-pointer"
            title="View Details"
          />
          <Popconfirm
            title="Deny the edit request?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <Trash
              size={22}
              color="#CD0335"
              className="cursor-pointer"
              title="Deny Request"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-section-bg rounded-md">
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-2xl text-text-color">Game Edit Requests</h1>
      </div>
      <DataTable columns={columns} data={data} pageSize={10} />
      <EditDetails open={open} setOpen={setOpen} />
    </div>
  );
};

export default GameEditTable;
