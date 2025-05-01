"use client";

import { ConfigProvider, Select } from "antd";
import { useState } from "react";

const monthsData = [
  { value: "jan", label: "Jan" },
  { value: "feb", label: "Feb" },
  { value: "mar", label: "Mar" },
  { value: "apr", label: "Apr" },
  { value: "may", label: "May" },
  { value: "jun", label: "Jun" },
  { value: "jul", label: "Jul" },
  { value: "aug", label: "Aug" },
  { value: "sep", label: "Sep" },
  { value: "oct", label: "Oct" },
  { value: "nov", label: "Nov" },
  { value: "dec", label: "Dec" },
];

const Statistic =  () => {
  const [selectedMonth, setSelectedMonth] = useState("Apr");



  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };
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
            >
              <Select
                value={selectedMonth}
                style={{
                  width: 80,
                  border: "none",
                }}
                onChange={handleMonthChange}
                options={monthsData}
                className="!border-none month-select rounded-full"
              />
            </ConfigProvider>
          </h1>
        </div>
        <p className="xl:text-3xl text-2xl font-medium ">2,500</p>
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
            >
              <Select
                value={selectedMonth}
                style={{
                  width: 80,
                  border: "none",
                }}
                onChange={handleMonthChange}
                options={monthsData}
                className="!border-none month-select rounded-full"
              />
            </ConfigProvider>
          </h1>
        </div>
        <p className="xl:text-3xl text-2xl font-medium ">500</p>
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
            >
              <Select
                value={selectedMonth}
                style={{
                  width: 80,
                  border: "none",
                }}
                onChange={handleMonthChange}
                options={monthsData}
                className="!border-none month-select rounded-full"
              />
            </ConfigProvider>
          </h1>
        </div>
        <p className="xl:text-3xl text-2xl font-medium ">45000</p>
      </div>
    </div>
  );
};

export default Statistic;
