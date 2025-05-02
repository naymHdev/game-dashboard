"use server";

import { FieldType } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const signIn = async (userData: FieldType) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    revalidateTag("ADMIN");
    const result = await res.json();
    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result.data.refreshToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
