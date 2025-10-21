import { AppError } from "./buildError";

type PrismaError = {
  code: string;
  meta?: any;
  message: string;
};

type ErrorMeta = {
  key: string;
  message: string;
}[];

type FinalizeErorReturn = {
  error: string;
  message: string;
  statusCode: number;
  meta?: ErrorMeta;
};

function isAppError(error: unknown): error is AppError {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    "message" in error
  );
}

function isAxiosError(
  error: unknown
): error is { response: { data: any; status: number } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response
  );
}

export function finalizeError(error: unknown): FinalizeErorReturn {
  // Handle our custom AppError

  if (isAxiosError(error)) {
    const backendData = error.response?.data as
      | {
          status?: boolean;
          error?: {
            id?: number;
            message?: string;
            details?: Record<string, string>;
          };
        }
      | undefined;

    const backendMessage = backendData?.error?.message;
    const detailsRecord = backendData?.error?.details ?? {};
    const detailsPairs = Object.entries(detailsRecord);
    const detailsString = detailsPairs
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join(" | ");

    const combinedMessage =
      [backendMessage, detailsString].filter(Boolean).join(" - ") ||
      "خطای ناشناخته ای رخ داده است";

    return {
      error: backendMessage ?? "خطای ناشناخته",
      message: combinedMessage,
      statusCode: error?.response?.status ?? 500,
      meta: detailsPairs.length
        ? detailsPairs.map(([key, value]) => ({ key, message: String(value) }))
        : undefined,
    };
  }

  if (isAppError(error)) {
    return {
      error: error.message,
      message: error?.message,
      statusCode: error?.statusCode ?? 500,
      meta: error?.meta,
    };
  }

  // Handle generic errors
  if (error instanceof Error) {
    return {
      error: "خطای داخلی سرور",
      message: error.message,
      statusCode: 500,
    };
  }

  // Fallback for completely unknown errors
  return {
    error: "خطای داخلی سرور",
    message: "خطای ناشناخته",
    statusCode: 500,
  };
}
