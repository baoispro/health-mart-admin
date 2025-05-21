"use client";
import { Table, Card, Statistic, Input, Space, Row, Typography } from "antd";
import { CalendarCog, CircleDollarSign } from "lucide-react";
import { useMemo, useState } from "react";
import { StatisticCard } from "~/components/StatisticCard";
import { LineChartCardFromOrders } from "./LineChartCardFromOrders";
const { Title, Text } = Typography;

export default function DashboardOrders({ orders }: { orders: any[] }) {
  const completedOrders = useMemo(
    () => orders.filter((order) => order.order_status === "COMPLETED"),
    [orders]
  );

  const totalRevenue = completedOrders.reduce(
    (sum, o) => sum + Number(o.final_price),
    0
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 70,
    },
    {
      title: "Người nhận",
      dataIndex: ["shippingAddress", "recipientName"],
      render: (text: string) => text || "Không có",
    },
    {
      title: "Thành tiền",
      dataIndex: "final_price",
      render: (price: string) => Number(price).toLocaleString("vi-VN") + "₫",
    },
    {
      title: "Tỉnh/TP",
      dataIndex: ["shippingAddress", "city"],
    },
    {
      title: "Thời gian",
      dataIndex: "created_at",
      render: (text: string) => new Date(text).toLocaleString("vi-VN"),
    },
  ];
  return (
    <Space direction="vertical" style={{ width: "100%", padding: "20px" }}>
      <div className="flex flex-col gap-4 pb-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatisticCard
            title="Số đơn hoàn tất"
            value={completedOrders.length}
            icon={<CalendarCog color="white" />}
          />
          <StatisticCard
            title="Tổng doanh thu"
            value={totalRevenue}
            icon={<CircleDollarSign color="white" />}
          />
        </div>
      </div>
      <LineChartCardFromOrders orders={orders} />

      <div className="mt-2">
        <div className="mb-3">
          <Title level={3}>Danh sách các đơn được đặt</Title>
        </div>

        <Table
          rowKey="id"
          className="pt-4"
          columns={columns}
          dataSource={completedOrders}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </Space>
  );
}
