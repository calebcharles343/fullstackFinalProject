import Entries from "../features/diary/Entries";

export default function Diary() {
  return (
    <div className=" flex flex-col md:px-4 pt-6 pb-16 gap-4 overflow-x-hidden overflow-y-scroll">
      <div className="container mx-auto p-4">
        <div className="w-full">
          <Entries />
        </div>
      </div>
    </div>
  );
}
