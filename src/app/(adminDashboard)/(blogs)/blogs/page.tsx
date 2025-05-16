import AllBlogs from "@/components/(adminDashboard)/blogs/AllBlogs";
import { getAllBlogs } from "@/services/blog";
import { Button } from "antd";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

const BlogsPage = async ({ searchParams }) => {
  const page = searchParams.page || 1;
  const blogs = await getAllBlogs(page);
  //   console.log(blogs);

  return (
    <>
      <div className="bg-section-bg p-4 rounded-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-text-color">All Blogs</h1>
          </div>
          <div>
            <Link href={"/create-blog"}>
              <Button className="">
                Create Blog <FaPlus />
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-10">
          <AllBlogs blogs={blogs} />
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
