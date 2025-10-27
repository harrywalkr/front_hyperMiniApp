import { PrivateLayout } from "@/layouts";

export default async function PublicLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
