import { updateUserRole } from "@/services/auth";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type IUser = {
  id: string;
  role: string;
  password: string;
  name: string;
};

type TPropsType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: IUser | null;
};

type FormData = {
  role: string;
  password: string;
};

const roles = ["ADMIN"];

const RoleUpdateModal = ({ isOpen, setIsOpen, user }: TPropsType) => {
  console.log("RoleUpdateModal user", user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { role: "user" },
  });

  useEffect(() => {
    if (user && isOpen) {
      reset({ role: user.role.toUpperCase() });
    }
  }, [user, isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    const updatedData = {
      data: {
        userId: user?.id,
        password: data.password,
        role: data.role.toUpperCase(),
      },
    };
    console.log("Updated Data:", updatedData);

    try {
      const res = await updateUserRole(updatedData);
      // console.log("Update Role Response:", res);
      if (res.success) {
        toast.success(res.message);
        // setIsOpen(false);
        // reset();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.error("Error updating role:", error);
      toast.error(`Failed to update role: ${error.message || "Unknown error"}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => {
        setIsOpen(false);
        reset();
      }}
    >
      <div
        className="bg-[#252728] p-6 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="modal-title"
          className="text-xl text-white/90 font-semibold mb-4"
        >
          Update Role for {user?.name || "User"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-1 font-medium text-white">
              Select Role
            </label>
            <select
              id="role"
              {...register("role", { required: "Please select a role" })}
              disabled={isSubmitting}
              className={`w-full border rounded px-3 py-2 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
              defaultValue=""
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* ------------- password field ------------ */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 font-medium text-white"
            >
              Add Password
            </label>
            <input
              className="w-full border-none rounded px-3 py-2"
              type="text"
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleUpdateModal;
