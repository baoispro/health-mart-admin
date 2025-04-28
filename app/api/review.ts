import axiosInstance from "~/libs/axios";

export const getAllReviews = async () => {
  const response = await axiosInstance.get("/review");
  return response.data;
};

//Cập nhập Visibility
export const updateReview = async (id: number, data: Partial<{ isHidden: boolean }>) => {
  const response = await axiosInstance.put(`/review/${id}`, data);
  return response.data;
};

// Thêm phản hồi vào một đánh giá cụ thể
export const addReplyToReview = async (
  reviewId: number,
  data: { staffId: number; replyText: string }
) => {
  const response = await axiosInstance.post(`/review/reply`, { reviewId, ...data });
  return response.data;
};

// Cập nhật phản hồi của một đánh giá cụ thể
export const updateReply = async (
  replyId: number,
  data: { replyText: string }
) => {
  const response = await axiosInstance.put(`/review/reply/${replyId}`, data);
  return response.data;
};