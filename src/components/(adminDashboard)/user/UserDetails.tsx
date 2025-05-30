import { IUser } from "@/types";
import { Modal } from "antd";
import { RiCloseLine } from "react-icons/ri";
import pImage from "@/assets/image/profile-avatart.png";
import Image from "next/image";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  user: IUser | null;
};

const UserDetails = ({ open, setOpen, user }: TPropsType) => {
  if (!user) return null;

  return (
    <Modal
      open={open}
      footer={null}
      centered
      onCancel={() => setOpen(false)}
      closeIcon={false}
      width={400}
      className="text-white"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">User Details</h3>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close modal"
          className="p-2 rounded-full bg-main-color hover:bg-red-600 transition"
        >
          <RiCloseLine size={20} />
        </button>
      </div>

      {/* Profile Photo */}
      <div className="flex justify-center mb-6">
        <Image
          src={user.photo || "/default-profile.png"}
          alt={user.name || "User profile"}
          className="w-24 h-24 rounded-full object-cover border-2 border-main-color"
          width={100}
          height={100}
        />
      </div>

      {/* User Info */}
      <div className="space-y-4">
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span className="font-semibold text-gray-400">Username:</span>
          <span className="font-medium truncate max-w-[60%]">{user.name}</span>
        </div>

        {user.bio && (
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="font-semibold text-gray-400">Bio:</span>
            <span className="font-medium max-w-[60%] whitespace-pre-wrap">
              {user.bio}
            </span>
          </div>
        )}

        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span className="font-semibold text-gray-400">Email:</span>
          <a
            href={`mailto:${user.email}`}
            className="font-medium text-blue-400 hover:underline truncate max-w-[60%]"
          >
            {user.email}
          </a>
        </div>

        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span className="font-semibold text-gray-400">Account Type:</span>
          <span className="font-medium">{user.role}</span>
        </div>

        {/* Links */}
        {user.links && user.links.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-400 mb-2">Links:</h4>
            <ul className="list-disc list-inside space-y-1 max-w-full">
              {user.links.map(({ id, name, link }) => (
                <li key={id}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline break-words"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UserDetails;
