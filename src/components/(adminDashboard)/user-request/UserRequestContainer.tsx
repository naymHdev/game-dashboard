"use client";

import UserRequestCard from "./UserRequestCard";
import { IUser } from "@/types";

const UserRequestContainer = ({ userData }: { userData: any }) => {
  // console.log("userData", userData);

  return (
    <div className="min-h-[80vh] bg-section-bg px-4 py-2 rounded-md text-text-color">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold w-full text-primary-white">
          User Requests ({userData?.data?.length})
        </h1>
      </div>
      {/* show request users data */}
      <div className="mt-10 grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-4">
        {userData?.data?.map((user: IUser, inx) => (
          <UserRequestCard key={inx + 1} data={user} />
        ))}
      </div>
    </div>
  );
};

export default UserRequestContainer;
