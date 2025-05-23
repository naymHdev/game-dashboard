"use client";

import { ConfigProvider } from "antd";

const Statistic = ({ StatisticData }: { StatisticData: any }) => {
  // console.log("StatisticData", StatisticData);
  const { totalUsers, totalUpcomingGames, totalGames } = StatisticData || {};
  return (
    <div className="flex justify-between items-center xl:gap-3 gap-2 flex-wrap text-text-color ">
      {/* ====================================== Total User ========================================== */}
      <div className="flex flex-col gap-y-3 justify-center p-4 h-[165px] flex-1 bg-section-bg rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className=" xl:text-2xl text-xl truncate">Total Users</h3>
          <h1 className="">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorBgContainer: "var(--color-main)",
                    colorText: "rgba(255,255,255,0.88)",
                    colorBgElevated: "var(--color-main)",
                    colorIcon: "#fff",
                  },
                },
              }}
            ></ConfigProvider>
          </h1>
        </div>
        <p className="xl:text-3xl text-2xl font-medium ">{totalUsers}</p>
      </div>

      {/* ====================================== Total Vendor ========================================== */}
      <div className="flex flex-col gap-y-3 justify-center p-4 h-[165px] flex-1 bg-section-bg rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className=" xl:text-2xl text-xl truncate">Upcoming Release</h3>
          <h1 className="">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorBgContainer: "var(--color-main)",
                    colorText: "rgba(255,255,255,0.88)",
                    colorBgElevated: "var(--color-main)",
                    colorIcon: "#fff",
                  },
                },
              }}
            ></ConfigProvider>
          </h1>
        </div>
        <p className="xl:text-3xl text-2xl font-medium ">
          {totalUpcomingGames}
        </p>
      </div>

      {/* ====================================== Total Vendor ========================================== */}
      <div className="flex flex-col gap-y-3 justify-center p-4 h-[165px] flex-1 bg-section-bg rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className=" xl:text-2xl text-xl truncate">Total Game Listed</h3>
          <h1 className="">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorBgContainer: "var(--color-main)",
                    colorText: "rgba(255,255,255,0.88)",
                    colorBgElevated: "var(--color-main)",
                    colorIcon: "#fff",
                  },
                },
              }}
            ></ConfigProvider>
          </h1>
        </div>
        <p className="xl:text-3xl text-2xl font-medium ">{totalGames}</p>
      </div>
    </div>
  );
};

export default Statistic;
