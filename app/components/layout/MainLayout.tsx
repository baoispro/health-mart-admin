// app/components/layout/MainLayout.tsx
import { Outlet } from "react-router";
import Sidebar from "./SideBar";
import HeaderDashboard from "./HeaderDashboard";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex">
        <Sidebar />
        <section className="flex-1 py-5 pl-20">
          <HeaderDashboard />
          <Outlet />
        </section>
      </main>
    </div>
  );
}
