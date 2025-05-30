"use server";

import { cookies } from "next/headers";
type ApproveResponse = {
  data: {
    updateId: string;
  };
};

export const getGameEditRequest = async () => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/admin/pending-game-updates`,
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

export const deleteGame = async (gameId: string) => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/admin/delete-game`,
      {
        method: "DELETE",
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
    console.error("deleteGame Error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error?.message || error,
    };
  }
};

export const approveGameEditRequest = async (gameId: ApproveResponse) => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/admin/approve-game-update`,
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

export const rejectGameEditRequest = async (updateId: string) => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/admin/reject-game-update`,
      {
        method: "DELETE",
        body: JSON.stringify(updateId),
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
    console.error("rejectGameEditRequest Error:", error);
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
      `${process.env.BASE_URL}/admin/getAllGame?page=${page}`,
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
