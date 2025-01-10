import { useEffect, useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import TableModal from "../../ui/TableModal";
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
  const [isShowEvent, setIsShowEvent] = useState(false);
  const [viewEvent, setViewEvent] = useState<EventType | null>(null);

  const [searchDate, setSearchDate] = useState<Date | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);

  const { data, isLoading } = useEntries();

  useEffect(() => {
    if (data) {
      const filtered = data.data
        .filter(
          (order: EventType) =>
            !searchDate ||
            format(parseISO(order.createdAt), "yyyy-MM-dd") ===
              format(searchDate, "yyyy-MM-dd")
        )
        .sort(
          (a: EventType, b: EventType) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      setFilteredEvents(filtered);
    }
  }, [searchDate, data?.data]);

  const handleCloseModal = () => {
    setIsShowForm(false);
    setIsShowEvent(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full text-white backdrop-blur-sm">
        <SpinnerMini />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full gap-3 md:4 p-4 md:p-2">
      {isShowForm && (
        <TableModal onClose={handleCloseModal}>
          <div className="mt-4 bg-white shadow-lg">
            <DiaryForm />
          </div>
        </TableModal>
      )}

      <button
        className="flex items-center text-sm gap-2 px-2 md:px-3 py-1 md:py-2  font-bold text-teal-500 bg-white border rounded-lg hover:bg-blue-100"
        onClick={() => setIsShowForm(true)}
      >
        Add Event <BiMessageAdd />
      </button>
      <h2 className="text-xl  md:text-2xl font-bold text-white">MY EVENTS</h2>
      <div className="flex flex-col items-center w-full max-w-[200px] text-sm">
        <ReactDatePicker
          selected={searchDate}
          onChange={(date) => setSearchDate(date)}
          dateFormat="yyyy-MM-dd"
          className="w-full p-2 text-center text-rose-500 bg-white border border-gray-500 focus:ring-2 focus:ring-teal-500 rounded-md"
          placeholderText="Date (yyyy-mm-dd)"
        />
      </div>

      <div
        className={`grid w-full max-w-[610px] lg:max-w-[910px] gap-2 md:gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 md:p-4 rounded-md border`}
      >
        {filteredEvents?.map((entry: EventType, index: number) => (
          <div
            key={index}
            onClick={() => {
              setViewEvent(entry);
              setIsShowEvent(true);
            }}
          >
            <Entry entry={entry} />
          </div>
        ))}
      </div>

      {isShowEvent && (
        <TableModal onClose={handleCloseModal}>
          <div className="w-full max-w-[400px] mt-4 bg-white shadow-lg rounded-lg">
            <Entry
              entry={viewEvent as EventType}
              isShowEvent={isShowEvent}
              setIsShowEvent={setIsShowEvent}
            />
          </div>
        </TableModal>
      )}
    </div>
  );
}
