import SpinnerMini from "../../ui/SpinnerMini";
import Entry from "./Entry";
import { useEntries } from "./useEntries";

export default function Entries() {
  const { data, isLoading } = useEntries();

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm w-full h-screen">
        <SpinnerMini />
      </div>
    );
  }

  console.log(data);

  return (
    <div className="flex flex-col border w-full max-w-[400px] h-[320px] p-4 gap-4 rounded-md self-center overflow-y-scroll">
      <p className="text-center">MY ENTRIES</p>

      {data?.data?.map((entry: any) => (
        <Entry entry={entry} />
      ))}
    </div>
  );
}
