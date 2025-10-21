"use server";
import { PageSearchParams } from "@/core/types";
import { headers } from "next/headers";

export async function checkIsMobile(searchParams?: PageSearchParams) {
  try {
    const params = await searchParams;
    const headersList = await headers();

    const viewport =
      params && "viewport" in params
        ? params.viewport
        : headersList.get("x-viewport");

    return viewport === "mobile";
  } catch (error) {
    return false;
  }
}
