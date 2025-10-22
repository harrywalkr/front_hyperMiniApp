"use client";

import { Back, SearchCm } from "@/common";
import { WalletCard } from "../wallet-card";
import { NavigationBar } from "@/common/navigation-bar";

export const DashboardAddresses: React.FC = () => {
  return (
    <div>
      <Back title="Addresses" />

      <SearchCm />

      <div className="flex flex-col gap-y-3 mt-6">
        <WalletCard isFollowed={false} />
        <WalletCard isFollowed={false} />
        <WalletCard isFollowed={false} />
        <WalletCard isFollowed={false} />
      </div>

      <NavigationBar />
    </div>
  );
};
