"use client";
import ChangePasswordModal from "@/components/(adminDashboard)/(setting)/changePassword/ChangePasswordModal";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const links = [
  {
    lable: "Personal Information",
    path: "personalInformation",
  },
  {
    lable: "Change Password",
    path: "changePassword",
  },
  {
    lable: "Terms & Condition",
    path: "termsCondition",
  },
  {
    lable: "Privacy Policy",
    path: "privacyPolicy",
  },
  {
    lable: "About Us",
    path: "aboutUs",
  },
];

const SettingContainer = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 gap-5">
      {links?.map((link, inx) => {
        if (link.path === "changePassword") {
          return (
            <div
              key={inx}
              onClick={() => setOpen(!open)}
              className="bg-[#EFE8FD] p-5 rounded flex justify-between items-center cursor-pointer"
            >
              <h4 className="text-black font-medium text-lg">{link?.lable}</h4>
              <IoIosArrowForward size={18} color="black" />
            </div>
          );
        } else {
          return (
            <Link key={link.path} href={`/${link.path}`}>
              <div className="bg-[#EFE8FD] p-5 rounded flex justify-between items-center">
                <h4 className="text-black font-medium text-lg">
                  {link?.lable}
                </h4>
                <IoIosArrowForward size={18} color="black" />
              </div>
            </Link>
          );
        }
      })}
      <ChangePasswordModal open={open} setOpen={setOpen}></ChangePasswordModal>
    </div>
  );
};

export default SettingContainer;
