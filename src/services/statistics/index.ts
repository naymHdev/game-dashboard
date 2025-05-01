"use server";

import { cookies } from "next/headers";

export const getDashboardStatistics = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/dashboard`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value || "",
          "Content-Type": "application/json",
        },
        next: {
          tags: ["STATISTICS"],
        },
        cache: "no-store",
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
