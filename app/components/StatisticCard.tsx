import { Statistic } from "antd";

export interface StatisticCardProps {
  title?: string;
  value?: number;
  icon?: React.ReactNode;
}

export const StatisticCard = ({ title, value, icon }: StatisticCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg border-[0.5px] border-gray-200 shadow-gray-200 shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex flex-row items-center justify-between h-full">
        <Statistic
          title={<p className="text-base mb-1">{title}</p>}
          value={value}
          className="font-semibold text-[#8c8c8c] pb-1 leading-[1.3125rem]"
          valueStyle={{
            fontSize: "1.875rem",
            color: "#141414",
            lineHeight: "30px",
            fontWeight: 700,
          }}
        />

        {icon && (
          <div className="w-12 h-12 bg-[#2e73e3] rounded-lg flex items-center justify-center text-xl self-center drop-shadow-lg shadow-gray-200">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
