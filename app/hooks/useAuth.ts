import { useAuthContext } from "~/contexts/AuthContext";

export const useAuth = () => {
  const context = useAuthContext();

  return {
    user: context.user,
    login: context.login,
    logout: context.logout,
    isAuthenticated: context.isAuthenticated,
    setAccessToken: context.setAccessToken,
  };
};
