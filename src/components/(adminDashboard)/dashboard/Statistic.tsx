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

const Statistic = () => {
  const [selectedMonth, setSelectedMonth] = useState("Apr");

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };
  return (
    <div className="flex justify-between items-center xl:gap-3 gap-2 flex-wrap text-text-color ">
      {/* ====================================== Total User ========================================== */}
      <div className="flex flex-col gap-y-3 justify-center p-4 h-[165px] flex-1 bg-section-bg rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className=" xl:text-2xl text-xl truncate">Total User</h3>
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
        <div className="flex items-center gap-x-2">
          <div className="bg-white flex items-center gap-x-2 !rounded-full px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
            >
              <path
                fill="#000"
                d="M20 8v2h6.586L18 18.586l-4.293-4.293a1 1 0 0 0-1.414 0L2 24.586L3.414 26L13 16.414l4.293 4.293a1 1 0 0 0 1.414 0L28 11.414V18h2V8Z"
              />
            </svg>
            <p className="text-primary-green font-medium text-lg">4%</p>
          </div>
          <p className="text-gray-300">From the last month</p>
        </div>
      </div>

      {/* ====================================== Total Vendor ========================================== */}
      <div className="flex flex-col gap-y-3 justify-center p-4 h-[165px] flex-1 bg-section-bg rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className=" xl:text-2xl text-xl truncate">Total Vendor</h3>
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
        <div className="flex items-center gap-x-2">
          <div className="bg-white flex items-center gap-x-2 !rounded-full px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
            >
              <path
                fill="#000"
                d="M20 8v2h6.586L18 18.586l-4.293-4.293a1 1 0 0 0-1.414 0L2 24.586L3.414 26L13 16.414l4.293 4.293a1 1 0 0 0 1.414 0L28 11.414V18h2V8Z"
              />
            </svg>
            <p className="text-primary-green font-medium text-lg">4%</p>
          </div>
          <p className="text-gray-300">From the last month</p>
        </div>
      </div>

      {/* ====================================== Total Vendor ========================================== */}
      <div className="flex flex-col gap-y-3 justify-center p-4 h-[165px] flex-1 bg-section-bg rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className=" xl:text-2xl text-xl truncate">
            Total Product Listed
          </h3>
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
        <div className="flex items-center gap-x-2">
          <div className="bg-white flex items-center gap-x-2 !rounded-full px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
            >
              <path
                fill="#000"
                d="M20 8v2h6.586L18 18.586l-4.293-4.293a1 1 0 0 0-1.414 0L2 24.586L3.414 26L13 16.414l4.293 4.293a1 1 0 0 0 1.414 0L28 11.414V18h2V8Z"
              />
            </svg>
            <p className="text-primary-green font-medium text-lg">4%</p>
          </div>
          <p className="text-gray-300">From the last month</p>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
