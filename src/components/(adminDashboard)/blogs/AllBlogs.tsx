"use client";

import { TBlogs } from "@/types/blogs";
import BlogCard from "./BlogCard";

const AllBlogs = ({ blogs }: { blogs: { data: { allBlogs: TBlogs[] } } }) => {
  //   console.log(blogs);

  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs?.data?.allBlogs.map((blog: TBlogs, idx) => (
          <BlogCard key={`${idx + 1}`} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default AllBlogs;
