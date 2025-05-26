import React, { useEffect } from "react";
import { Modal, Select, Form, Button } from "antd";

type IUser = {
  id: string;
  role: string;
  name: string;
  // add other fields as needed
};

type TPropsType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: IUser | null;
  onUpdateRole: (userId: string, newRole: string) => Promise<void> | void;
};

const roles = ["user", "admin", "moderator"];
const RoleUpdateModal = ({ isOpen, setIsOpen, user }: TPropsType) => {
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title={`Update Role for ${user?.name || "User"}`}
        open={isOpen}
        footer={null}
        onCancel={() => {
          setIsOpen(false);
          form.resetFields();
        }}
        okText="Save"
        centered
        destroyOnClose
      >
        <Form form={form} layout="vertical" name="roleUpdateForm">
          <Form.Item
            label="Select Role"
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select a role">
              {roles.map((r) => (
                <Select.Option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RoleUpdateModal;
