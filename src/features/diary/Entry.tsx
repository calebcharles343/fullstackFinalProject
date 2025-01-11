import { useState, Dispatch, SetStateAction } from "react";
import { dateformat } from "../../utils/dateFormat";
import { useDeleteEntry } from "./useDeleteEntry";
import EditDiaryForm from "./EditDiaryForm";
import { BiEdit, BiTrash, BiCalendarPlus } from "react-icons/bi";
import Modal from "../../ui/Modal";
import { EventType } from "../../interfaces";
import truncate from "truncate-html";

export default function Entry({
  entry,
  isShowEvent,
  setIsShowEvent,
}: {
  entry: EventType;
  isShowEvent?: boolean;
  setIsShowEvent?: Dispatch<SetStateAction<true | false>>;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isCalendar, setIsCalendar] = useState(false);
  const { deleteEntry, isDeleting } = useDeleteEntry();

  const handleToggleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleToggleCalendar = () => {
    setIsCalendar(!isCalendar);
  };

  const handleDeleteEntry = (e: any) => {
    e.stopPropagation();
    deleteEntry(entry.id);
    setIsEdit(false);
    if (setIsShowEvent) {
      setIsShowEvent(false);
    }
  };

  const isValidDate = (date: any) => {
    return !isNaN(Date.parse(date));
  };

  return (
    <>
      {!isEdit && (
        <div
          className={`flex flex-col w-full ${!isShowEvent && "h-[175px]"} ${
            isShowEvent && "md:w-[400px]"
          } text-gray-700 border-r-[5px] border-teal-500 rounded-lg shadow-lg p-4 bg-gradient-to-tr from-white to-red-50`}
        >
          <div className="flex justify-between items-center mb-1">
            <h2 className={`text-base font-semibold break-words`}>
              {!isShowEvent &&
                truncate(entry.title, {
                  length: isShowEvent ? 25 : 15,
                  ellipsis: "...",
                })}
            </h2>
            <div className="flex gap-4">
              {isShowEvent && (
                <div className="flex items-center gap-4">
                  <button
                    className="py-1 text-lg text-teal-500 transition-colors hover:text-teal-700"
                    onClick={handleToggleEdit}
                  >
                    {isEdit ? "Cancel" : <BiEdit />}
                  </button>

                  <button
                    onClick={handleToggleCalendar}
                    className="py-1 text-lg text-blue-500 transition-colors hover:text-blue-700"
                  >
                    <BiCalendarPlus />
                  </button>
                </div>
              )}

              <button
                className="py-1 text-lg text-red-500 transition-colors hover:text-red-700"
                onClick={handleDeleteEntry}
              >
                {isDeleting ? "..." : <BiTrash />}
              </button>
            </div>
          </div>

          <div className="flex-grow overflow-hidden">
            <div className={`md:text-sm overflow-y-hidden overflow-x-hidden`}>
              {isShowEvent && (
                <h2 className="text-base md:text-lg  font-semibold break-words mb-2">
                  {entry.title}
                </h2>
              )}

              {!isShowEvent && (
                <p
                  className={`text-base text-[12px]"}`}
                  style={{ lineHeight: "1.3" }}
                >
                  {entry.content}
                </p>
              )}
              {isShowEvent && (
                <p
                  className={`text-sm md:text-base text-[12px]"}`}
                  style={{ lineHeight: "1.3" }}
                >
                  {entry.content}
                </p>
              )}
            </div>
          </div>

          <span className="mt-2 text-xs text-rose-500 font-bold text-right">
            {isValidDate(entry?.createdAt)
              ? dateformat(entry?.createdAt)
              : "Invalid date"}
          </span>
        </div>
      )}

      {isEdit && (
        <Modal onClose={handleToggleEdit}>
          <div className="bg-white mt-4 shadow-lg p-4 rounded-lg">
            <EditDiaryForm
              entry={entry}
              setIsEdit={setIsEdit}
              setIsShowEvent={setIsShowEvent}
            />
          </div>
        </Modal>
      )}

      {isShowEvent && isCalendar && (
        <div
          className="border-r-[5px] border-rose-500 rounded-lg mt-4 relative w-full overflow-hidden"
          style={{
            paddingTop: "56.25%", // Aspect ratio 16:9
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#fef6f6", // Light blue overlay
            }}
          />
          <iframe
            src="https://calendar.google.com/calendar/embed?src=calebcharles343%40gmail.com&ctz=Africa%2FLagos"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "154%", // Increase width to compensate for scaling
              height: "155%", // Increase height to compensate for scaling
              border: 0,
              transform: "scale(0.65)", // Scale content down
              transformOrigin: "top left", // Scale from top-left
            }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      )}
    </>
  );
}
