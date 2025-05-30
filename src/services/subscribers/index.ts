"use server";

import { cookies } from "next/headers";

export const getSubscribers = async () => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/newsletter/findNewsletterMail`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("getSubscribers Error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error?.message || error,
    };
  }
};

export const deleteSubscriber = async (data: any) => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/newsletter/delete-newsletter`,
      {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    const response = await res.json();
    return response;
  } catch (error: any) {
    console.error("deleteSubscriber Error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error?.message || error,
    };
  }
};
