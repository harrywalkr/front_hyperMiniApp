import { NewLayout } from "@/layouts/new-layout";

export default async function NewLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NewLayout>{children}</NewLayout>;
}
