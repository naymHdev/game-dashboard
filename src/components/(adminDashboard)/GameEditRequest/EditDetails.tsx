"use client";

import { TGameSubmission } from "@/types/games";
import { Modal, Tag, Button, message, Divider } from "antd"; // Added Divider for visual separation
import { RiCloseLargeLine } from "react-icons/ri";
import Image from "next/image";
import React from "react";
import { approveGameEditRequest } from "@/services/games";
import { toast } from "sonner";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  details: TGameSubmission | null;
};

type ApproveResponse = {
  data: {
    updateId: string;
  };
};

const EditDetails = ({ open, setOpen, details }: TPropsType) => {
  if (!details) return null;

  // console.log("details", details);

  const handleAccept = async (gameId: ApproveResponse) => {
    // setOpen(false);
    console.log("Accepting game edit request for ID:", {
      data: { updateId: gameId },
    });

    try {
      const res = await approveGameEditRequest({ data: { updateId: gameId } });
      // console.log("Response from API:", res);
      if (res.success) {
        toast.success("Edit request accepted successfully.");
        setOpen(false);
      } else {
        toast.error("Failed to accept edit request.");
      }
    } catch (error) {
      console.error("Error accepting game edit request:", error);
      message.error("Failed to accept edit request.");
    }
  };

  const handleReject = () => {
    // TODO: API call to reject edit request
    message.error("Edit request rejected.");
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      footer={null}
      centered
      onCancel={() => setOpen(false)}
      closeIcon={false}
      width={750}
      className="game-details-modal"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-2xl font-bold text-white">
          Game Submission Details
        </h4>{" "}
        {/* More prominent title */}
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
          <RiCloseLargeLine size={20} color="#fff" />{" "}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6 text-white text-base">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <Image
            src={details.thumbnail || "/user-profile.png"}
            alt={`${details.title} Thumbnail`}
            width={180}
            height={100}
            className="rounded-lg object-cover shadow-lg"
          />
          <div className="flex-1">
            <h3 className="text-3xl font-extrabold text-primary-light">
              {details.title}
            </h3>
            <p className="text-gray-300 mt-2 text-lg leading-relaxed">
              {details.description}
            </p>
          </div>
        </div>
        <Divider className="my-6 border-gray-700" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <p className="text-gray-400">Submitted By:</p>
            <p className="text-lg font-semibold">
              {typeof details.userId === "object" && details.userId !== null
                ? details.userId.name || "N/A"
                : "N/A"}
              {typeof details.userId === "object" &&
                details.userId !== null &&
                details.userId.email && (
                  <span className="block text-sm text-gray-500">
                    {details.userId.email}
                  </span>
                )}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Current Status:</p>
            <Tag
              color={
                details.status === "pending"
                  ? "orange"
                  : details.status === "approved"
                  ? "green"
                  : "red"
              }
              className="uppercase text-base px-3 py-1 rounded-full"
            >
              {details.status}
            </Tag>
          </div>
          <div>
            <p className="text-gray-400">Game Status:</p>
            <Tag
              color={
                details.gameStatus === "upcoming"
                  ? "geekblue"
                  : details.gameStatus === "released"
                  ? "lime"
                  : "cyan"
              }
              className="uppercase text-base px-3 py-1 rounded-full"
            >
              {details.gameStatus}
            </Tag>
          </div>
          <div>
            <p className="text-gray-400">Price:</p>
            <p className="text-lg font-semibold text-green-400">
              ${details.price.toFixed(2)}
            </p>
          </div>
          {details.gameStatus === "upcoming" && details.upcomingDate && (
            <div>
              <p className="text-gray-400">Expected Release:</p>
              <p className="text-lg font-semibold">
                {new Date(details.upcomingDate).toLocaleDateString("en-US", {
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
              {details.platform.length > 0 ? (
                details.platform.map((p) => (
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
              {details.categories.length > 0 ? (
                details.categories.map((c) => (
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
              {new Date(details.submittedAt).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Last Updated:</p>
            <p className="text-base font-semibold">
              {new Date(details.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
        {/* Social Links */}
        {details.socialLinks && details.socialLinks.length > 0 && (
          <>
            <Divider className="my-6 border-gray-700" />
            <div>
              <p className="text-gray-400">Social Links:</p>
              <ul className="list-disc list-inside ml-2 mt-3 text-secondary">
                {details.socialLinks.map((link, i) => (
                  <li key={i} className="truncate max-w-full mb-1">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {/* Game Images (Gallery) */}
        {details.image && details.image.length > 0 && (
          <>
            <Divider className="my-6 border-gray-700" />
            <div>
              <p className="text-gray-400 mb-4">Game Screenshots:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {details.image.map((imgSrc, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md"
                  >
                    <Image
                      src={imgSrc}
                      alt={`Screenshot ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="mt-10 flex justify-end gap-4">
        <Button
          danger
          onClick={handleReject}
          className="px-6 py-2 h-auto text-base rounded-md"
        >
          Reject
        </Button>
        <Button
          type="primary"
          onClick={() => handleAccept(details.id)}
          className="px-6 py-2 h-auto text-base rounded-md bg-green-500 hover:bg-green-600"
        >
          Accept
        </Button>
      </div>
    </Modal>
  );
};

export default EditDetails;
