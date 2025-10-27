"use client";

import { Back, SearchCm } from "@/common";
import { WalletCard } from "../wallet-card";
import { addressModels } from "@/models/address";
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import Link from "next/link";

export const DashboardAddresses: React.FC = () => {
  const { data } = addressModels.list.useQuery();

  return (
    <div>
      <Back title="Addresses" />

      <SearchCm
        endContent={
          <Link href="/add-address">
            <Button
              isIconOnly
              radius="full"
              variant="light"
              className="bg-primary-100/85 border border-primary-400"
            >
              <Plus size={20} className="text-default-900" />
            </Button>
          </Link>
        }
      />

      <div className="flex flex-col gap-y-3 mt-6">
        <WalletCard
          address={"0xecb63caa47c7c4e77f60f1ce858cf28dc2b82b00"}
          label={"Big Whale"}
          isFollowed={false}
        />

        <WalletCard
          address={"0xecb63caa47c7c4e77f60f1ce858cf28dc2b82b00"}
          label={"Fish"}
          isFollowed={false}
        />

        <WalletCard
          address={"0xecb63caa47c7c4e77f60f1ce858cf28dc2b82b00"}
          label={"Big Whale"}
          isFollowed={false}
        />

        <WalletCard
          address={"0xecb63caa47c7c4e77f60f1ce858cf28dc2b82b00"}
          label={"Fish"}
          isFollowed={false}
        />
      </div>

      <div className="w-full mt-5">
        <Link href="/dashboard">
          <Button color="primary" radius="full" fullWidth size="lg">
            Confirm & Start Copy
          </Button>
        </Link>
      </div>
    </div>
  );
};
