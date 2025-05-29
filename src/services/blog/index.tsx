"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllBlogs = async (page: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/getAllBlog?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 30,
          tags: ["Blogs"],
        },
        cache: "force-cache",
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("getAllBlogs Error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error?.message || error,
    };
  }
};

export const createBlog = async (blogData: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/create-blog`,
      {
        method: "POST",
        body: blogData,
      }
    );
    revalidateTag("BLOG");
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("createBlog Error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error?.message || error,
    };
  }
};

export const deleteBlog = async (blogId: string) => {
  const token = cookies().get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/delete-blog`,
      {
        method: "DELETE",
        body: JSON.stringify(blogId),
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
    console.error("deleteBlog Error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error?.message || error,
    };
  }
};
