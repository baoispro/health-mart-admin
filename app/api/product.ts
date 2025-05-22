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
  const res = await axiosInstance.post(`/product/ingredients`, sideEffects);
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
  const res = await axiosInstance.put(`/product/${id}`, payload);
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
  const res = await axiosInstance.put(`/product/ingredients/${id}`, payload);
  return res.data;
};

export const getProductUsagesById = async (id: number) => {
  const res = await axiosInstance.get(`/product/${id}/usage`);
  return res.data;
};

export const updateProductUsagesById = async (
  productId: number,
  payload: any
) => {
  const usages = (await getProductUsagesById(productId))?.data;
  if (!usages || usages.length === 0) return null;
  const usageId = usages[0].usage_id;
  const putRes = await axiosInstance.put(`/product/usages/${usageId}`, payload);
  return putRes.data;
};

export const getProductDosagesById = async (id: number) => {
  const res = await axiosInstance.get(`/product/${id}/dosages`);
  return res.data;
};

export const updateProductDosagesById = async (
  productId: number,
  payload: any
) => {
  const dosages = (await getProductDosagesById(productId))?.data;
  if (!dosages || dosages.length === 0) return null;
  const dosageId = dosages[0].dosage_id;
  const putRes = await axiosInstance.put(
    `/product/dosages/${dosageId}`,
    payload
  );
  return putRes.data;
};

export const getProductPrecautionsById = async (id: number) => {
  const res = await axiosInstance.get(`/product/${id}/precautions`);
  return res.data;
};

export const updateProductPrecautionsById = async (
  productId: number,
  payload: any
) => {
  const precautions = (await getProductPrecautionsById(productId))?.data;
  if (!precautions || precautions.length === 0) return null;
  const precautionId = precautions[0].precaution_id;
  const putRes = await axiosInstance.put(
    `/product/precautions/${precautionId}`,
    payload
  );
  return putRes.data;
};

export const getProductSideEffectsById = async (id: number) => {
  const res = await axiosInstance.get(`/product/${id}/side-effects`);
  return res.data;
};

export const updateProductSideEffectsById = async (
  productId: number,
  payload: { description: string }
) => {
  const sideEffects = (await getProductSideEffectsById(productId))?.data;

  if (!sideEffects || sideEffects.length === 0) {
    return null;
  }

  const sideEffectId = sideEffects[0].side_effect_id;

  const putRes = await axiosInstance.put(
    `/product/side-effects/${sideEffectId}`,
    payload
  );

  return putRes.data;
};

export const getProductStoragesById = async (id: number) => {
  const res = await axiosInstance.get(`/product/${id}/storage`);
  return res.data;
};

export const updateProductStoragesById = async (
  productId: number,
  payload: any
) => {
  const storages = (await getProductStoragesById(productId))?.data;
  if (!storages || storages.length === 0) return null;
  const storageId = storages[0].storage_id;
  const putRes = await axiosInstance.put(
    `/product/storages/${storageId}`,
    payload
  );
  return putRes.data;
};

export const deleteProductById = async (id: number) => {
  const res = await axiosInstance.delete(`/product/${id}`);
  return res.data;
};
