"use client";

import React, { useState } from "react";
import { Flex, Pagination, Popconfirm, Table, Tag, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import moment from "moment";
import { Eye, Trash } from "lucide-react";
import { TGameTable } from "@/types/gameTable";
import { useRouter, useSearchParams } from "next/navigation";
import GameDetails from "./GameDetails";
import { toast } from "sonner";
import { deleteGame } from "@/services/games";

const confirmBlock = async (id: string) => {
  try {
    const deleteInfo = {
      data: {
        gameId: id,
      },
    };
    const res = await deleteGame(deleteInfo);

    if (res?.success) {
      toast.success("User deleted successfully");
    } else {
      toast.error(res?.message || "Failed to delete user");
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }
};

const GameTable = ({
  gamesArray,
  searchParams,
}: {
  gamesArray: any;
  searchParams: string;
}) => {
  const [open, setOpen] = useState(false);
  const [isGameDetails, setIsGameDetails] = useState(null);


  const dataSource: TGameTable[] = gamesArray?.data?.allGames?.map(
    (game: any, index: number) => ({
      ...game,
      key: game._id || index,
    })
  );

  const router = useRouter();
  const searchParamsClient = useSearchParams();
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParamsClient.toString());
    params.set("page", page?.toString());
    router.push(`?${params.toString()}`);
  };

  const columns: TableColumnsType<TGameTable> = [
    {
      title: "#SL",
      key: "serial",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Game Name", dataIndex: "title" },
    { title: "Buy Website", dataIndex: "linkType" },
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
            onConfirm={() => confirmBlock(record?.id as string)}
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
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <h1 className="  text-2xl text-text-color">All Games</h1>
      </Flex>
      <Table<TGameTable>
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        footer={() => {
          return (
            <Pagination
              current={searchParams ? Number(searchParams) : 1}
              onChange={handlePageChange}
              align="end"
              total={gamesArray?.data?.meta.total}
            />
          );
        }}
      />
      <GameDetails open={open} setOpen={setOpen} details={isGameDetails} />
    </Flex>
  );
};

export default GameTable;
