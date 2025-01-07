import React, { useState } from "react";
import toast from "react-hot-toast";

import { useEditEntry } from "./useEditEntry";

export default function EditDiaryForm({ entry }: any) {
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
  };

  return (
    <div className="border p-4  w-full  rounded-md self-center">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="text-sm font-bold text-center">
            Title
          </label>
          <input
            id="title"
            className="p-2 text-xs border rounded-lg shadow-md resize-none text-gray-600"
            value={title}
            maxLength={50}
            minLength={1}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="content" className="text-sm font-bold text-center">
            Content
          </label>
          <textarea
            id="content"
            className="p-2 h-16 text-sm border rounded-lg shadow-md resize-none text-gray-600"
            value={content}
            maxLength={200}
            minLength={1}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="py-1 px-2 text-xs bg-blue-500 text-white rounded-lg"
        >
          {isPending ? "Editing" : "Edit Entry"}
        </button>
      </form>
    </div>
  );
}
