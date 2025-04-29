"use client";

import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const EditDetails = ({ open, setOpen }: TPropsType) => {
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
          <h4 className="text-center text-xl font-medium">Game Edit Details</h4>
          <div
            className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#fff" className="" />
          </div>
        </div>
        <div className="mt-10 space-y-4">
          <p>Game edit details hare...</p>
        </div>
      </div>
    </Modal>
  );
};

export default EditDetails;
