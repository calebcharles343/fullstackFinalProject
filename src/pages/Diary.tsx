import Entries from "../features/diary/Entries";

export default function Diary() {
  return (
    <div className=" flex flex-col overflow-y-scroll md:px-4 pt-8 pb-16 gap-4">
      <div className="container mx-auto p-4">
        <div className="w-full">
          <Entries />
        </div>
      </div>
    </div>
  );
}
