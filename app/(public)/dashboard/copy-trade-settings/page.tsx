import { CopyTradeSettings } from "@/components/dashboard";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Copy Trade Settings - ${site.name}`,
  description: "Copy Trade Settings",
};

export default function CopyTradeSettingsPage() {
  return <CopyTradeSettings />;
}
