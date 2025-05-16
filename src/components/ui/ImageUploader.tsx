import { cn } from "@/lib/utils";

type TImageUploader = {
  label?: string;
  className?: string;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
};

const ImageUploader = ({
  label,
  setImagePreview,
  setImageFiles,
  className,
}: TImageUploader) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-col items-center w-full h-fit gap-4 rounded-md border border-dashed border-neutral-500",
          className
        )}
      >
        <input
          onChange={handleImageChange}
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="w-full h-36 md:size-36 flex items-center justify-center border-dashed border-neutral-500 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
        >
          {label}
        </label>
      </div>
    </>
  );
};

export default ImageUploader;
