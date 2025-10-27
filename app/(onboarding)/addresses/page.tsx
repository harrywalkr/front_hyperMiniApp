import { DashboardAddresses } from "@/components/dashboard";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Addresses - ${site.name}`,
  description: "Addresses",
};

export default function AddressPage() {
  return <DashboardAddresses />;
}
