import { DashboardLanding } from "@/components/dashboard";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard - ${site.name}`,
  description: "Dashboard",
};

export default function DashboardPage() {
  return <DashboardLanding />;
}
