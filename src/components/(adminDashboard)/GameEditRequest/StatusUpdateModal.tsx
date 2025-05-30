"use client";

import { useForm, Controller } from "react-hook-form";
import { Select, Button } from "antd";
import { toast } from "sonner";
import { changeStatus } from "@/services/games";

type FormData = {
  status: string;
};

const options = [
  { value: "steam", label: "Steam" },
  { value: "itch.io", label: "Itch.io" },
  { value: "globe", label: "Globe" },
];

const StatusUpdateModal = ({ gameId }: { gameId: string }) => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      status: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    const updatedData = {
      data: {
        gameId: gameId,
        linkType: values.status.toLowerCase(),
      },
    };
    // console.log("Updated Data:", updatedData);

    try {
      const res = await changeStatus(updatedData);
    //   console.log("Update Role Response:", res);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.error("Error updating role:", error);
      toast.error(`Failed to update role: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <Controller
        name="status"
        control={control}
        rules={{ required: "Please select a status" }}
        render={({ field, fieldState }) => (
          <>
            <Select
              {...field}
              showSearch
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={options}
              onChange={(value) => field.onChange(value)}
              value={field.value || undefined}
              style={{ width: 200 }}
              dropdownStyle={{}}
              className=""
            />
            {fieldState.error && (
              <p className="text-red-600 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
      <Button className=" ml-4" htmlType="submit" type="primary">
        Update Status
      </Button>
    </form>
  );
};

export default StatusUpdateModal;
