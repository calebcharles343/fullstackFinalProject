import { AnimatePresence, motion } from "framer-motion";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { dateformat } from "../../utils/dateFormat";
import { useDeleteEntry } from "./useDeleteEntry";
import EditDiaryForm from "./EditDiaryForm";
import {
  BiEdit,
  BiTrash,
  BiCalendarPlus,
  BiUpArrow,
  BiDownArrow,
} from "react-icons/bi";
import Modal from "../../ui/Modal";
import { EventType } from "../../interfaces";
import truncate from "truncate-html";
import Swal from "sweetalert2";
import Calendar from "../../ui/Calendar";
import Links from "../../ui/Links";
import Linkify from "react-linkify";

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
  const [isTunga, setIsTunga] = useState<boolean>(false);
  const { deleteEntry, isDeleting } = useDeleteEntry();

  const handleToggleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleToggleCalendar = () => {
    setIsCalendar(!isCalendar);
  };
  const handleToggleisTunga = () => {
    if (isShowEvent) {
      setIsTunga(!isTunga);
    }
  };

  const handleDeleteEntry = (e: React.MouseEvent) => {
    e.stopPropagation();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this entry?",
      showCancelButton: true,
      confirmButtonColor: "#052859",
      cancelButtonColor: "#DC3340",
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

  useEffect(() => {
    if (isShowEvent === false) {
      setIsTunga(false);
      setIsCalendar(false);
    }
  }, [isShowEvent]);

  const isValidDate = (date: any) => {
    return !isNaN(Date.parse(date));
  };

  return (
    <>
      <AnimatePresence>
        {!isEdit && (
          <motion.div
            className={`flex flex-col w-full ${
              !isShowEvent && "h-[130px] md:h-[144px]"
            } ${
              isShowEvent && "md:w-[400px]"
            } text-gray-700 border-r-[5px] border-[#DC3340] rounded-lg p-3
              md:p-4 bg-gradient-to-tr from-white to-red-50
              shadow-[0_4px_6px_-1px_#77656830,0_2px_4px_-1px_#ffebee5d] ${
                !isShowEvent && "hover:cursor-pointer"
              }`}
            style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className={`text-base md:text-lg font-semibold break-words`}>
                {!isShowEvent &&
                  truncate(entry.title, {
                    length: isShowEvent ? 25 : 24,
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
                      className="py-1 text-lg text-[#052859] transition-colors hover:text-blue-700"
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
                  <h2 className="text-base md:text-lg font-semibold break-words mb-2">
                    {entry.title}
                  </h2>
                )}

                {!isShowEvent && (
                  <p
                    className={`text-[13px] md:text-[14px]`}
                    style={{ lineHeight: "1.4", whiteSpace: "pre-wrap" }}
                  >
                    {entry.content}
                  </p>
                )}

                {isShowEvent && (
                  <Linkify
                    componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a
                        href={decoratedHref}
                        key={key}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "underline" }}
                        className="text-inherit hover:text-blue-800"
                      >
                        {decoratedText}
                      </a>
                    )}
                  >
                    <p
                      className={`text-sm md:text-base}`}
                      style={{ lineHeight: "1.35", whiteSpace: "pre-wrap" }}
                    >
                      {entry.content}
                    </p>
                  </Linkify>
                )}
              </div>
            </div>

            <div className="relative flex items-center justify-between -mb-1">
              <div>
                <span
                  className={`inline-flex items-center text-xs text-[#DC3340] 
                  font-semibold gap-1 ${isShowEvent && "hover:cursor-pointer"}`}
                  onClick={handleToggleisTunga}
                >
                  TUNGA{" "}
                  {isShowEvent && (
                    <span>{isTunga ? <BiUpArrow /> : <BiDownArrow />}</span>
                  )}
                </span>
              </div>

              {isTunga && <Links />}

              <span className="text-xs text-[#052859] font-bold">
                {isValidDate(entry?.createdAt)
                  ? dateformat(entry?.createdAt)
                  : "Invalid date"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isEdit && (
        <Modal onClose={handleToggleEdit}>
          <motion.div
            className="mt-4 bg-white shadow-lg rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <EditDiaryForm
              entry={entry}
              setIsEdit={setIsEdit}
              setIsShowEvent={setIsShowEvent}
            />
          </motion.div>
        </Modal>
      )}

      {isTunga && !isCalendar && (
        <motion.div
          className="h-10 w-[100px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <AnimatePresence>
        {isShowEvent && isCalendar && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Calendar />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
