"use client";

import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Copy, Minus, Plus, TrendingUp, Users } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { WalletCardProps } from "./types";

type Point = { x: number; y: number };

const defaultData: Point[] = [
  { x: 0, y: 35 },
  { x: 1, y: 30 },
  { x: 2, y: 26 },
  { x: 3, y: 28 },
  { x: 4, y: 35 },
  { x: 5, y: 40 },
  { x: 6, y: 53 },
];

export const WalletCard: React.FC<WalletCardProps> = ({ isFollowed }) => {
  return (
    <Card shadow="none" className="bg-default-50" radius="md">
      <CardHeader className="justify-between">
        <p className="font-semibold capitalize text-lg">Wallet Address</p>

        <Button radius="full" isIconOnly variant="light">
          {isFollowed ? <Minus /> : <Plus />}
        </Button>
      </CardHeader>

      <CardBody className="gap-3">
        <div className="flex items-center gap-2">
          <p>bzxca1xx...3dja911oasd</p>
          <Copy size={17} />
        </div>

        <div className="flex items-center justify-between">
          <p className="font-semibold">Profit (%)</p>

          <div className="flex items-center gap-2">
            <div className="w-20 h-6">
              <ResponsiveContainer>
                <AreaChart
                  data={defaultData}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  {/* Soft red -> transparent fill */}
                  <defs>
                    <linearGradient id="softGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4b9989" stopOpacity={0.6} />
                      <stop
                        offset="70%"
                        stopColor="#4b9989"
                        stopOpacity={0.15}
                      />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <Area
                    type="monotone"
                    dataKey="y"
                    stroke="#4b9989"
                    strokeWidth={2}
                    fill="url(#softGreen)"
                    dot={false}
                    activeDot={false}
                    isAnimationActive
                  />
                  {/* No axes / grid / tooltip for a clean sparkline look */}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <p className="text-primary font-medium">+23%</p>
          </div>
        </div>
      </CardBody>

      <CardFooter className="grid grid-cols-2 gap-3">
        <Button
          startContent={<TrendingUp size={17} />}
          size="sm"
          className="text-sm"
          radius="full"
          color="default"
        >
          Risk: 10%
        </Button>

        <Button
          startContent={<Users size={17} />}
          size="sm"
          className="text-sm"
          radius="full"
          color="default"
        >
          Followers: 10
        </Button>
      </CardFooter>
    </Card>
  );
};
