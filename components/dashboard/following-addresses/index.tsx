"use client";

import { Back, SearchCm } from "@/common";
import { WalletCard } from "../wallet-card";
import { NavigationBar } from "@/common/navigation-bar";

export const DashboardFollowingAddresses: React.FC = () => {
  return (
    <div>
      <Back title="Following Addresses" />

      <SearchCm />

      <div className="flex flex-col gap-y-3 mt-6">
        <WalletCard isFollowed />
        <WalletCard isFollowed />
        <WalletCard isFollowed />
        <WalletCard isFollowed />
      </div>

      <NavigationBar />
    </div>
  );
};
