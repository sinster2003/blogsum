import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogTypes } from '@sinster2003/blogsum-zod-types';
import toast from "react-hot-toast";

const TextEditor = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const blogObject: blogTypes = {
    title,
    content,
    published: true
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <div className="w-full flex flex-col gap-3 justify-center items-center">
        <input
          type="text"
          placeholder="Title"
          className="w-1/2 h-16 text-4xl border-none outline-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <textarea
          className="w-1/2 min-h-96 border-none resize-none outline-none text-xl"
          placeholder="Share your experience..."
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        ></textarea>
      </div>
      <button
        onClick={async () => {
          try {
            await axios.post(
              `${BACKEND_URL}/api/v1/blog`,
              blogObject,
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );
            toast.success("Blog posted successfully");
            navigate("/blogs");
          } catch (error: any) {
            console.log(error);
            toast.error(`${error?.response?.data?.message}`);
          }
        }}
        className="p-2 px-10 rounded-full bg-green-500 hover:bg-green-600 hover:text-white"
      >
        Publish
      </button>
    </div>
  );
};

export default TextEditor;
