import { useEffect } from "react";
import { useAuth } from "~/hooks/useAuth";
import { useNavigate, useLocation } from "react-router";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Nếu chưa login và không ở sign-in
      if (location.pathname !== "/sign-in") {
        navigate("/sign-in");
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return <>{children}</>;
}
