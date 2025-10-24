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
        <WalletCard
          isFollowed
          address={"0xecb63caa47c7c4e77f60f1ce858cf28dc2b82b00"}
          label={"Big Whale"}
        />
        <WalletCard
          isFollowed
          address={"0xecb63caa47c7c4e77f60f1ce858cf28dc2b82b00"}
          label={"Big Whale"}
        />
        <WalletCard
          isFollowed
          address={"0xecb63caa47c7c4e77f60f1ce858cf28dc2b82b00"}
          label={"Big Whale"}
        />
        <WalletCard
          isFollowed
          address={"0xecb63caa47c7c4e77f60f1ce858cf28dc2b82b00"}
          label={"Big Whale"}
        />
      </div>

      <NavigationBar />
    </div>
  );
};
