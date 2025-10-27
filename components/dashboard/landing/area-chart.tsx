"use client";

import { tradeModels } from "@/models/trade";
import { Skeleton } from "@heroui/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${day}`;
}

export const DashboardAreaChart: React.FC = () => {
  const { data: tradeHistory, isFetched } = tradeModels.balanceHistory.useQuery(
    {
      variables: { limit: 50 },
    }
  );
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary/65 p-4 rounded-lg ">
          <p className="font-semibold text-white mb-2">
            {payload?.[0]?.payload?.fullTime?.split("T")?.[0]}
          </p>

          <div className="flex items-center gap-2">
            <p className="text-white">Equity:</p>
            <p className="text-white">
              {Number(payload?.[0]?.payload?.equity)?.toFixed(6)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Skeleton isLoaded={isFetched} className="rounded-lg">
      <AreaChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={tradeHistory?.data
          ?.map((item) => ({
            time: formatTime(item?.taken_at),
            fullTime: item?.taken_at,
            equity: item?.equity_est,
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
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="equity"
          stroke="#4b9989"
          fill="#4b9989"
        />
      </AreaChart>
    </Skeleton>
  );
};
