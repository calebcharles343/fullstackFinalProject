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
    <div className="h-screen bg-gradient-to-r from-teal-400 to-blue-500 overflow-y-scroll font-roboto tracking-wide">
      <header className="flex items-center \  justify-between bg-white shadow-md sticky px-4 py-2 top-0 z-10">
        <div className="container mx-auto ">
          <h1 className="text-xl font-bold text-teal-600">My Diary App</h1>
        </div>
        <div className="ml-2 md:ml-0">
          {isPending ? (
            <SpinnerMini />
          ) : (
            <button
              className="border flex w-[100px] items-center justify-center gap-2  text-gray-800  p-2 rounded hover:bg-gray-800 hover:text-gray-50 transition-colors duration-200"
              onClick={handleLogout}
            >
              <BiLogOut />
              Log out
            </button>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-white text-center py-4 mt-auto">
        <p className="text-gray-600">
          &copy; 2025 My Diary App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
