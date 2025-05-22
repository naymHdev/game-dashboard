"use client";

import { Button } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PrivacyPolicyEditor = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [value, setValue] = useState(
    "<h2>Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor.</h2><p><br/></p><h2>In today’s rapidly evolving world, the importance of education cannot be overstated. Technological advancements, global interconnectivity, and the proliferation of information demand that we continuously adapt and expand our understanding. An educated individual is better prepared to tackle these challenges, innovate, and drive progress. Moreover, education promotes equality and social justice, providing marginalized groups with the means to uplift themselves and break cycles of poverty.</h2><p><br/></p><h2>Education also nurtures empathy and cultural awareness, fostering a more inclusive and understanding society. By learning about diverse perspectives and histories, we become more open-minded and respectful of differences, which is crucial in a world that is increasingly interconnected. This cultural competence not only enhances personal relationships but also strengthens international collaboration and peace.....</h2>"
  );

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

  const handleSave = async () => {
    setLoading(true);
    console.log("moduleContest", value);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <span
          onClick={() => router.back()}
          className="cursor-pointer bg-main-color p-2 rounded-full"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && router.back()}
          aria-label="Go back"
        >
          <FaArrowLeft size={20} color="#fff" />
        </span>
        <h4 className="text-2xl font-medium text-text-color">Privacy Policy</h4>
      </div>
      <ReactQuill
        modules={moduleContest}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Start writing ......"
        style={{
          border: "1px solid #EFE8FD",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      />
      <Button
        size="large"
        block
        style={{ marginTop: 20, border: "none" }}
        onClick={handleSave}
        loading={loading}
        disabled={loading}
      >
        Save Changes
      </Button>
    </>
  );
};

export default dynamic(() => Promise.resolve(PrivacyPolicyEditor), {
  ssr: false,
});
