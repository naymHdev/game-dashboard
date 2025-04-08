import { Metadata } from "next";
import LoginForm from "@/components/(auth)/login/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description:
    "Admin login for YUMQUICK. Access the secure portal to manage healthcare services, oversee patient records, and administer YUMQUICK medicine and care operations.",
};

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-secondary-color ">
      <div className="flex justify-center items-center   mx-auto   md:px-12 px-11 py-10 rounded-[40px] bg-white text-main-color ">
        <div>
          <div className="mb-6   flex flex-col justify-center items-center gap-y-4">
            <h2 className="text-2xl  font-bold  ">Sign In</h2>
          </div>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
