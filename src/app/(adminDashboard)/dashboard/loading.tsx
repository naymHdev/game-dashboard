"use client";

import { Card, Skeleton, Table } from "antd";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";

export default function DashboardSkeleton() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <div className=" mx-auto space-y-6">
        <StatsCardRow />
        <ChartSection />
        <TableSection />
      </div>
    </div>
  );
}

function StatsCardRow() {
  const stats = [
    { title: "Total Users", width: "100px" },
    { title: "Upcoming Release", width: "140px" },
    { title: "Total Game Listed", width: "130px" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-none">
      {stats.map((stat, index) => (
        <StatCard key={index} title={stat.title} width={stat.width} />
      ))}
    </div>
  );
}

function StatCard({ title, width }: { title: string; width: string }) {
  return (
    <Card
      className="bg-gray-800 shadow-md border-none"
      bodyStyle={{ backgroundColor: "#1F2937" }}
    >
      <div className="space-y-3">
        <Skeleton.Input
          active
          size="small"
          style={{ width, backgroundColor: "#374151" }}
        />
        <Skeleton.Input
          active
          size="large"
          style={{ width: "60px", backgroundColor: "#374151" }}
        />
      </div>
    </Card>
  );
}

function ChartSection() {
  return (
    <Card
      className="bg-gray-800 shadow-md"
      bodyStyle={{ backgroundColor: "#1F2937" }}
    >
      <div className="space-y-4">
        <Skeleton.Input
          active
          size="default"
          style={{ width: "150px", backgroundColor: "#374151" }}
        />

        <div className="h-80 w-full rounded-lg overflow-hidden relative">
          {/* Chart background */}
          <div className="absolute inset-0 bg-gray-800"></div>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4">
            {["2200", "1650", "1100", "550", "0"].map((label, index) => (
              <div key={index} className="px-2">
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: "40px", backgroundColor: "#4B5563" }}
                />
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="absolute left-16 right-4 bottom-4 flex justify-between">
            {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((month, index) => (
              <Skeleton.Input
                key={index}
                active
                size="small"
                style={{ width: "30px", backgroundColor: "#4B5563" }}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function TableSection() {
  // Define column structure
  const columns: ColumnsType<any> = [
    {
      title: "#SL",
      key: "sl",
      width: 80,
      render: () => <SkeletonCell width="30px" />,
    },
    {
      title: "Full Name",
      key: "fullName",
      render: () => <SkeletonCell width="120px" />,
    },
    {
      title: "Email",
      key: "email",
      render: () => <SkeletonCell width="200px" />,
    },
    {
      title: "Join Date",
      key: "joinDate",
      render: () => <SkeletonCell width="100px" />,
    },
    {
      title: "Account Type",
      key: "accountType",
      render: () => <SkeletonCell width="80px" />,
    },
  ];

  // Generate skeleton data rows
  const skeletonData = Array.from({ length: 5 }, (_, i) => ({ key: i }));

  return (
    <Card
      className="bg-gray-800 shadow-md overflow-x-auto"
      bodyStyle={{ backgroundColor: "#1F2937", padding: 0 }}
    >
      <Table
        columns={columns}
        dataSource={skeletonData}
        pagination={false}
        className="custom-dark-table"
      />
    </Card>
  );
}

// Reusable skeleton cell component
function SkeletonCell({ width }: { width: string }) {
  return (
    <Skeleton.Input
      active
      size="small"
      style={{ width, backgroundColor: "#374151" }}
    />
  );
}
