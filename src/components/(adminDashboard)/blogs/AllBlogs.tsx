"use client";

import { TBlogs } from "@/types/blogs";
import BlogCard from "./BlogCard";
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

const AllBlogs = ({
  blogs,
  searchParams,
}: {
  blogs: { data: { allBlogs: TBlogs[] } };
  searchParams: string;
}) => {
  // console.log(blogs);

  const router = useRouter();
  const searchParamsClient = useSearchParams();

  // -------------- Pagination --------------
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParamsClient.toString());
    params.set("page", page?.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {blogs?.data?.allBlogs.map((blog: TBlogs, idx) => (
          <BlogCard key={`${idx + 1}`} blog={blog} />
        ))}
      </div>
      <div className=" flex items-center justify-end my-8">
        <Pagination
          current={searchParams ? Number(searchParams) : 1}
          onChange={handlePageChange}
          align="end"
          total={blogs?.data?.meta.total}
        />
      </div>
    </>
  );
};

export default AllBlogs;
