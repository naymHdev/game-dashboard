import Image from "next/image";
import React from "react";
import { X } from "lucide-react";
import { Button } from "antd";

type TImangePreviewer = {
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreview: string[];
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
};

const ImagePreviewer = ({
  setImageFiles,
  imagePreview,
  setImagePreview,
  className,
}: TImangePreviewer) => {
  const handleRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
    setImagePreview((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className={className}>
      {imagePreview.map((preview, index) => (
        <div
          key={index}
          className="relative w-full h-fit  rounded-md overflow-hidden border border-dashed border-card"
        >
          <Image
            width={500}
            height={500}
            src={preview}
            alt={`Preview ${index + 1}`}
            className="object-cover w-full h-full"
          />
          <button
            onClick={() => handleRemove(index)}
            className="absolute text-white bg-transparent top-0 right-0 m-2 bg-red-500 rounded-full p-1"
          >
            <X className="size-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewer;
