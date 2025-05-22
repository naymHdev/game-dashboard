"use client";

import { useState } from "react";
import { BlogFormInputs } from "@/types/blogs";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  useFieldArray,
} from "react-hook-form";
import { createBlog } from "@/services/blog";
import { MdOutlineCloudUpload } from "react-icons/md";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateBlog = () => {
  const [imageFiles, setImageFiles] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(
    "<h2>Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor.</h2><p><br/></p><h2>In today’s rapidly evolving world, the importance of education cannot be overstated. Technological advancements, global interconnectivity, and the proliferation of information demand that we continuously adapt and expand our understanding. An educated individual is better prepared to tackle these challenges, innovate, and drive progress. Moreover, education promotes equality and social justice, providing marginalized groups with the means to uplift themselves and break cycles of poverty.</h2><p><br/></p><h2>Education also nurtures empathy and cultural awareness, fostering a more inclusive and understanding society. By learning about diverse perspectives and histories, we become more open-minded and respectful of differences, which is crucial in a world that is increasingly interconnected. This cultural competence not only enhances personal relationships but also strengthens international collaboration and peace.....</h2>"
  );
  const router = useRouter();

  // -------------- Handle Blog Details --------------
  const toolbarOptions = [
    ["image"],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
  ];

  const moduleContest = {
    toolbar: toolbarOptions,
  };

  // Handle file upload preview
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
    setImageFiles(file);
  };

  // React Hook Form with rewards array
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<
    BlogFormInputs & {
      rewards: { code: string; reward: string; validity: string }[];
    }
  >({
    defaultValues: { rewards: [{ code: "", reward: "", validity: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rewards",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const blogData = {
      author: data.author,
      title: data.title,
      description: value,
      rewards: data.rewards,
      altTag: data.altTag,
    };

    console.log("blogData", blogData);

    const formData = new FormData();
    formData.append("data", JSON.stringify(blogData));
    if (imageFiles) formData.append("blogImage", imageFiles);

    // try {
    //   setLoading(true);
    //   const res = await createBlog(formData);
    //   if (res.success) {
    //     toast.success(res.message);
    //     reset();
    //     setImagePreview(null);
    //     router.push("/blogs");
    //     setLoading(false);
    //   } else {
    //     toast.error(res.message);
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   console.error(error, "error ");
    //   setLoading(false);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 mx-auto rounded"
      >
        {/* Blog Banner Input */}
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
                className="w-full h-auto"
              />
            ) : (
              <>
                <MdOutlineCloudUpload className="text-white text-5xl mb-4 mt-6" />
                <div className="space-y-1 p-8">
                  <p className="text-white/90 font-medium">
                    Drag your file here or{" "}
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

        {/* Banner Alt Tag */}
        <div>
          <label className="block text-sm font-medium text-white">
            Banner Alt Tag
          </label>
          <input
            {...register("altTag", { required: "Author is required" })}
            className="mt-2 block text-white w-full border border-neutral-500 rounded-md px-3 py-2 bg-transparent"
            placeholder="Enter alt tag for the blog image"
          />
          {errors.altTag && (
            <p className="text-red-500 text-sm">{errors.altTag.message}</p>
          )}
        </div>
        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-white">Author</label>
          <input
            {...register("author", { required: "Author is required" })}
            className="mt-2 block text-white w-full border border-neutral-500 rounded-md px-3 py-2 bg-transparent"
            placeholder="Enter author name"
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-white">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="mt-2 block text-white w-full border border-neutral-500 rounded-md px-3 py-2 bg-transparent"
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white">
            Description
          </label>
          <ReactQuill
            modules={moduleContest}
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="Start writing ......"
            style={{
              border: "1px solid #737373",
              marginTop: "20px",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Rewards Section */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Create Table
          </label>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col sm:flex-row gap-3 items-center"
              >
                <input
                  type="text"
                  placeholder="Code"
                  {...register(`rewards.${index}.code` as const, {
                    required: "Code is required",
                  })}
                  className="w-full sm:w-1/3 bg-card text-white rounded-md px-3 py-2 border bg-transparent border-neutral-500"
                />
                <input
                  type="text"
                  placeholder="Reward"
                  {...register(`rewards.${index}.reward` as const, {
                    required: "Reward is required",
                  })}
                  className="w-full sm:flex-1 bg-card text-white rounded-md px-3 py-2 border border-neutral-500 bg-transparent"
                />
                <input
                  type="text"
                  placeholder="Validity"
                  {...register(`rewards.${index}.validity` as const, {
                    required: "Reward is required",
                  })}
                  className="w-full sm:flex-1 bg-card text-white rounded-md px-3 py-2 border border-neutral-500 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-500 p-2"
                  aria-label="Remove reward"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ code: "", reward: "", validity: "" })}
              className="inline-flex items-center gap-2 text-white font-semibold"
            >
              <MdOutlineCloudUpload size={20} />
              Add Reward
            </button>
          </div>
          {(errors.rewards as any)?.message && (
            <p className="text-red-500 mt-2 text-sm">
              {(errors.rewards as any).message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-2/12 mx-auto bg-primary-green text-white rounded-full py-2 font-semibold"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
