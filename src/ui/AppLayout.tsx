import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div
      className="h-screen bg-teal-500  overflow-y-scroll"
      style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      <Outlet />
    </div>
  );
}
