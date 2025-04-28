import { useEffect, useState } from "react";
import { Button, Space, Typography, message, Modal, Form, Input, Rate, Switch } from "antd";
import { EditOutlined, EyeOutlined, EyeInvisibleOutlined, MessageOutlined } from "@ant-design/icons";
import { getAllReviews, updateReview, addReplyToReview, updateReply } from "~/api/review";
import { Tooltip } from "antd";
import { Table, type TableColumnsType } from 'antd';


const { Title } = Typography;

interface Review {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
  isHidden: boolean;
  createdAt: string;
  images: { id: number; img_url: string }[];
  replies: { id: number; staffId: number; replyText: string; createdAt: string }[];
}

export default function ListReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState<number | null>(null);
  const [currentReplyId, setCurrentReplyId] = useState<number | null>(null);
  const [replyForm] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getAllReviews();
      setReviews(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      message.error("Lỗi khi tải danh sách đánh giá");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReply = async () => {
    try {
      const values = await replyForm.validateFields();
      if (currentReviewId) {
        await addReplyToReview(currentReviewId, {
          staffId: 1,
          replyText: values.replyText,
        });
        message.success("Phản hồi đã được thêm");
        fetchReviews();
      }
      setIsReplyModalOpen(false);
      replyForm.resetFields();
    } catch (error) {
      message.error("Lỗi khi thêm phản hồi");
    }
  };

  // const handleAddReply = async () => {
  //   try {
  //     const values = await replyForm.validateFields();
  //     if (currentReviewId) {
  //       // Lấy staffId từ thông tin người dùng hiện tại
  //       const staffId = JSON.parse(localStorage.getItem("user") || "{}").staffId;
  //       if (!staffId) {
  //         message.error("Không thể xác định nhân viên hiện tại");
  //         return;
  //       }

  //       // Gọi API thêm phản hồi
  //       await addReplyToReview(currentReviewId, { ...values, staffId });
  //       message.success("Phản hồi đã được thêm");
  //       fetchReviews(); // Làm mới danh sách đánh giá
  //     }
  //     setIsReplyModalOpen(false); // Đóng modal
  //     replyForm.resetFields(); // Reset form
  //   } catch (error) {
  //     message.error("Lỗi khi thêm phản hồi");
  //   }
  // };

  const handleEditReply = async () => {
    try {
      const values = await replyForm.validateFields();
      if (currentReplyId) {
        await updateReply(currentReplyId, values);
        message.success("Cập nhật phản hồi thành công");
        fetchReviews();
      }
      setIsReplyModalOpen(false);
      replyForm.resetFields();
    } catch (error) {
      message.error("Lỗi khi cập nhật phản hồi");
    }
  };

  const handleToggleVisibility = async (id: number, isHidden: boolean) => {
    try {
      await updateReview(id, { isHidden: !isHidden });
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, isHidden: !isHidden } : review
        )
      );
      message.success(
        isHidden ? "Đánh giá đã được hiển thị" : "Đánh giá đã bị ẩn"
      );
    } catch (error) {
      message.error("Lỗi khi thay đổi trạng thái hiển thị");
    }
  };

  const columns: TableColumnsType<Review> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
      width: 150,
      filters: reviews
        .map((review) => ({ text: review.productId.toString(), value: review.productId }))
        .filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i), // Loại bỏ trùng lặp
        onFilter: (value, record) => record.productId === value,
      sorter: (a: Review, b: Review) => a.productId - b.productId, // Sắp xếp tăng dần/giảm dần
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      width: 150,
      filters: reviews
        .map((review) => ({ text: review.userId.toString(), value: review.userId }))
        .filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i), // Loại bỏ trùng lặp
        onFilter: (value, record) => record.userId === value,
      sorter: (a: Review, b: Review) => a.userId - b.userId, // Sắp xếp tăng dần/giảm dần
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
      width: 170,
      filters: [
        { text: "1 Star", value: 1 },
        { text: "2 Stars", value: 2 },
        { text: "3 Stars", value: 3 },
        { text: "4 Stars", value: 4 },
        { text: "5 Stars", value: 5 },
      ],
      onFilter: (value, record) => record.rating === value,
      sorter: (a: Review, b: Review) => a.rating - b.rating, // Sắp xếp tăng dần/giảm dần
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      ellipsis: true,
      width: 200,
      render: (_: string, record: { comment: string; createdAt: string }) => (
        <Tooltip title={record.comment} placement="topLeft">
          <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            <span>{record.comment}</span>
            <br />
            <small style={{ color: "gray" }}>{new Date(record.createdAt).toLocaleString()}</small>
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      width: 100,
      render: (images: { id: number; img_url: string }[]) =>
        images.map((img) => (
          <img
            key={img.id}
            src={img.img_url}
            alt="Review"
            style={{ width: 50, marginRight: 5, cursor: "pointer" }}
            onClick={() => {
              setPreviewImage(img.img_url);
              setIsPreviewOpen(true);
            }}
          />
        )),
    },
    {
      title: "Replies",
      dataIndex: "replies",
      key: "replies",
      width: 300,
      render: (replies: { id: number; replyText: string; createdAt: string }[]) =>
        replies.map((reply) => (
          <Tooltip
            key={reply.id}
            title={reply.replyText}
            placement="topLeft"
          >
            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              <span>{reply.replyText}</span>
              <br />
              <small style={{ color: "gray" }}>{new Date(reply.createdAt).toLocaleString()}</small>
            </div>
          </Tooltip>
        )),
    },
    {
      title: "Visibility",
      dataIndex: "isHidden",
      key: "isHidden",
      width: 100,
      render: (isHidden: boolean, record: Review) => (
        <Switch
          checked={!isHidden}
          checkedChildren={<EyeOutlined />}
          unCheckedChildren={<EyeInvisibleOutlined />}
          onChange={() => handleToggleVisibility(record.id, isHidden)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Review) => (
        <Space>
          {/* Nếu chưa có phản hồi, hiển thị nút Reply */}
          {record.replies.length === 0 && (
            <Button
              type="link"
              icon={<MessageOutlined />}
              onClick={() => {
                setCurrentReviewId(record.id);
                setIsReplyModalOpen(true);
              }}
            >
              Reply
            </Button>
          )}

          {/* Nếu đã có phản hồi, hiển thị nút Edit */}
          {record.replies.length > 0 && (
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                const reply = record.replies[0]; // Lấy phản hồi đầu tiên
                replyForm.setFieldsValue({ replyText: reply.replyText }); // Đặt giá trị vào form
                setCurrentReplyId(reply.id); // Lưu lại ID của phản hồi
                setIsReplyModalOpen(true); // Mở modal chỉnh sửa
              }}
            >
              Edit
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <Title level={3}>Reviews</Title>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={reviews}
        pagination={{ pageSize: 5 }}
        bordered
      />

      <Modal
        title={currentReplyId ? "Edit Reply" : "Add Reply"}
        open={isReplyModalOpen}
        onCancel={() => setIsReplyModalOpen(false)}
        onOk={currentReplyId ? handleEditReply : handleAddReply}
      >
        <Form form={replyForm} layout="vertical">
          <Form.Item
            name="replyText"
            label="Reply"
            rules={[{ required: true, message: "Phản hồi không được để trống" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={isPreviewOpen}
        footer={null}
        onCancel={() => setIsPreviewOpen(false)}
        centered
        style={{ textAlign: "center" }}
      >
        <img
          alt="Preview"
          style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain" }}
          src={previewImage || ""}
        />
      </Modal>
    </div>
  );
}