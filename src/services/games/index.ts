"use server";

import { cookies } from "next/headers";

export const getAllGames = async () => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `https://gaming-showcase-backend.onrender.com/api/v1/admin/getAllGame`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        next: {
          tags: ["GAMES"],
        },
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("getAllGames Error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error?.message || error,
    };
  }
};
