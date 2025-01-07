import { useState } from "react";
import { dateformat } from "../../utils/dateFormat";
import { useDeleteEntry } from "./useDeleteEntry";
import EditDiaryForm from "./EditDiaryForm";

export default function Entry({ entry }: any) {
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const { deleteEntry, isDeleting } = useDeleteEntry();
  const handleToggleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleDeleteEntry = (id: string) => {
    deleteEntry(id);
  };

  console.log(entry.id);

  return (
    <div className="flex flex-col border rounded-md gap-4 py-1 px-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm">{entry.title}</h2>
          <p className="text-xs">{entry.content}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1">
            <button className="border text-xs px-1" onClick={handleToggleEdit}>
              {isEdit ? "cancel" : "Edit"}
            </button>
            <button
              className="border border-red-500 text-xs text-red-500 px-1"
              onClick={() => handleDeleteEntry(entry.id)}
            >
              {isDeleting ? "..." : "X"}
            </button>
          </div>

          <span className="text-xs">{dateformat(entry?.createdAt!)}</span>
        </div>
      </div>

      {isEdit && (
        <div className="border w-full">
          <EditDiaryForm entry={entry} />
        </div>
      )}
    </div>
  );
}
