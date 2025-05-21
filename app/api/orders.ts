import axiosInstance from "~/libs/axios";

export const getAllOrders = async () => {
  const response = await axiosInstance.get("/orders");
  return response.data?.data || [];
};
