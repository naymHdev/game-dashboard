import { getSingleBlog } from "@/services/blog";
import Image from "next/image";
import parse from "html-react-parser";
import moment from "moment";

type Props = {
  params: { id: string };
};

const BlogDetailsPage = async ({ params }: Props) => {
  const { id } = params;

  const singleBlogs = await getSingleBlog(id);
  const blogDetails = singleBlogs.data;

  if (!blogDetails) {
    return (
      <div className="p-8 text-center text-white text-xl">
        Blog details not found.
      </div>
    );
  }

  const {
    author,
    title,
    description,
    blogImage,
    altTag,
    rewards,
    createdAt,
    updatedAt,
  } = blogDetails;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      {/* Blog Image */}
      {blogImage && (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6 shadow-lg">
          <Image
            src={blogImage}
            alt={altTag || title || "Blog image"}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}

      {/* Title and Author */}
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-gray-400 mb-4">
        By <span className="font-semibold">{author}</span> •{" "}
        {moment(createdAt).format("MMMM Do, YYYY")}
      </p>

      {/* Description (HTML parsed) */}
      <article className="prose prose-invert max-w-none mb-10">
        {description ? parse(description) : <p>No description available.</p>}
      </article>

      {/* Rewards Section */}
      {rewards && rewards.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Rewards</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 rounded-md overflow-hidden">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left">Code</th>
                  <th className="px-4 py-3 text-left">Reward</th>
                  <th className="px-4 py-3 text-left">Validity</th>
                </tr>
              </thead>
              <tbody className="bg-[#111] text-white divide-y divide-gray-700">
                {rewards.map(({ code, reward, validity, id: rewardId }) => (
                  <tr key={rewardId || code}>
                    <td className="px-4 py-3 whitespace-nowrap">{code}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{reward}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {validity === "yes" ? (
                        <span className="text-green-400 font-semibold">
                          Valid
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Invalid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Metadata */}
      <footer className="text-gray-500 text-sm italic">
        Last updated: {moment(updatedAt).format("MMMM Do, YYYY, h:mm a")}
      </footer>
    </div>
  );
};

export default BlogDetailsPage;
