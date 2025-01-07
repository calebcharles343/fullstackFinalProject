import { useState } from "react";
import DiaryForm from "../features/diary/DiaryForm";
import Entries from "../features/diary/Entries";
import TableModal from "../ui/TableModal";

export default function Diary() {
  const [isShowForm, setIshowForm] = useState<boolean>(false);
  const handleCloseModal = () => {
    setIshowForm(false);
  };

  return (
    <div className=" flex flex-col h-screen overflow-y-scroll md:px-4 pt-8 pb-16 gap-4">
      <button onClick={() => setIshowForm(true)}>Add Event</button>

      <div className="container mx-auto p-4">
        <div className="border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isShowForm && (
            <TableModal onClose={handleCloseModal}>
              {isShowForm && <DiaryForm />}
            </TableModal>
          )}
          <Entries />
        </div>
      </div>
    </div>
  );
}
