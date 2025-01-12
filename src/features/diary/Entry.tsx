import { useState, Dispatch, SetStateAction } from "react";
import { dateformat } from "../../utils/dateFormat";
import { useDeleteEntry } from "./useDeleteEntry";
import EditDiaryForm from "./EditDiaryForm";
import { BiEdit, BiTrash, BiCalendarPlus } from "react-icons/bi";
import Modal from "../../ui/Modal";
import { EventType } from "../../interfaces";
import truncate from "truncate-html";
import Swal from "sweetalert2";

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

  const handleDeleteEntry = (e: React.MouseEvent) => {
    e.stopPropagation();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this entry?",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: "custom-style" },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEntry(entry.id);
        setIsEdit(false);
        if (setIsShowEvent) {
          setIsShowEvent(false);
        }
      }
    });
  };

  const isValidDate = (date: any) => {
    return !isNaN(Date.parse(date));
  };

  return (
    <>
      {!isEdit && (
        <div
          className={`flex flex-col w-full ${
            !isShowEvent && "h-[130px] md:h-[144px]"
          } ${
            isShowEvent && "md:w-[400px]"
          } text-gray-700 border-r-[5px] border-[#DC3340] rounded-lg p-3
           md:p-4 bg-gradient-to-tr from-white 
           to-red-50 
           shadow-[0_4px_6px_-1px_#77656830,0_2px_4px_-1px_#ffebee5d]`}
        >
          <div className="flex justify-between items-center mb-1">
            <h2 className={`text-base md:text-lg font-semibold break-words`}>
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
                    className="py-1 text-lg text-teal-500 transition-colors 
                    hover:text-teal-700"
                    onClick={handleToggleEdit}
                  >
                    {isEdit ? "Cancel" : <BiEdit />}
                  </button>

                  <button
                    onClick={handleToggleCalendar}
                    className="py-1 text-lg text-[#052859] transition-colors 
                    hover:text-blue-700"
                  >
                    <BiCalendarPlus />
                  </button>
                </div>
              )}

              <button
                className="py-1 text-lg text-red-500 transition-colors 
                hover:text-red-700"
                onClick={handleDeleteEntry}
              >
                {isDeleting ? "..." : <BiTrash />}
              </button>
            </div>
          </div>

          <div className="flex-grow  overflow-hidden">
            <div className={`md:text-sm overflow-y-hidden overflow-x-hidden`}>
              {isShowEvent && (
                <h2 className="text-base md:text-lg  font-semibold break-words mb-2">
                  {entry.title}
                </h2>
              )}

              {!isShowEvent && (
                <p
                  className={`text-[13px] md:text-[14px]`}
                  style={{ lineHeight: "1.4" }}
                >
                  {entry.content}
                </p>
              )}
              {isShowEvent && (
                <p
                  className={`text-sm md:text-base"}`}
                  style={{ lineHeight: "1.3" }}
                >
                  {entry.content}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between -mb-1 ">
            <a href="https://tunga.platform.co.nl/">
              <span className="text-xs text-[#DC3340] font-semibold hover:underline">
                TUNGA
              </span>
            </a>

            <span className=" text-xs text-[#052859] font-bold ">
              {isValidDate(entry?.createdAt)
                ? dateformat(entry?.createdAt)
                : "Invalid date"}
            </span>
          </div>
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
          className="border-r-[5px] border-[#052859] rounded-lg mt-4 relative w-full 
          overflow-hidden"
          style={{
            paddingTop: "56.25%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#fef6f6",
            }}
          />
          <iframe
            src="https://calendar.google.com/calendar/embed?src=calebcharles343%40gmail.com&ctz=Africa%2FLagos"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "144%",
              height: "145%",
              border: 0,
              transform: "scale(0.70)",
              transformOrigin: "top left",
            }}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      )}
    </>
  );
}
