import { useEffect } from "react";
import { useAuth } from "~/hooks/useAuth";
import { useNavigate, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Nếu chưa login và không ở login
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return <>{children}</>;
}
