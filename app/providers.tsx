"use client";
import { ThemeProvider, type ThemeProviderProps } from "next-themes";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { ToastProvider } from "@heroui/toast";
import { getQueryClient } from "@/core/config";
import { HelperProvider } from "./helperProvider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <NextTopLoader color="#4b9989" />

          <ToastProvider
            placement="top-center"
            toastOffset={10}
            regionProps={{
              className: "z-999999999999!",
              classNames: {
                base: "z-999999999999!",
              },
            }}
          />

          <HelperProvider>{children}</HelperProvider>
        </ThemeProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
