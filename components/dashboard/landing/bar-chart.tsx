"use client";
import { tradeModels } from "@/models/trade";
import { Skeleton } from "@heroui/react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Rectangle,
  ReferenceLine,
} from "recharts";

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${day}`;
}

export const DashboardBarChart: React.FC = () => {
  const { data: dailyPnl, isFetched } = tradeModels.dailyPnl.useQuery();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary/65 p-4 rounded-lg ">
          <p className="font-semibold text-white mb-2">
            {payload?.[0]?.payload?.day?.split("T")?.[0]}
          </p>

          <div className="flex items-center gap-2">
            <p className="text-white">PNL:</p>
            <p className="text-white">
              {Number(payload?.[0]?.payload?.pnl)?.toFixed(6)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Skeleton isLoaded={isFetched} className="rounded-lg">
      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={dailyPnl?.data
          ?.map((item) => ({
            time: formatTime(item?.day),
            day: item?.day,
            pnl: item?.realized_pnl,
          }))
          .reverse()}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis width="auto" />
        <ReferenceLine y={0} stroke="#cacaca" />
        <Tooltip content={<CustomTooltip />} />

        <Bar
          dataKey="pnl"
          shape={({ pnl, ...props }: any) => (
            <Rectangle {...props} fill={pnl < 0 ? "#d22d2d" : "#4b9989"} />
          )}
        />
      </BarChart>
    </Skeleton>
  );
};
