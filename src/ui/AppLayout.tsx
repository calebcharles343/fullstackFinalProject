import { Outlet } from "react-router-dom";
import { useLogout } from "../features/authenticaton/useLogout";
import SpinnerMini from "./SpinnerMini";
import { BiLogOut } from "react-icons/bi";

export default function AppLayout() {
  const { logout, isPending } = useLogout();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div
      className="flex flex-col h-screen bg-gradient-to-br from-[#DC3340] to-gray-950 font-roboto tracking-wide"
      style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      <header className="flex items-center justify-between bg-white shadow-md border-b-[3.5px] border-[#052859] px-2  md:px-4 py-2 top-0 z-10">
        <div className="container flex items-center gap-2 mr-auto ">
          <div
            className="flex items-center justify-center h-11 w-11 border-2 
          p-2 bg-[#DC3340] text-white rounded-full"
          >
            <span className="text-[8px] font-extrabold">TUNGA</span>
          </div>
          <h1
            className="text-lg md:text-xl font-bold text-[#052859]"
            style={{ fontFamily: "Poppins", letterSpacing: "0.8px" }}
          >
            <span className="md:hidden">DEV</span>{" "}
            <span className="hidden md:inline">DEVELOPER</span> DIARY
          </h1>
        </div>
        <div className="flex justify-center items-center h-10 w-[115px] border ml-2 md:ml-0 shadow-lg hover:bg-gray-800 hover:text-gray-50 transition-colors duration-200">
          {isPending ? (
            <SpinnerMini />
          ) : (
            <button
              className="w-full h-full text-sm flex justify-center items-center gap-1 p-1 md:p-2 rounded"
              onClick={handleLogout}
            >
              <BiLogOut />
              Log out
            </button>
          )}
        </div>
      </header>
      <main className="flex-grow text-white overflow-y-scroll">
        <Outlet />
      </main>
      <footer className="border-t-[3.5px] border-[#052859] bg-white text-center py-4 mt-auto">
        <p className="text-[#052859] text-sm md:text-base">
          &copy; 2025 Tunga <span className="md:hidden">Dev</span>{" "}
          <span className="hidden md:inline">Developer</span> Diary. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
