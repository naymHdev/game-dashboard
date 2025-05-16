import { TBlogs } from "@/types/blogs";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: TBlogs }) => {
  const { _id, title, blogImage, createdAt } = blog;
  //   console.log(blog);
  return (
    <>
      <Link href={`/blog/${_id}`}>
        <div>
          <div className=" rounded-md">
            <Image
              className=" rounded-md"
              src={blogImage}
              alt={title}
              width={500}
              height={500}
            />
          </div>
          <div className=" mt-10">
            <h2 className=" font-semibold text-xl text-white">{title}</h2>
            <p className="text-lg text-gray-400 mt-4">
              {moment(createdAt).format("lll")}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
