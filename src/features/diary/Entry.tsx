import { useState } from "react";
import { dateformat } from "../../utils/dateFormat";
import { useDeleteEntry } from "./useDeleteEntry";
import EditDiaryForm from "./EditDiaryForm";

export default function Entry({ entry }: any) {
  const [isEdit, setIsEdit] = useState(false);
  const { deleteEntry, isDeleting } = useDeleteEntry();

  const handleToggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDeleteEntry = (id: string) => {
    deleteEntry(id);
  };

  return (
    <div className="flex flex-col border rounded-lg shadow-lg p-4 bg-white">
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">{entry.title}</h2>
          <div className="flex items-center space-x-2">
            <button
              className="px-2 py-1 text-xs  bg-teal-500 rounded hover:bg-teal-600 transition-colors"
              onClick={handleToggleEdit}
            >
              {isEdit ? "Cancel" : "Edit"}
            </button>
            <button
              className="px-2 py-1 text-xs bg-red-500 rounded hover:bg-red-600 transition-colors"
              onClick={() => handleDeleteEntry(entry.id)}
            >
              {isDeleting ? "..." : "X"}
            </button>
          </div>
        </div>
        <p className="text-gray-600">{entry.content}</p>
      </div>

      {isEdit && (
        <div className="mt-4">
          <EditDiaryForm entry={entry} />
        </div>
      )}

      <span className="mt-4 text-xs text-gray-500 text-right">
        {dateformat(entry?.createdAt)}
      </span>
    </div>
  );
}
