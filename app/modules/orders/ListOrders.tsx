import { useEffect, useState } from "react";
import { Table, Button, Space, Typography, message, Form, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { getAllOrders } from "~/api/orders";
import { formatCurrency } from "~/libs/helper";

const { Title, Text } = Typography;

export default function ListOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      message.error("Lỗi khi tải danh sách chính sách");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Người đặt hàng",
      dataIndex: ["user", "fullName"],
      key: "user",
    },
    {
      title: "Tiền",
      dataIndex: "total_price",
      key: "total_price",
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "Tổng tiền",
      dataIndex: "final_price",
      key: "final_price",
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "Loại vận chuyển",
      dataIndex: "ship_method",
      key: "ship_method",
      render: (value) => {
        const color = value === "HOME_DELIVERY" ? "blue" : "green";
        const label =
          value === "HOME_DELIVERY"
            ? "Giao tận nhà"
            : value === "PICK_UP"
            ? "Nhận tại cửa hàng"
            : value;
        return <Tag color={color}>{label}</Tag>;
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "order_status",
      key: "order_status",
      render: (status) => {
        const statusMap: Record<string, { color: string; label: string }> = {
          PENDING: { color: "default", label: "Chờ xử lý" },
          CONFIRMED: { color: "cyan", label: "Đã xác nhận" },
          PROCESSING: { color: "blue", label: "Đang xử lý" },
          SHIPPING: { color: "geekblue", label: "Đang giao hàng" },
          DELIVERED: { color: "lime", label: "Đã giao hàng" },
          COMPLETED: { color: "green", label: "Hoàn thành" },
          CANCELLED: { color: "red", label: "Đã hủy" },
          FAILED: { color: "volcano", label: "Thất bại" },
          REFUNDED: { color: "purple", label: "Đã hoàn tiền" },
          DELETED: { color: "magenta", label: "Đã xóa" },
        };

        const { color, label } = statusMap[status] || {
          color: "default",
          label: status,
        };
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="mb-6">
        <Title level={3}>Đơn hàng</Title>
        <Text type="secondary">Danh sách đơn đặt hàng</Text>
      </div>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={orders}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
}
