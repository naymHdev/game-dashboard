"use server";
import { FieldType } from "@/types";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

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
    // console.log(result);
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

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const logout = async () => {
  return (await cookies()).delete("accessToken");
};

export const allUser = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/find_all_users`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value || "",
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
