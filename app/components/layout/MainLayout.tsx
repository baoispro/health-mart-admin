import { Navigate, Outlet } from "react-router";
import Sidebar from "./SideBar";
import HeaderDashboard from "./HeaderDashboard";
import { ConfigProvider } from "antd";
import { useAuthContext } from "~/contexts/AuthContext";
import { ToastContainer } from "react-toastify";

export default function MainLayout() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        style={{ zIndex: 9999 }} // ✅ đảm bảo nó nổi lên trên
      />

      <main className="flex">
        <Sidebar />
        <section className="flex-1 py-5 pl-20">
          <HeaderDashboard />
          <ConfigProvider>
            <Outlet />
          </ConfigProvider>
        </section>
      </main>
    </div>
  );
}
