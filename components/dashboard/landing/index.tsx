"use client";

import { NavigationBar } from "@/common/navigation-bar";
import { thousandSeperator } from "@/core/utils";
import {
  Button,
  Checkbox,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Settings, TrendingUp, Users, X } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
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
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between mb-3">
        <p>Dashboard</p>
        <Button variant="light" isIconOnly radius="full">
          <Settings size={22} strokeWidth={1.6} />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-default-50 rounded-lg p-4">
          <p className="font-medium text-foreground/85 mb-1">Balance</p>

          <p className="text-lg text-center font-medium">
            ${thousandSeperator(145000)}
          </p>
        </div>

        <div className="bg-default-50 rounded-lg p-4">
          <p className="font-medium text-foreground/85 mb-1">Profit</p>

          <p className="text-lg text-center font-medium text-primary">
            +{thousandSeperator(145000, "%")}
          </p>
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
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis width="auto" />
          <Tooltip />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#4b9989"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>

      <div className="flex flex-col gap-y-4">
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

          <TableBody>
            <TableRow>
              <TableCell>BTCUSDT</TableCell>
              <TableCell className="text-primary">Buy</TableCell>
              <TableCell>17</TableCell>
              <TableCell className="text-primary">+0.35(+2.5%)</TableCell>
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

            <TableRow>
              <TableCell>BTCUSDT</TableCell>
              <TableCell className="text-danger">Sell</TableCell>
              <TableCell>17</TableCell>
              <TableCell className="text-danger">-0.35(-2.5%)</TableCell>
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

            <TableRow>
              <TableCell>BTCUSDT</TableCell>
              <TableCell className="text-primary">Buy</TableCell>
              <TableCell>17</TableCell>
              <TableCell className="text-primary">+0.35(+2.5%)</TableCell>
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

            <TableRow>
              <TableCell>BTCUSDT</TableCell>
              <TableCell className="text-danger">Sell</TableCell>
              <TableCell>17</TableCell>
              <TableCell className="text-danger">-0.35(-2.5%)</TableCell>
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
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Button
          fullWidth
          variant="ghost"
          radius="full"
          color="primary"
          startContent={<Users size={19} strokeWidth={1.6} />}
        >
          My Followed Traders
        </Button>

        <Button
          fullWidth
          variant="ghost"
          radius="full"
          color="primary"
          startContent={<TrendingUp size={19} strokeWidth={1.6} />}
        >
          Browse Traders
        </Button>
      </div>

      <NavigationBar />
    </div>
  );
};
