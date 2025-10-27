import { MyOpenPositions } from "@/components/open-positions";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `My Open Positions | ${site.name}`,
  description: "My Open Positions",
};

export default function MyOpenPositionsPage() {
  return <MyOpenPositions />;
}
