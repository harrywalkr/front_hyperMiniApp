import { DashboardSettings } from "@/components/dashboard";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Settings - ${site.name}`,
  description: "Settings",
};

export default function AddressPage() {
  return <DashboardSettings />;
}
