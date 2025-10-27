import { DashboardFollowingAddresses } from "@/components/dashboard";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Following Addresses - ${site.name}`,
  description: "Following Addresses",
};

export default function FollowingAddressPage() {
  return <DashboardFollowingAddresses />;
}
