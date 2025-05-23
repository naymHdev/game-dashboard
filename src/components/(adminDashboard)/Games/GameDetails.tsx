import { Divider, Modal, Tag } from "antd";
import Image from "next/image";
import { RiCloseLargeLine } from "react-icons/ri";

type SocialLink = {
  name: string;
  link: string;
  id?: string;
  _id?: string;
};

type UserType = {
  name?: string;
  email?: string;
};

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  details: {
    title?: string;
    description?: string;
    platform?: string[];
    categories?: string[];
    price?: number;
    socialLinks?: SocialLink[];
    userId?: UserType | null;
    upcomingDate?: string;
    image?: string[];
    gameStatus?: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

const GameDetails = ({ open, setOpen, details }: TPropsType) => {
  const {
    title,
    description,
    platform,
    categories,
    price,
    socialLinks,
    userId,
    upcomingDate,
    image,
    gameStatus,
    createdAt,
    updatedAt,
  } = details || {};

  // Example of how you might determine "status" - fallback to "pending"
  // You can adjust based on your real data
  const status = details?.isApproved
    ? "approved"
    : details?.isDelete
    ? "deleted"
    : "pending";

  return (
    <Modal
      open={open}
      footer={null}
      centered
      onCancel={() => setOpen(false)}
      closeIcon={false}
      width={750}
      className="game-details-modal bg-gray-900"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-2xl font-bold text-white">
          Game Submission Details
        </h4>
        <div
          className="w-10 h-10 bg-main-color rounded-full flex justify-center items-center cursor-pointer transition-colors duration-200 hover:bg-red-600"
          onClick={() => setOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && setOpen(false)
          }
          aria-label="Close modal"
        >
          <RiCloseLargeLine size={20} color="#fff" />
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6 text-white text-base">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          {/* {details.thumbnail ? (
            <Image
              src={details.thumbnail}
              alt={`${title || "Game"} Thumbnail`}
              width={180}
              height={100}
              className="rounded-lg object-cover"
            />
          ) : null} */}

          <div className="flex-1">
            <h3 className="text-3xl font-extrabold text-primary-light">
              {title || "N/A"}
            </h3>
            <p className="text-gray-300 mt-2 text-lg leading-relaxed">
              {description || "No description provided."}
            </p>
          </div>
        </div>

        <Divider className="my-6 border-gray-700" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <p className="text-gray-400">Submitted By:</p>
            <p className="text-lg font-semibold">
              {userId && typeof userId === "object"
                ? userId.name || "N/A"
                : "N/A"}
              {userId && typeof userId === "object" && userId.email && (
                <span className="block text-sm text-gray-500">
                  {userId.email}
                </span>
              )}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Current Status:</p>
            <Tag
              color={
                status === "pending"
                  ? "orange"
                  : status === "approved"
                  ? "green"
                  : "red"
              }
              className="uppercase text-base px-3 py-1 rounded-full"
            >
              {status}
            </Tag>
          </div>

          <div>
            <p className="text-gray-400">Game Status:</p>
            <Tag
              color={
                gameStatus === "upcoming"
                  ? "geekblue"
                  : gameStatus === "released"
                  ? "lime"
                  : "cyan"
              }
              className="uppercase text-base px-3 py-1 rounded-full"
            >
              {gameStatus || "N/A"}
            </Tag>
          </div>

          <div>
            <p className="text-gray-400">Price:</p>
            <p className="text-lg font-semibold text-green-400">
              {price !== undefined ? `$${price}` : "N/A"}
            </p>
          </div>

          {gameStatus === "upcoming" && upcomingDate && (
            <div>
              <p className="text-gray-400">Expected Release:</p>
              <p className="text-lg font-semibold">
                {new Date(upcomingDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
        </div>

        <Divider className="my-6 border-gray-700" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <p className="text-gray-400">Platforms:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {platform && platform.length > 0 ? (
                platform.map((p) => (
                  <Tag
                    key={p}
                    color="blue"
                    className="uppercase text-sm px-2 py-0.5"
                  >
                    {p}
                  </Tag>
                ))
              ) : (
                <span className="text-gray-500">No platforms specified</span>
              )}
            </div>
          </div>

          <div>
            <p className="text-gray-400">Categories:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories && categories.length > 0 ? (
                categories.map((c) => (
                  <Tag
                    key={c}
                    color="purple"
                    className="uppercase text-sm px-2 py-0.5"
                  >
                    {c}
                  </Tag>
                ))
              ) : (
                <span className="text-gray-500">No categories specified</span>
              )}
            </div>
          </div>
        </div>

        <Divider className="my-6 border-gray-700" />

        {/* Submission Timestamps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">Submitted At:</p>
            <p className="text-base font-semibold">
              {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Last Updated:</p>
            <p className="text-base font-semibold">
              {updatedAt ? new Date(updatedAt).toLocaleString() : "N/A"}
            </p>
          </div>
        </div>

        {/* Social Links */}
        {socialLinks && socialLinks.length > 0 && (
          <>
            <Divider className="my-6 border-gray-700" />
            <div>
              <p className="text-gray-400">Social Links:</p>
              <ul className="list-disc list-inside ml-2 mt-3 text-secondary">
                {socialLinks.map((link) => (
                  <li
                    key={link._id || link.id || link.link}
                    className="truncate max-w-full mb-1"
                  >
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-400"
                    >
                      {link.name}: {link.link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Game Images (Gallery) */}
        {image && image.length > 0 && (
          <>
            <Divider className="my-6 border-gray-700" />
            <div>
              <p className="text-gray-400 mb-4">Game Screenshots:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {image.map((imgSrc, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md"
                  >
                    <Image
                      src={imgSrc}
                      alt={`Screenshot ${index + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      priority={index === 0} // prioritize loading first image
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default GameDetails;
