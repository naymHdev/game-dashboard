"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const signIn = async (userData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    revalidateTag("ADMIN");
    const result = await res.json();
    console.log("sign-up", res);
    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result.data.refreshToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
