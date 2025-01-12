import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SpinnerMini from "../../ui/SpinnerMini";
import Modal from "../../ui/Modal";
import DiaryForm from "./DiaryForm";
import Entry from "./Entry";
import { useEntries } from "./useEntries";
import { BiMessageAdd } from "react-icons/bi";
import { EventType } from "../../interfaces";
import { format, parseISO } from "date-fns";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Entries() {
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowEvent, setIsShowEvent] = useState<true | false>(false);
  const [eventId, setEventId] = useState<string | null>(null);
  const [viewEvent, setViewEvent] = useState<EventType | null>(null);

  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);

  const { data, isLoading } = useEntries();

  useEffect(() => {
    if (data) {
      const filtered = data.data
        .filter(
          (order: EventType) =>
            (!searchDate ||
              format(parseISO(order.createdAt), "yyyy-MM-dd") ===
                format(searchDate, "yyyy-MM-dd")) &&
            (order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order.content.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .sort(
          (a: EventType, b: EventType) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      setFilteredEvents(filtered);
    }
  }, [searchDate, searchQuery, data?.data]);

  const handleCloseModal = () => {
    setIsShowForm(false);
    setIsShowEvent(false);
  };

  useEffect(() => {
    if (eventId) {
      const currentEvent = filteredEvents.find((event) => event.id === eventId);
      setViewEvent(currentEvent || null);
    }
  }, [eventId, filteredEvents]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full text-white backdrop-blur-sm">
        <SpinnerMini />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full min-w-[300px] h-screen gap-3 p-4 md:p-2">
      <AnimatePresence>
        {isShowForm && (
          <Modal onClose={handleCloseModal}>
            <motion.div
              className="mt-4 bg-white shadow-lg rounded-lg"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <DiaryForm setIsShowForm={setIsShowForm} />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
      <div className="flex flex-col items-center justify-center gap-3">
        <button
          className="flex items-center text-sm gap-2 px-2 md:px-3 py-1 md:py-2 
          font-bold text-[#052859] bg-white border rounded-lg hover:bg-gray-100"
          onClick={() => setIsShowForm(true)}
        >
          Add Note <BiMessageAdd />
        </button>

        <div
          className="lg:hidden relative flex flex-col items-center 
        w-full max-w-[200px] bg-white text-sm border border-gray-500 rounded-lg 
        focus-within:border-2 focus-within:border-[#052859] scale-90 md:scale-100 z-50"
        >
          <ReactDatePicker
            selected={searchDate}
            onChange={(date) => setSearchDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full py-1 px-3 text-center text-rose-500 border-none focus:outline-none rounded-md text-base z-50" // Set font-size to at least 16px and remove border
            placeholderText="Date - yyyy-mm-dd"
          />
          <span
            className="text-lg text-red-500 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setSearchDate(null)}
          >
            x
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full items-center justify-center">
        <div
          className="w-full lg:max-w-[910px] flex flex-col md:flex-row 
        items-center justify-between px-2 md:px-6 "
        >
          <div className="w-full ">
            <h2
              className="text-lg text-center md:text-start md:text-2xl font-bold 
            text-white"
            >
              MY NOTES
            </h2>
          </div>

          <div
            className="lg:mr-[90px] relative w-full max-w-[332px] md:max-w-[332px]  
          lg:max-w-[285px] mb-1 scale-90 md:scale-100"
          >
            <input
              type="text"
              placeholder="Search by title or content"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-1 text-base bg-[#DC3340] text-center text-white
               placeholder:text-gray-200 border-2 border-gray-50 rounded-lg 
               focus:outline-none focus:ring-1 focus:ring-red-50"
              style={{ fontWeight: "bold" }}
            />

            <span
              className="text-ld text-white absolute right-2 top-1/2 transform 
              -translate-y-1/2 cursor-pointer"
              onClick={() => setSearchQuery("")}
            >
              x
            </span>
          </div>

          <div
            className="relative hidden lg:flex flex-col items-center w-full 
          max-w-[200px] bg-white text-sm border border-gray-500 rounded-lg 
          focus-within:border-2 focus-within:border-red-50 mb-1"
          >
            <ReactDatePicker
              selected={searchDate}
              onChange={(date) => setSearchDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full py-1 px-3 text-center text-rose-500 border-none 
              focus:outline-none rounded-md text-base"
              placeholderText="Date - yyyy-mm-dd"
            />
            <span
              className="text-lg text-red-500 absolute right-2 top-1/2 transform 
              -translate-y-1/2 cursor-pointer"
              onClick={() => setSearchDate(null)}
            >
              x
            </span>
          </div>
        </div>

        {filteredEvents.length < 1 && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>No Events Available</p>
          </motion.div>
        )}

        <motion.div
          className="w-full min-w-[300px] md:min-w-[610px] lg:w-[910px] lg:max-w-[910px] h-[478px] overflow-y-scroll mt-1 md:mt-0 rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full grid gap-2 md:gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 md:p-4 md:pb-2 rounded-3xl"
            layout
          >
            {filteredEvents?.map((entry: EventType, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setEventId(entry.id);
                  setIsShowEvent(true);
                }}
              >
                <Entry entry={entry} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isShowEvent && viewEvent && (
          <Modal onClose={handleCloseModal}>
            <motion.div
              className="w-full max-w-[400px] mt-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Entry
                entry={viewEvent}
                isShowEvent={isShowEvent}
                setIsShowEvent={setIsShowEvent}
              />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
