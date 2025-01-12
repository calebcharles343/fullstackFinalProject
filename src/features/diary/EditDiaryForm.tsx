import React, { useState } from "react";
import toast from "react-hot-toast";

import { useEditEntry } from "./useEditEntry";

export default function EditDiaryForm({
  entry,
  setIsEdit,
  setIsShowEvent,
}: any) {
  const [title, setTitle] = useState<string>(entry.title);
  const [content, setContent] = useState<string>(entry.content);

  const { editEntry, isPending } = useEditEntry(entry.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Invalid inputs");
      return;
    }

    editEntry({ title, content } as any);
    setIsEdit(false);
    if (setIsShowEvent) {
      // setIsShowEvent(false);
    }
  };

  return (
    <div className="border p-4 w-[280px] md:min-w-[300px] rounded-md bg-white shadow-lg">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col space-y-4"
        style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
      >
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text-base text-center font-bold text-[#052859]"
          >
            Note Title
          </label>
          <input
            id="title"
            className="p-2 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#052859]"
            value={title}
            maxLength={50}
            minLength={1}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="content"
            className="text-base text-center font-bold text-[#052859]"
          >
            Note Content
          </label>
          <textarea
            id="content"
            className="p-2 h-40 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#052859]"
            value={content}
            maxLength={400}
            minLength={1}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="py-2 px-4 text-base bg-[#052859] text-white rounded-lg hover:bg-[#052859] transition-colors duration-200"
        >
          {isPending ? "Updating" : "Update Note"}
        </button>
      </form>
    </div>
  );
}
