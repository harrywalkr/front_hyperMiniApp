import { Login } from "@/components/login";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Login | ${site.name}`,
  description: "Login to your account",
};

export default function LoginPage() {
  return <Login />;
}
