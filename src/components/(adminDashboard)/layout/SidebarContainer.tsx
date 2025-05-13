"use client";
import { Button, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { navLinks } from "@/utils/navLinks";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoLogInOutline } from "react-icons/io5";
import { useUser } from "@/contexts/UserContext";
import { logout } from "@/services/auth";

const SidebarContainer = ({ collapsed }: { collapsed: boolean }) => {
  const [current, setCurrent] = useState("dashboard");
  const currentPath = usePathname();

  const { user } = useUser();
  // console.log("user", user);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "logout") {
      localStorage.removeItem("activeNav");
      return;
    }
    localStorage.setItem("activeNav", e.key);
  };

  useEffect(() => {
    const activeKey = localStorage.getItem("activeNav");
    if (!activeKey) return;
    if (activeKey && currentPath !== "/dashboard") {
      setCurrent(activeKey as string);
    } else {
      setCurrent("dashboard");
    }
  }, []);

  const handleLogOut = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <Sider
      width={280}
      theme="light"
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        paddingInline: `${collapsed ? "5px" : "10px"}`,
        backgroundColor: "var(--color-secondary)",
        maxHeight: "100vh",
        overflow: "auto",
      }}
    >
      <div className="demo-logo-vertical" />
      {/* logo  */}
      <div className="mt-10 flex flex-col justify-center items-center gap-y-5">
        <Link href={"/"}>
          <h2 className=" text-5xl font-extrabold text-white">Logo</h2>
        </Link>
        <h1
          className={`${
            collapsed ? "text-sm" : "text-xl"
          }   font-extrabold text-white`}
        ></h1>
      </div>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[current]}
        mode="inline"
        className="sidebar-menu text-lg bg-main-color"
        items={navLinks}
      />
      <div className="absolute  w-[90%]  bottom-5 flex justify-center items-center px-2">
        {!collapsed ? (
          <>
            {user?.role === "ADMIN" ? (
              <Button
                onClick={handleLogOut}
                icon={<IoLogInOutline size={22} />}
                className=" w-full !bg-black !border-main-color flex items-center justify-center font-600 text-18  border border-white text-white !py-5"
              >
                Log Out
              </Button>
            ) : (
              <Link href={"/login"} className="w-full">
                <Button
                  icon={<IoLogInOutline size={22} />}
                  className=" w-full !bg-black !border-main-color flex items-center justify-center font-600 text-18  border border-white text-white !py-5"
                >
                  Log In
                </Button>
              </Link>
            )}
          </>
        ) : (
          <>
            {user?.role === "ADMIN" ? (
              <>
                <div
                  onClick={handleLogOut}
                  className=" px-3 py-2 bg-main-color rounded"
                >
                  <IoLogInOutline color="#fff" size={24} />
                </div>
              </>
            ) : (
              <>
                <Link href={"/login"}>
                  <div className=" px-3 py-2 bg-main-color rounded">
                    <IoLogInOutline color="#fff" size={24} />
                  </div>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </Sider>
  );
};

export default SidebarContainer;
