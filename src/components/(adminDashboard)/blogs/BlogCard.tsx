"use client";

import { TBlogs } from "@/types/blogs";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteBlog } from "@/services/blog";

type BlogCardProps = {
  blog: TBlogs;
};

const BlogCard = ({ blog }: BlogCardProps) => {
  const { id, title, blogImage, createdAt } = blog;

  // -------------- Delete Blog -------------- 
  const handleDeleteBlog = async (blogId: string) => {
    const isBlog = {
      data: {
        blogId: blogId,
      },
    };

    try {
      const res = await deleteBlog(isBlog);
      // console.log(res);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    }
  };

  return (
    <div className="relative rounded-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleDeleteBlog(id as string);
        }}
        aria-label="Delete blog"
        className="absolute top-2 right-2 z-10 bg-red-600 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 size={18} color="white" />
      </button>

      {/* Link wraps the card content */}
      <Link href={`/blogs/${id}`} passHref>
        {/* Blog Image */}
        <div className=" rounded-md">
          <Image
            className=" rounded-md"
            src={blogImage || "/default-blog-image.png"}
            alt={title}
            width={500}
            height={500}
          />
        </div>

        {/* Title and Date */}
        <div className="p-4">
          <h2 className="font-semibold text-lg sm:text-xl text-white truncate">
            {title}
          </h2>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            {moment(createdAt).format("lll")}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
