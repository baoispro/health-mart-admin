import { Navigate, Outlet } from "react-router";
import Sidebar from "./SideBar";
import HeaderDashboard from "./HeaderDashboard";
import { ConfigProvider } from "antd";
import AuthGuard from "../guards/AuthGuard";
import { useAuthContext } from "~/contexts/AuthContext";

export default function MainLayout() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>; // 👈 hoặc spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex">
        <Sidebar />
        <section className="flex-1 py-5 pl-20">
          <HeaderDashboard />
          <ConfigProvider>
            {" "}
            {/* ✨ BỌC Ở ĐÂY */}
            <Outlet />
          </ConfigProvider>
        </section>
      </main>
    </div>
  );
}
