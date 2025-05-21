// app/dashboard/page.tsx (Client Component)
"use client";

import { useEffect, useState } from "react";
import DashboardOrders from "./DashboardOrders";
import { getAllOrders } from "~/api/orders";

export default function DashboardHome() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getAllOrders();
      setOrders(res);
    };

    fetchOrders();
  }, []);

  return <DashboardOrders orders={orders} />;
}
