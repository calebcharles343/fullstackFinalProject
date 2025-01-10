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
    <div className="flex flex-col h-screen bg-gradient-to-br from-rose-600 to-gray-900 font-roboto tracking-wide">
      <header className="flex items-center justify-between bg-white shadow-md border-b-2 border-teal-500 px-4 py-2 top-0 z-10">
        <div className="container mr-auto">
          <h1 className="text-xl font-bold text-teal-600">My Diary App</h1>
        </div>
        <div className="flex justify-center items-center h-10  w-[115px] m border ml-2 md:ml-0 shadow-lg hover:bg-gray-800 hover:text-gray-50 transition-colors duration-200">
          {isPending ? (
            <SpinnerMini />
          ) : (
            <button
              className="w-full h-full text-sm flex justify-center items-center gap-1 p-1 md:p-2 rounded "
              onClick={handleLogout}
            >
              <BiLogOut />
              Log out
            </button>
          )}
        </div>
      </header>
      <main className="h-full text-white overflow-y-scroll  ">
        <Outlet />
      </main>
      <footer className="border-t-2 border-teal-500 bg-white text-center py-4 mt-auto">
        <p className="text-gray-800">
          &copy; 2025 My Diary App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
