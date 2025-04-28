import { createContext, useContext, useEffect, useState } from "react";
import { logoutAPI } from "~/api/auth";

interface AuthUser {
  username: string;
  accessToken: string;
  refreshToken: string;
  userId: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setAccessToken: (token: string) => void;
  loading: boolean; // 👈 thêm trạng thái loading
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true); // 👈 ban đầu loading = true

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false); // 👈 đọc xong thì mới tắt loading
  }, []);

  const login = (user: AuthUser) => {
    setUser(user);
    localStorage.setItem("auth_user", JSON.stringify(user));
  };

  const logout = async () => {
    if (user) {
      try {
        await logoutAPI({ userId: user.userId.toString() });
      } catch (error) {
        console.error("Logout API failed", error);
      }
    }
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  const setAccessToken = (token: string) => {
    if (user) {
      const updated = { ...user, accessToken: token };
      setUser(updated);
      localStorage.setItem("auth_user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        setAccessToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
};
