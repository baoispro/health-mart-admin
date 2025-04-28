import axiosInstance from "~/libs/axios";

export const getAllProducts = async () => {
  const response = await axiosInstance.get("/product");
  return response.data?.data || [];
};

export const createProduct = async (payload: any) => {
  const isFormData = payload instanceof FormData;

  const res = await axiosInstance.post("/product", payload, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
  });

  return res.data;
};

export const getAllCategories = async () => {
  const res = await axiosInstance.get("/product/categories");
  return res.data?.data || [];
};

export const createCategory = async (payload: any) => {
  const res = await axiosInstance.post("/product/category", payload);
  return res.data;
};

export const getCategoryById = async (id: number) => {
  const res = await axiosInstance.get(`/product/category/${id}`);
  return res.data;
};
export const updateCategory = async (id: number, payload: any) => {
  const res = await axiosInstance.put(`/product/category/${id}`, payload);
  return res.data;
};

export const createIngredients = async (sideEffects: any) => {
  const res = await axiosInstance.post(`/product/side-effects`, sideEffects);
  return res.data;
};

export const createUsages = async (usages: any) => {
  const res = await axiosInstance.post(`/product/usages`, usages);
  return res.data;
};

export const createDosages = async (dosages: any) => {
  const res = await axiosInstance.post(`/product/dosages`, dosages);
  return res.data;
};

export const createPrecautions = async (precautions: any) => {
  const res = await axiosInstance.post(`/product/precautions`, precautions);
  return res.data;
};

export const createStorages = async (storages: any) => {
  const res = await axiosInstance.post(`/product/storages`, storages);
  return res.data;
};

export const createSideEffects = async (sideEffects: any) => {
  const res = await axiosInstance.post(`/product/side-effects`, sideEffects);
  return res.data;
};

export const updateProductById = async (id: number, payload: any) => {
  const res = await axiosInstance.post(`/product/${id}`, payload);
  return res.data;
};

export const getProductById = async (id: number) => {
  const res = await axiosInstance.get(`/product/${id}`);
  return res.data;
};

export const getProductIngredientsById = async (id: number) => {
  const res = await axiosInstance.get(`/product/${id}/ingredients`);
  return res.data;
};

export const updateProductIngredientsById = async (
  id: number,
  payload: any
) => {
  const res = await axiosInstance.post(`/product/${id}/ingredients`, payload);
  return res.data;
};

export const getProductUsagesById = async (id: number) => {
  const res = await axiosInstance.get(`/product/${id}/usages`);
  return res.data;
};

export const updateProductUsagesById = async (id: number, payload: any) => {
  const res = await axiosInstance.post(`/product/${id}/usages`, payload);
  return res.data;
};

export const getProductDosagesById = async (id: number) => {
  const res = await axiosInstance.get(`/product/${id}/dosages`);
  return res.data;
};

export const updateProductDosagesById = async (id: number, payload: any) => {
  const res = await axiosInstance.post(`/product/${id}/dosages`, payload);
  return res.data;
};

export const getProductPrecautionsById = async (id: number) => {
  const res = await axiosInstance.get(`/product/${id}/precautions`);
  return res.data;
};

export const updateProductPrecautionsById = async (
  id: number,
  payload: any
) => {
  const res = await axiosInstance.post(`/product/${id}/precautions`, payload);
  return res.data;
};

export const getProductSideEffectsById = async (id: number) => {
  const res = await axiosInstance.get(`/product/${id}/side-effects`);
  return res.data;
};

export const updateProductSideEffectsById = async (
  id: number,
  payload: any
) => {
  const res = await axiosInstance.post(`/product/${id}/side-effects`, payload);
  return res.data;
};

export const getProductStoragesById = async (id: number) => {
  const res = await axiosInstance.get(`/product/${id}/storages`);
  return res.data;
};

export const updateProductStoragesById = async (id: number, payload: any) => {
  const res = await axiosInstance.post(`/product/${id}/storages`, payload);
  return res.data;
};

export const deleteProductById = async (id: number) => {
  const res = await axiosInstance.delete(`/product/${id}`);
  return res.data;
};
