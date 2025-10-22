"use client";

import { Button } from "@heroui/react";
import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center w-full gap-y-5 max-w-md mx-auto px-3">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <TriangleAlert size={85} className="text-warning" />
        <strong className="text-lg text-center text-warning">Opps!</strong>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-2">
        <p className="text-center text-base">Something went wrong!</p>
        <p className="text-center">Please try again.</p>
      </div>

      <Button
        color="primary"
        fullWidth
        radius="full"
        variant="ghost"
        className="font-medium"
        onPress={() => reset()}
      >
        Retry
      </Button>
    </div>
  );
}
