import { Connect } from "@/components/connect";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Connect to ${site.name}`,
  description: "Connect to your account",
};

export default function ConnectPage() {
  return <Connect />;
}
