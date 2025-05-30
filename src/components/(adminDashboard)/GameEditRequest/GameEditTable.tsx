"use client";

import { Image, message, Popconfirm, TableProps, Tag } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye, Trash } from "lucide-react";
import EditDetails from "./EditDetails";
import { TGameSubmission } from "@/types/games";
import { rejectGameEditRequest } from "@/services/games";
import userProfile from "@/assets/image/profile-avatart.png";

const confirmBlock = async (id: string) => {
  try {
    const res = await rejectGameEditRequest({ data: { updateId: id } });
    console.log("res", res);

    if (res?.success) {
      message.success("Game deleted successfully");
    } else {
      message.error(res?.message || "Failed to delete game");
    }
  } catch (error) {
    message.error("Something went wrong!");
  }
};

const GameEditTable = ({
  gameEditData,
}: {
  gameEditData: TGameSubmission[];
}) => {
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<TGameSubmission | null>(
    null
  );

  const columns: TableProps<TGameSubmission>["columns"] = [
    {
      title: "#SL",
      dataIndex: "id",
      key: "serial",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Game Name",
      dataIndex: "title",
      render: (text, record) => (
        <div className="flex items-center gap-x-2">
          <Image
            src={record.image[0] || "avatar.png"}
            alt={record.title}
            width={40}
            height={40}
            preview={false}
            className="rounded-md object-cover"
          />
          <span>{text}</span>
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Publisher Email",
      dataIndex: ["userId", "email"],
      ellipsis: { showTitle: false },
      render: (email) => (
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
      dataIndex: "submittedAt",
      width: 120,
      responsive: ["md"],
      render: (date: string) =>
        new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      title: "Game Price",
      dataIndex: "price",
      width: 100,
      responsive: ["md"],
      render: (price: number) => `$${price.toFixed(2)}`,
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
            onClick={() => {
              setSelectedGame(record);
              setOpen(true);
            }}
            className="cursor-pointer"
            title="View Details"
          />
          <Popconfirm
            title="Deny the edit request?"
            onConfirm={() => confirmBlock(record?.id as string)}
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
      <DataTable columns={columns} data={gameEditData} pageSize={10} />
      <EditDetails open={open} setOpen={setOpen} details={selectedGame} />
    </div>
  );
};

export default GameEditTable;
