import { ApiGuide } from "@/components/api-guide";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `API Credentials Guide | ${site.name}`,
  description: "API Credentials Guide",
};

export default function ApiGuidePage() {
  return <ApiGuide />;
}
