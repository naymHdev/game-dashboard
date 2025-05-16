"use client";

import { useState } from "react";
import { BlogFormInputs } from "@/types/blogs";
import { useForm } from "react-hook-form";
import { createBlog } from "@/services/blog";
import { MdOutlineCloudUpload } from "react-icons/md";
import Image from "next/image";

const CreateBlog = () => {
  const [imageFiles, setImageFiles] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Function to handle file upload
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setImageFiles(file);
  };
  // console.log("imageFiles", imageFiles);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormInputs>();

  // Submit Handler
  const onSubmit = async (data: BlogFormInputs) => {
    console.log("Submitted Blog:", data);

    // Create a FormData object
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("blogImage", imageFiles!);

    try {
      const res = await createBlog(formData);
      console.log(res);
    } catch (error: any) {
      console.log(error, "error ");
    }

    reset();
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-6 mx-auto  rounded shadow"
        >
          <div>
            <label className="block text-sm font-medium text-white">
              Blog Banner
            </label>
            <div className="relative border border-dashed mt-4 bg-card rounded-lg flex flex-col items-center justify-center text-center cursor-pointer">
              <input
                id="thumbnail"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleThumbnailChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Thumbnail Preview"
                  width={500}
                  height={500}
                  className="w-full h-fit"
                />
              ) : (
                <>
                  <MdOutlineCloudUpload className="text-white text-5xl mb-4 mt-6" />
                  <div className="space-y-1 p-8">
                    <p className="text-white/90 font-medium">
                      Drag your file here or
                      <label
                        htmlFor="thumbnail"
                        className="text-secondary underline cursor-pointer"
                      >
                        browse
                      </label>
                    </p>
                    <p className="text-sm text-white/70">
                      .jpg, .jpeg, .png — Max size: <strong>1.00 MB</strong> —
                      Dimension: <strong>1920×345 px</strong>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Author
            </label>
            <input
              {...register("author", { required: "Author is required" })}
              className="mt-2 block text-white w-full border border-neutral-500 rounded-md px-3 py-2 bg-transparent"
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className="mt-2 block text-white w-full border border-neutral-500 rounded-md px-3 py-2 bg-transparent"
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-2 block text-white w-full border border-neutral-500 rounded-md px-3 py-2 bg-transparent"
              placeholder="Enter blog description"
              rows={4}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className=" w-2/12 mx-auto bg-primary-green rounded-full py-2 font-semibold "
          >
            Submit Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
