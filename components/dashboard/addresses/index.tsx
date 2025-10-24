"use client";

import { Back, SearchCm } from "@/common";
import { WalletCard } from "../wallet-card";
import { NavigationBar } from "@/common/navigation-bar";
import { addressModels } from "@/models/address";

export const DashboardAddresses: React.FC = () => {
  const { data } = addressModels.list.useQuery();

  console.log({ data });

  return (
    <div>
      <Back title="Addresses" />

      <SearchCm />

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

      <NavigationBar />
    </div>
  );
};
