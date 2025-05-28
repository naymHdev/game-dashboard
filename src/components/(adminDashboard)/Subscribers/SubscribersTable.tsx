"use client";

import { Table, Tag, Button, Space, Input, Select, Card } from "antd";
import { Search, Mail, Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import { deleteSubscriber } from "@/services/subscribers";
import { toast } from "sonner";

interface IUser {
  email: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface SubscribersTableProps {
  user: IUser[];
}

const SubscribersTable = ({ user }: SubscribersTableProps) => {
  // console.log("user", user);

  const [filteredData, setFilteredData] = useState<IUser[]>(user || []);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter data based on search and status
  useEffect(() => {
    if (!user) return;

    let filtered = user;

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.email.toLowerCase().includes(searchText.toLowerCase()) ||
          item.id.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => {
        if (statusFilter === "active") return !item.isDeleted;
        if (statusFilter === "deleted") return item.isDeleted;
        return true;
      });
    }

    setFilteredData(filtered);
  }, [searchText, statusFilter, user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async (id: string) => {
    console.log("Delete user:", id);

    const deleteData = {
      data: {
        newsletterId: id,
      },
    };

    try {
      const res = await deleteSubscriber(deleteData);
      // console.log("res", res);

      if (res?.success) {
        toast.success("Newsletter deleted successfully");
      } else {
        toast.error(res?.message || "Failed to delete subscriber");
      }
    } catch (error: any) {
      return Error(error);
    }
  };

  const columns: ColumnsType<IUser> = [
    {
      title: "#",
      key: "index",
      width: 50,
      render: (_, __, index) => (
        <span className=" text-white font-medium">{index + 1}</span>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      align: "left",
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: (email: string) => (
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-500" />
          <span className="font-medium text-white">{email}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isDeleted",
      key: "status",
      align: "center",
      width: 120,
      filters: [
        { text: "Active", value: false },
        { text: "Deleted", value: true },
      ],
      onFilter: (value, record) => record.isDeleted === value,
      render: (isDeleted: boolean) => (
        <Tag color={isDeleted ? "red" : "green"} className="font-medium">
          {isDeleted ? "Deleted" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => (
        <span className=" text-white">{formatDate(date)}</span>
      ),
    },
    {
      title: "Last Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 180,
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      render: (date: string) => (
        <span className=" text-white">{formatDate(date)}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space className=" bg-transparent text-white">
          <button onClick={() => handleDelete(record?.id)}>
            <Trash2 className="w-4 h-4 text-red-600 hover:text-red-800" />
          </button>
        </Space>
      ),
    },
  ];

  if (!user || user.length === 0) {
    return (
      <Card className="shadow-sm w-full">
        <div className="text-center py-8">
          <Mail className="w-12 h-12 text-white mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No subscribers found
          </h3>
          <p className="text-gray-500">
            There are no subscribers to display at the moment.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className=" p-0">
      <Card
        className="shadow-sm"
        style={{ backgroundColor: "#252728", borderColor: "#2F4F4F" }}
      >
        <div className="mb-4">
          <h2 className="text-lg text-white font-semibold">
            Subscribers ({filteredData.length})
          </h2>
          <p className="text-sm text-gray-300 mb-6">
            Manage your subscribers and their information
          </p>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          className="w-full"
        />
      </Card>
    </div>
  );
};

export default SubscribersTable;
