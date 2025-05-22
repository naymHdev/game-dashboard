"use server";

import { cookies } from "next/headers";

export const dashBoardStatics = async () => {
  try {
    const token = cookies().get("accessToken")?.value;
    const res = await fetch(
      `https://gaming-showcase-backend.onrender.com/api/v1/admin/dashboard`,
      {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        next: {
          tags: ["GAME"],
        },
        cache: "no-store",
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
