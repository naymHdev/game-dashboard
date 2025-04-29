import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { CgGames } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import Link from "next/link";
import { PiListPlusFill } from "react-icons/pi";
import { FilePenLine } from "lucide-react";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/dashboard"}>Dashboard</Link>,
  },
  {
    key: "games",
    icon: <CgGames size={18} />,
    label: <Link href={"/games"}>Games</Link>,
  },
  {
    key: "game-edit-request",
    icon: <FilePenLine size={20} />,
    label: <Link href={"/game-edit-request"}>Game Edit Requests</Link>,
  },
  {
    key: "users",
    icon: <GoPeople size={18} />,
    label: <Link href={"/user"}>Accounts</Link>,
  },
  {
    key: "user-request",
    icon: <PiListPlusFill size={20} />,
    label: <Link href={"/user-request"}>User Request</Link>,
  },

  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/settings"}>Settings</Link>,
  },
  // {
  //   key: "logout",
  //   icon: <RiLogoutCircleLine size={18} />,
  //   label: <Link href={"/login"}>Logout</Link>,
  // },
];
