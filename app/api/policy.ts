import axiosInstance from "~/libs/axios";

export const getAllPolicies = async () => {
  const response = await axiosInstance.get("/policies");
  return response.data?.data || [];
};

export const getPolicyBySlug = async (slug: string) => {
  const response = await axiosInstance.get(`/policies/${slug}`);
  return response.data;
};

export const createPolicy = async (policyData: { slug: string; title: string; content: string }) => {
  const response = await axiosInstance.post("/policies", policyData);
  return response.data;
};

export const updatePolicy = async (slug: string, policyData: { title: string; content: string }) => {
  const response = await axiosInstance.put(`/policies/${slug}`, policyData);
  return response.data;
};

export const deletePolicy = async (slug: string) => {
  const response = await axiosInstance.delete(`/policies/${slug}`);
  return response.data;
};