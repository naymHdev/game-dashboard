"use server";

import { cookies } from "next/headers";

const token = cookies().get("accessToken")?.value;

export const dashBoardStatics = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`,
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
