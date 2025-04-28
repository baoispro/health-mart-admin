import axiosInstance from "~/libs/axios";

export const loginAPI = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/login", payload);
  return res.data;
};

export const refreshTokenService = async (refreshToken: string) => {
  const res = await axiosInstance.post("/auth/refresh-token", {
    refreshToken,
  });
  return res.data;
};

export const logoutAPI = async (payload: { userId: string }) => {
  const res = await axiosInstance.post("/auth/logout", payload);
  return res.data;
};
