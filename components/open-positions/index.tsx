"use client";

import { Back } from "@/common";
import { X } from "lucide-react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

export const MyOpenPositions: React.FC = () => {
  return (
    <div>
      <Back title="My Open Positions" />

      <div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Positions</p>

          <Button
            variant="light"
            color="danger"
            className="font-semibold"
            startContent={<X size={18} strokeWidth={3} />}
          >
            Close All
          </Button>
        </div>

        <div className="w-full max-w-full">
          <Table
            shadow="none"
            classNames={{
              wrapper: "bg-transparent border-none px-0",
              td: "bg-primary-50  text-xs first:rounded-l-full last:rounded-r-full",
              th: "bg-transparent ",

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
      </div>
    </div>
  );
};
