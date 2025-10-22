import { DashboardNotifications } from "@/components/dashboard";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Notifications - ${site.name}`,
  description: "Notifications",
};

export default function NotificationsPage() {
  return <DashboardNotifications />;
}
