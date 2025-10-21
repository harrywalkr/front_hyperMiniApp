import { PublicLayout } from "@/layouts";

export default async function PublicLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
