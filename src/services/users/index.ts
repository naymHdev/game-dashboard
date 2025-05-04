"use server";

import { cookies } from "next/headers";

export const getAllUserRequests = async () => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `https://gaming-showcase-backend.onrender.com/api/v1/admin/pending-profile-updates`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Get All User Requests Error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error?.message || error,
    };
  }
};

export const updateUserRequest = async (data: any) => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `https://gaming-showcase-backend.onrender.com/api/v1/admin/approve-profile-update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Update User Request Error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error?.message || error,
    };
  }
};

export const deleteUser = async (data: any) => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `https://gaming-showcase-backend.onrender.com/api/v1/admin/delete-user`,
      {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        cache: "no-store",
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Delete User Error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error?.message || error,
    };
  }
};
