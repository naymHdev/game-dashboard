import { IUser } from "@/types";
import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  user: IUser | null;
};

const UserDetails = ({ open, setOpen, user }: TPropsType) => {
  // console.log(user);
  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        minWidth: "max-content",
        position: "relative",
        backgroundColor: "#000",
      }}
    >
      <div className="pb-20 ">
        <div className="flex justify-between items-center">
          <h4 className="text-center text-xl font-medium">User Details</h4>
          <div
            className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#fff" className="" />
          </div>
        </div>
        <div className="mt-10 space-y-4">
          <div className="flex justify-between">
            <h4>User name :</h4>
            <p className="font-medium">{user?.name}</p>
          </div>
          {user?.bio && (
            <div className="flex justify-between">
              <h4>Bio :</h4>
              <p className="font-medium">{user?.bio}</p>
            </div>
          )}
          <hr />
          <div className="flex justify-between">
            <h4>Email :</h4>
            <p className="font-medium">{user?.email}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h4>Account Types :</h4>
            <p className="font-medium">{user?.role}</p>
          </div>
          <hr />
        </div>
      </div>
    </Modal>
  );
};

export default UserDetails;
