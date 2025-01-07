import { useState } from "react";
import { useCreateEntry } from "./useCreateEntry";
import toast from "react-hot-toast";

export default function DiaryForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { createEntry, isPending } = useCreateEntry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Invalid inputs");
      return;
    }

    createEntry({ title, content } as any);
  };

  return (
    <div className="border p-4 w-full max-w-md rounded-md bg-white shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-bold text-teal-600">
            Title
          </label>
          <input
            id="title"
            className="p-2 text-xs border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={title}
            maxLength={50}
            minLength={1}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="text-sm font-bold text-teal-600">
            Content
          </label>
          <textarea
            id="content"
            className="p-2 h-24 text-xs border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={content}
            maxLength={200}
            minLength={1}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="py-2 px-4 text-sm bg-teal-500 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
        >
          {isPending ? "Creating..." : "Create Entry"}
        </button>
      </form>
    </div>
  );
}
