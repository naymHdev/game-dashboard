"use client";
import { Divider, Pagination } from "antd";
import { useState } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";

const notificationData = [
  {
    message: "You have received $500",
    name: "John Doe",
    time: "Fri, 12:30pm",
  },
  {
    message: "You have received $500",
    name: "Opu",
    time: "Fri, 12:30pm",
  },
  {
    message: "You have received $500",
    name: "Uzzal",
    time: "Fri, 12:30pm",
  },
  {
    message: "You have received $500",
    name: "Sampod",
    time: "Fri, 12:30pm",
  },
];

const NotificationContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Calculate start and end index for slicing the doctors data based on the current page and page size
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the data for the current page
  const currentNotifications = notificationData.slice(startIndex, endIndex);
  return (
    <div>
      <div className="min-h-[80vh] bg-section-bg p-7">
        <h1 className="text-2xl text-main-color font-medium">Notification</h1>
        <Divider></Divider>
        <div className="mt-5 grid grid-cols-1 gap-8">
          {currentNotifications.map((notification, inx) => (
            <div key={inx} className="flex gap-4 items-center">
              <div className="bg-[#FFFFFF] p-2 rounded">
                <MdOutlineNotificationsNone
                  size={28}
                  color="var(--color-main)"
                />
              </div>
              <div className=" text-text-color">
                <h4 className="text-lg font-medium ">
                  {notification.message} from {notification?.name}
                </h4>
                <p>{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* pagination */}
      <div className="w-max mt-3 ml-auto">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={notificationData.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false} // Disable page size changer if unnecessary
        />
      </div>
    </div>
  );
};

export default NotificationContainer;
