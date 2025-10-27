import { Login } from "@/components/login";
import { site } from "@/core/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Login | ${site.name}`,
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col overscroll-none overflow-y-auto min-h-screen bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat p-5 max-w-md mx-auto">
      <Login />
    </div>
  );
}
