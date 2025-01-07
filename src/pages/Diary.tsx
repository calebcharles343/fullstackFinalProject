import { BiLogOut } from "react-icons/bi";
import { useLogout } from "../features/authenticaton/useLogout";
import SpinnerMini from "../ui/SpinnerMini";
import DiaryForm from "../features/diary/DiaryForm";
import Entries from "../features/diary/Entries";

export default function Diary() {
  const { logout, isPending } = useLogout();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div
      className=" flex flex-col h-screen text-white  overflow-y-scroll md:px-4 pt-8 pb-16 gap-4"
      // style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      <div className="ml-2 md:ml-0">
        {isPending ? (
          <SpinnerMini />
        ) : (
          <button
            className="flex items-center justify-center gap-2  text-gray-800 bg-gray-50 p-2 rounded hover:bg-gray-800 hover:text-gray-50 transition-colors duration-200"
            onClick={handleLogout}
          >
            <BiLogOut />
            Log out
          </button>
        )}
      </div>

      <div className="border flex flex-col items-center w-full h-[600px] p-4">
        <div className=" flex flex-col gap-2 w-full max-w-[600px] ">
          <DiaryForm />

          <Entries />
        </div>
      </div>
    </div>
  );
}
