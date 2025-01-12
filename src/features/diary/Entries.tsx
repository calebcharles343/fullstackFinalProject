import { useEffect, useState } from "react";
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
  // State variables to manage form visibility, event visibility, event ID, and view event
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowEvent, setIsShowEvent] = useState<true | false>(false);
  const [eventId, setEventId] = useState<string | null>(null);
  const [viewEvent, setViewEvent] = useState<EventType | null>(null);

  // State variables for search functionality
  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);

  // Fetch entries data using custom hook
  const { data, isLoading } = useEntries();

  // Filter and sort events based on search criteria
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

  // Close modal handler
  const handleCloseModal = () => {
    setIsShowForm(false);
    setIsShowEvent(false);
  };

  // Set view event based on selected event ID
  useEffect(() => {
    if (eventId) {
      const currentEvent = filteredEvents.find((event) => event.id === eventId);
      setViewEvent(currentEvent || null);
    }
  }, [eventId, filteredEvents]);

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center w-full h-full text-white 
      backdrop-blur-sm"
      >
        <SpinnerMini />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center w-full min-w-[300px] h-screen gap-3 
    p-4 md:p-2 "
    >
      {isShowForm && (
        <Modal onClose={handleCloseModal}>
          <div className="mt-4 bg-white shadow-lg rounded-lg">
            <DiaryForm setIsShowForm={setIsShowForm} />
          </div>
        </Modal>
      )}

      <div className="flex flex-col items-center justify-center gap-3">
        <button
          className="flex items-center text-sm gap-2 px-2 md:px-3 py-1 md:py-2 
          font-bold text-teal-500 bg-white border rounded-lg hover:bg-blue-100"
          onClick={() => setIsShowForm(true)}
        >
          Add Note <BiMessageAdd />
        </button>

        <div
          className="lg:hidden relative flex flex-col items-center 
        w-full max-w-[200px] bg-white text-sm border border-gray-500 rounded-lg 
        focus-within:border-2 focus-within:border-teal-500"
        >
          <ReactDatePicker
            selected={searchDate}
            onChange={(date) => setSearchDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full py-1 px-3 text-center text-rose-500 border-none focus:outline-none rounded-md text-base" // Set font-size to at least 16px and remove border
            placeholderText="Date (yyyy-mm-dd)"
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
            <h2 className="text-xl text-center md:text-start md:text-2xl font-bold text-white">
              MY NOTES
            </h2>
          </div>

          <div
            className="lg:mr-[90px] relative w-full max-w-[332px] md:max-w-[332px]  
          lg:max-w-[285px] mb-1"
          >
            <input
              type="text"
              placeholder="Search by title or content"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-1 text-base bg-rose-600 text-center text-white
               placeholder:text-gray-200 border-2 border-teal-500 rounded-lg 
               focus:outline-none focus:ring-1 focus:ring-teal-500"
              style={{ fontWeight: "bold" }}
            />

            <span
              className="text-ld text-white absolute right-2 top-1/2 transform 
              -translate-y-1/2 cursor-pointer"
              onClick={() => setSearchDate(null)}
            >
              x
            </span>
          </div>

          <div
            className="relative hidden lg:flex flex-col items-center w-full 
          max-w-[200px] bg-white text-sm border border-gray-500 rounded-lg 
          focus-within:border-2 focus-within:border-teal-500 mb-1"
          >
            <ReactDatePicker
              selected={searchDate}
              onChange={(date) => setSearchDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full py-1 px-3 text-center text-rose-500 border-none 
              focus:outline-none rounded-md text-base"
              placeholderText="Date (yyyy-mm-dd)"
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
          <div className="mt-8">
            <p>No Events Available</p>
          </div>
        )}
        {filteredEvents.length > 0 && (
          <div
            className="w-full min-w-[300px] md:min-w-[610px] lg:w-[910px] 
          lg:max-w-[910px] h-[478px] overflow-y-scroll mt-1 md:mt-0 rounded-3xl"
          >
            <div
              className={`w-full grid  gap-2 md:gap-2 grid-cols-1 md:grid-cols-2 
              lg:grid-cols-3 p-2 md:p-4 md:pb-2  rounded-3xl`}
            >
              {filteredEvents?.map((entry: EventType, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    setEventId(entry.id);
                    setIsShowEvent(true);
                  }}
                >
                  <Entry entry={entry} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isShowEvent && viewEvent && (
        <Modal onClose={handleCloseModal}>
          <div className="w-full max-w-[400px] mt-4 bg-white shadow-lg rounded-lg">
            <Entry
              entry={viewEvent}
              isShowEvent={isShowEvent}
              setIsShowEvent={setIsShowEvent}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
