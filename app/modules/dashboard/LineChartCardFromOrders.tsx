"use client";

import { Chart, registerables, type ChartOptions } from "chart.js";
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { NumberCountUp } from "~/utils/number-count-up";

Chart.register(...registerables);

const chartOptions: ChartOptions<"line"> = {
  layout: { padding: { top: 30, right: 15, left: 5 } },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true, mode: "index", intersect: false },
  },
  scales: {
    y: {
      border: { dash: [6], dashOffset: 6 },
      grid: { display: true, color: "rgba(0, 0, 0, .2)" },
      ticks: {
        display: true,
        color: "#8C8C8C",
        font: { size: 14, weight: 600, lineHeight: 1.8 },
        callback: (tickValue: string | number) => {
          const value =
            typeof tickValue === "number" ? tickValue : parseFloat(tickValue);
          return `${(value / 1_000_000).toFixed(1)}tr`;
        },
      },
    },
    x: {
      grid: { display: false },
      ticks: {
        display: true,
        color: "#8C8C8C",
        font: { size: 14, weight: 600, lineHeight: 1.5 },
      },
    },
  },
};

const labels = [
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T8",
  "T9",
  "T10",
  "T11",
  "T12",
];

export function LineChartCardFromOrders({ orders }: { orders: any[] }) {
  const completedOrders = useMemo(
    () => orders.filter((o) => o.order_status === "COMPLETED"),
    [orders]
  );

  const doanhThuDichVu = useMemo(() => {
    const data = Array(12).fill(0);
    for (const order of completedOrders) {
      const month = dayjs(order.created_at).month(); // 0-based
      data[month] += Number(order.final_price);
    }
    return data;
  }, [completedOrders]);

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Tổng doanh thu",
          tension: 0.3,
          pointRadius: 0,
          borderColor: "#1890FF",
          borderWidth: 3,
          data: doanhThuDichVu,
          maxBarThickness: 6,
        },
      ],
    }),
    [doanhThuDichVu]
  );

  return (
    <>
      <div className="flex flex-row justify-between pb-8">
        <div className="pl-2">
          <p className="text-[#141414] text-base font-bold">
            Tổng quan doanh số
          </p>
          <p className="text-[#8c8c8c] text-sm font-semibold">
            So với tuần trước
            <span className="text-sm font-bold ml-2 text-[#52c41a]">
              +{NumberCountUp({ value: 12 })}%
            </span>
          </p>
        </div>

        <div className="flex flex-row items-center gap-2 pr-2">
          <div className="h-1 w-5 bg-[#1890ff] rounded-md" />
          <p className="text-[#8c8c8c] text-sm font-semibold">Doanh thu</p>
        </div>
      </div>

      <div className="rounded-xl w-full relative" style={{ height: "310px" }}>
        <div className="absolute inset-0">
          <Line options={chartOptions} data={data} />
        </div>
      </div>
    </>
  );
}
