"use server";
import { FieldType } from "@/types";
import { cookies } from "next/headers";

export const adminSignIn = async (userData: FieldType) => {
  try {
    const res = await fetch(
      `https://gaming-showcase-backend.onrender.com/api/v1/admin/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();
    if (result.success) {
      cookies().set("accessToken", result.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
