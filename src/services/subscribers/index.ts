"use server";

import { cookies } from "next/headers";

export const getSubscribers = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/newsletter/findNewsletterMail`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["Subscribers"],
        },
        cache: "no-store",
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
      `${process.env.NEXT_PUBLIC_API_URL}/newsletter/delete-newsletter`,
      {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        next: {
          tags: ["Subscribers"],
        },
        cache: "no-store",
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
