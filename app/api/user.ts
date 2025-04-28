import axiosInstance from "~/libs/axios";

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/user");
  return response.data?.data || [];
};

export const getUserById = async (id: number) => {
  const response = await axiosInstance.get(`/user/${id}`);
  return response.data;
};

export const createUser = async (userData: Record<string, any>) => {
  const response = await axiosInstance.post("/user/register", userData);
  return response.data;
};

export const updateUser = async (id: number, userData: Record<string, any>) => {
  const response = await axiosInstance.put(`/user/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete(`/user/${id}`);
  return response.data;
};
