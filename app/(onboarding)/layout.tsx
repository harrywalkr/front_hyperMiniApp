import { OnboardingLayout } from "@/layouts/onboarding-layout";

export default async function NewLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OnboardingLayout>{children}</OnboardingLayout>;
}
