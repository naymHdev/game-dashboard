"use client";
import { adminSignIn } from "@/services/auth";
import { FieldType } from "@/types";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = async (
  errorInfo
) => {
  console.log("Failed:", errorInfo);
};

const LoginForm = () => {
  const route = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    // console.log("Success:", values);

    const authInfo = {
      data: {
        email: values?.email,
        password: values?.password,
      },
    };

    // console.log("authInfo", authInfo);

    try {
      const res = await adminSignIn(authInfo);
      console.log(res);
      if (res.success) {
        toast.success("Successfully Login", {
          duration: 1000,
        });
        route.push("/dashboard");
      } else {
        toast.error(res.message, {
          duration: 1000,
        });
      }
    } catch (error) {
      toast.error("Internal server error", {
        duration: 1000,
      });
      console.log(error);
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      style={{ width: "354px" }}
    >
      <Form.Item<FieldType>
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            type: "email",
            message: "Please enter a valid email address!",
          },
        ]}
      >
        <Input size="large" type="email" placeholder="User Email" />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" placeholder="Password" />
      </Form.Item>

      <Form.Item<FieldType> name="remember" valuePropName="checked">
        <Flex justify="space-between" align="center">
          <Checkbox>
            <p className=" font-semibold">Remember me</p>
          </Checkbox>
          <Link href={"/forget-password"} style={{ textDecoration: "" }}>
            <p className="font-semibold">Forgot Password?</p>
          </Link>
        </Flex>
      </Form.Item>

      <Button htmlType="submit" size="large" block style={{ border: "none " }}>
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
