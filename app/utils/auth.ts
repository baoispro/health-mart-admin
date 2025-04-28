export const getRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("auth_user") || "{}");
  return user?.refreshToken;
};

export const setAccessToken = (token: string) => {
  const stored = localStorage.getItem("auth_user");
  if (stored) {
    const parsed = JSON.parse(stored);
    parsed.accessToken = token;
    localStorage.setItem("auth_user", JSON.stringify(parsed));
  }
};

export const logout = () => {
  localStorage.removeItem("auth_user");
};
