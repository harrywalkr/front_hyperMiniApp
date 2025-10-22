"use client";
import { Button } from "@heroui/react";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center w-full gap-y-5 max-w-md mx-auto px-3">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <SearchX size={85} className="text-danger" />
        <strong className="text-lg text-center text-danger">Not Found!</strong>
      </div>

      <p className="text-base text-foreground">
        Page you are looking for does not exists!
      </p>

      <Button
        color="primary"
        fullWidth
        radius="full"
        variant="ghost"
        className="font-medium"
        href="/"
      >
        Home
      </Button>
    </div>
  );
}
