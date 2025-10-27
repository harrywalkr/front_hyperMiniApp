import { AddAddress } from "@/components/dashboard/add-address";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Add Address | ${site.name}`,
};

export default function AddAddressPage() {
  return <AddAddress />;
}
