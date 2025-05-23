"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", users: 200 },
  { name: "Feb", users: 1502 },
  { name: "Mar", users: 1525 },
  { name: "Apr", users: 822 },
  { name: "May", users: 1553 },
  { name: "Jun", users: 1634 },
  { name: "Jul", users: 1923 },
  { name: "Aug", users: 1324 },
  { name: "Sep", users: 834 },
  { name: "Oct", users: 1256 },
  { name: "Nov", users: 1634 },
  { name: "Dec", users: 2105 },
];

const UserOverviewChart = ({ userStatistics }: { userStatistics: any }) => {
  const { totalUsers, totalUpcomingGames, totalGames } = userStatistics || {};
  // console.log("StatisticData", userStatistics);
  return (
    <div className="bg-secondary-color  rounded-lg p-8 ">
      <div className="text-text-color flex lg:flex-wrap xl:flex-nowrap justify-between items-center mb-10 gap-2">
        <h1 className="text-xl">User Overview</h1>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="#497F7F" stopOpacity={1} />
              <stop offset="100%" stopColor="#323637" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <XAxis
            tickMargin={10}
            axisLine={false}
            tickLine={false}
            color="#fff"
            dataKey="name"
            tick={{ fill: "var(--color-text-color)" }}
          />
          <YAxis
            tickMargin={20}
            axisLine={false}
            tickLine={false}
            color="#fff"
            tick={{ fill: "var(--color-text-color)" }}
          />
          <Tooltip />
          <Area
            activeDot={false}
            type="monotone"
            dataKey="users"
            strokeWidth={0}
            stroke="#080E0E"
            fill="url(#color)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserOverviewChart;
