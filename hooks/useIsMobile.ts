"use client";
import Cookies from "js-cookie";

export const useIsMobile = () => {
  const isMobile = Cookies.get("viewport") === "mobile";

  return isMobile;
};
