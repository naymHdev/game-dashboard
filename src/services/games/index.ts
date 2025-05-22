"use server";

import { cookies } from "next/headers";

export const getGameEditRequest = async () => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/pending-game-updates`,
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
    console.error("getGameEditRequest Error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error?.message || error,
    };
  }
};

type ApproveResponse = {
  data: {
    updateId: string;
  };
};
export const approveGameEditRequest = async (gameId: ApproveResponse) => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/approve-game-update`,
      {
        method: "POST",
        body: JSON.stringify(gameId),
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
    console.error("approveGameEditRequest Error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error?.message || error,
    };
  }
};

export const getAllGames = async (page: number) => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllGame?page=${page}`,
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
