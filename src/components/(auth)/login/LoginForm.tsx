"use client";
import { useUser } from "@/contexts/UserContext";
import { adminSignIn, getCurrentUser } from "@/services/auth";
import { FieldType } from "@/types";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = async (
  errorInfo
) => {
  console.log("Failed:", errorInfo);
};

const LoginForm = () => {
  const { setUser } = useUser();
  const route = useRouter();
  const [loading, setIsLoading] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    // console.log("Success:", values);

    const authInfo = {
      data: {
        email: values?.email,
        password: values?.password,
      },
    };

    setIsLoading(true);

    // console.log("authInfo", authInfo);

    try {
      const res = await adminSignIn(authInfo);
      setIsLoading(false);
      console.log(res);
      if (res.success) {
        toast.success("Successfully Login", {
          duration: 1000,
        });

        // Fetch and set user before navigating
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        // Wait for toast to display before navigating
        setTimeout(() => {
          route.push("/dashboard");
        }, 1000);
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

      {/* <Form.Item<FieldType> name="remember" valuePropName="checked">
        <Flex justify="space-between" align="center">
          <Checkbox>
            <p className=" font-semibold">Remember me</p>
          </Checkbox>
          <Link href={"/forget-password"} style={{ textDecoration: "" }}>
            <p className="font-semibold">Forgot Password?</p>
          </Link>
        </Flex>
      </Form.Item> */}

      <Button
        htmlType="submit"
        size="large"
        block
        style={{ border: "none " }}
        loading={loading}
        icon={
          loading ? (
            <LoaderCircle className="animate-spin text-white text-xl" />
          ) : (
            <></>
          )
        }
      >
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
