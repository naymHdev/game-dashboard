"use client";

import { Modal } from "antd";
import Image from "next/image";
import { ExternalLink, Calendar, User, LinkIcon } from "lucide-react";
import userProfile from "@/assets/image/profile-avatart.png";

interface ILink {
  id: string;
  name: string;
  link: string;
  _id: string;
}

interface IUser {
  userId: string;
  name: string;
  userName: string;
  bio: string;
  links: ILink[];
  photo: string;
  status: string;
  submittedAt: string;
  updatedAt: string;
  createdAt: string;
  id: string;
}

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  user: IUser | null;
};

const UserModal = ({ open, setOpen, user }: TPropsType) => {

  // console.log("user", user);

  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-100 border-gray-200";
    }
  };

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Modal
      centered
      footer={null}
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      className="user-profile-modal"
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg py-8 mt-4">
        <div className="flex justify-center items-center">
          <div className="relative w-32 h-32">
            <Image
              className="rounded-full border-none shadow-lg object-cover"
              src={user.photo || userProfile}
              alt={`${user.name} profile image`}
              fill
              sizes="128px"
            />
          </div>
        </div>

        <div className="text-center mt-4 px-6">
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="text-gray-300 text-lg mt-1">{user.userName}</p>

          <div className="flex justify-center mt-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                user.status
              )}`}
            >
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Bio Section */}
        {user.bio && (
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-2 flex items-center gap-2">
              <User className="w-5 h-5" />
              Bio
            </h3>
            <p className="text-gray-100 leading-relaxed bg-[#1B1B20] p-4 rounded-lg">
              {user.bio}
            </p>
          </div>
        )}

        {/* Links Section */}
        {user.links && user.links.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              Links
            </h3>
            <div className="space-y-2">
              {user.links.map((link) => (
                <div
                  key={link.id}
                  onClick={() => handleLinkClick(link.link)}
                  className="flex items-center justify-between p-3 bg-[#1B1B20] hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <LinkIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-100">{link.name}</p>
                      <p className="text-sm text-[#1B1B20]0 truncate max-w-xs">
                        {link.link}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-100" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timestamps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1B1B20] p-4 rounded-lg">
            <h4 className="font-semibold text-gray-100 mb-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Submitted
            </h4>
            <p className="text-gray-100 text-sm">
              {formatDate(user.submittedAt)}
            </p>
          </div>

          <div className="bg-[#1B1B20] p-4 rounded-lg">
            <h4 className="font-semibold text-gray-100 mb-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Last Updated
            </h4>
            <p className="text-gray-100 text-sm">
              {formatDate(user.updatedAt)}
            </p>
          </div>
        </div>

        {/* User ID Section */}
        <div className="bg-[#1B1B20] p-4 rounded-lg">
          <h4 className="font-semibold text-gray-100 mb-1">User ID</h4>
          <p className="text-gray-100 text-sm font-mono">{user.userId}</p>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
