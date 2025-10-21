type ErrorMeta = {
  key: string;
  message: string;
}[];

type CustomErrorOptions = {
  message: string;
  statusCode: number;
  meta?: ErrorMeta;
};

type ErrorBuilder = {
  badRequest: (message?: string, meta?: ErrorMeta) => never;
  unauthorized: (message?: string, meta?: ErrorMeta) => never;
  forbidden: (message?: string, meta?: ErrorMeta) => never;
  notFound: (message?: string, meta?: ErrorMeta) => never;
  conflict: (message?: string, meta?: ErrorMeta) => never;
  internal: (message?: string, meta?: ErrorMeta) => never;
  custom: (options: CustomErrorOptions) => never;
};

export function buildError(): ErrorBuilder {
  const throwError = (
    statusCode: number,
    message: string,
    meta?: any
  ): never => {
    throw { statusCode, message, meta };
  };

  return {
    badRequest: (message = "درخواست شما غیر قابل پردازش میباشد.", meta) =>
      throwError(400, message, meta),

    unauthorized: (message = "شما دسترسی لازم به این بخش را ندارید", meta) =>
      throwError(401, message, meta),

    forbidden: (message = "دسترسی به این بخش ممنوع میباشد", meta) =>
      throwError(403, message, meta),

    notFound: (message = "یافت نشد", meta) => throwError(404, message, meta),

    conflict: (message = "تداخلی پیش آمده", meta) =>
      throwError(409, message, meta),

    internal: (message = "خطای داخلی سرور", meta) =>
      throwError(500, message, meta),

    custom: ({ message, statusCode, meta }) =>
      throwError(statusCode, message, meta),
  };
}

export type AppError =
  ReturnType<typeof buildError> extends ErrorBuilder
    ? {
        statusCode: number;
        message: string;
        meta?: ErrorMeta;
      }
    : never;
