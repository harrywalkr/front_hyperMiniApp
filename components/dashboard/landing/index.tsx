"use client";

import { useHelperProvider } from "@/app/helperProvider";
import { Back } from "@/common";
import { NavigationBar } from "@/common/navigation-bar";
import { TableLoading } from "@/core/components";
import { thousandSeperator } from "@/core/utils";
import { positionsModels } from "@/models/positions";
import { tradeModels } from "@/models/trade";
import { userModels } from "@/models/user";
import {
  Button,
  Divider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Settings, TrendingUp, Users, X } from "lucide-react";
import Link from "next/link";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  {
    name: "A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

export const DashboardLanding: React.FC = () => {
  const { data, isFetching } = positionsModels.getOpenPositions.useQuery();

  const { aboutMe } = useHelperProvider();

  const { data: tradeBalance } = tradeModels.tradeBalance.useQuery();

  return (
    <div className="flex flex-col gap-y-6">
      <Back
        title="Dashboard"
        endContent={
          <Link href="/dashboard/settings">
            <Button variant="light" isIconOnly radius="full">
              <Settings size={22} strokeWidth={1.6} />
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-default-50 rounded-lg p-4">
          <p className="font-medium text-foreground/85 mb-1">Balance</p>

          <p className="text-lg text-center font-medium">
            ${thousandSeperator(Number(tradeBalance?.available).toFixed(2))}
          </p>
        </div>

        <div className="bg-default-50 rounded-lg p-4">
          <p className="font-medium text-foreground/85 mb-1">Profit</p>

          <p className="text-lg text-center font-medium">-</p>
        </div>
      </div>

      <div className="w-full max-w-full h-60">
        <LineChart
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "240px",
            aspectRatio: 1.618,
          }}
          responsive
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis width="auto" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="pv"
            stroke="#4b9989"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>

      {/* <div className="flex flex-col gap-y-4">
        <Switch
          size="sm"
          className="justify-between! w-full flex-row-reverse flex max-w-auto grow"
        >
          Profit per Trader
        </Switch>

        <Switch
          size="sm"
          className="justify-between! w-full flex-row-reverse flex max-w-auto grow"
        >
          Daily/Weekly ROP Avg.
        </Switch>

        <Switch
          size="sm"
          className="justify-between! w-full flex-row-reverse flex max-w-auto grow"
        >
          Success Rate
        </Switch>
      </div> */}

      <div className="w-full flex flex-col gap-y-1 bg-primary/15 p-4 rounded-lg">
        <div className="flex items-center gap-x-1">
          <span className="font-semibold text-foreground/95">
            Address Tracking:
          </span>
          <span>{aboutMe?.addresses?.length ?? "-"}</span>
        </div>

        <div className="flex items-center gap-x-1">
          <span className="font-semibold text-foreground/95">Threshold:</span>
          <span>
            {aboutMe?.prefs?.threshold
              ? `$${thousandSeperator(aboutMe?.prefs?.threshold)}`
              : "-"}
          </span>
        </div>

        <div className="flex items-center gap-x-1">
          <span className="font-semibold text-foreground/95">Opens Today:</span>
          <span>
            {aboutMe?.eligibility?.copy?.open_positions ?? "-"} / Remaining:{" "}
            {aboutMe?.copy?.settings?.max_daily_positions ?? "-"}
          </span>
        </div>

        <Divider className="my-3 w-full bg-default-500 h-px" />

        <div className="flex items-center gap-x-1">
          <span className="font-semibold text-foreground/95">Bot:</span>
          <span>0 / Not-Bot: 2</span>
        </div>

        <div className="flex items-center gap-x-1">
          <span className="font-semibold text-foreground/95">Bot Alerts:</span>
          <span>{aboutMe?.prefs?.alerts ? "ON" : "OFF"}</span>
        </div>

        <div className="flex items-center gap-x-1">
          <span className="font-semibold text-foreground/95">Exchange:</span>
          <span>{aboutMe?.copy?.exchange ?? "-"}</span>
        </div>

        <div className="flex items-center gap-x-1">
          <span className="font-semibold text-foreground/95">
            Token Filter:
          </span>
          <span>{aboutMe?.prefs?.filter ?? "-"}</span>
        </div>
      </div>

      <div className="w-full max-w-full">
        <Table
          shadow="none"
          classNames={{
            wrapper: "bg-transparent border-none px-0",
            td: "bg-primary-50 text-xs first:rounded-l-full last:rounded-r-full",
            th: "bg-transparent",

            table: "border-separate border-spacing-y-2",
          }}
        >
          <TableHeader>
            <TableColumn>Position</TableColumn>
            <TableColumn>Side</TableColumn>
            <TableColumn>Size</TableColumn>
            <TableColumn>PnL</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>

          <TableBody
            isLoading={isFetching}
            emptyContent={"No Open positions yet!"}
            loadingContent={<TableLoading />}
          >
            {!data?.length
              ? []
              : data?.map((item) => {
                  return (
                    <TableRow key={item?.positionId}>
                      <TableCell>{item?.symbol}</TableCell>
                      <TableCell
                        className={
                          item?.side === "BUY" ? "text-primary" : "text-danger"
                        }
                      >
                        {item?.side}
                      </TableCell>
                      <TableCell>{item?.qty}</TableCell>
                      <TableCell
                        className={
                          item?.unrealizedPNL > 0
                            ? "text-primary"
                            : "text-danger"
                        }
                      >
                        {item?.unrealizedPNL}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="light"
                          size="sm"
                          isIconOnly
                          radius="full"
                          color="danger"
                        >
                          <X size={19} strokeWidth={1.6} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>

        <div className="flex justify-end">
          <Link
            className="font-medium text-primary"
            href="/dashboard/following-addresses"
          >
            See All
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Link href="/dashboard/following-address">
          <Button
            fullWidth
            variant="ghost"
            radius="full"
            color="primary"
            startContent={<Users size={19} strokeWidth={1.6} />}
          >
            My Followed Traders
          </Button>
        </Link>

        <Link href="/dashboard/addresses">
          <Button
            fullWidth
            variant="ghost"
            radius="full"
            color="primary"
            startContent={<TrendingUp size={19} strokeWidth={1.6} />}
          >
            Browse Traders
          </Button>
        </Link>
      </div>

      <NavigationBar />
    </div>
  );
};
