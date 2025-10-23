import { buildError } from "./buildError";
import { site } from "./site";

/**
 * Performs a **server-side fetch request** to the provided API endpoint.
 *
 * - Automatically prepends the **base API URL** (`site.apiUrl`).
 * - Ensures **proper error handling** via `finalizeError`.
 * - Supports **custom fetch options** (e.g., headers, method, body).
 *
 * @template T - The expected response data type.
 * @param {string} url - The API endpoint (relative to `site.apiUrl`).
 * @param {RequestInit} [options] - Optional fetch configuration (e.g., headers, method).
 * @returns {Promise<T>} A promise resolving to the response data.
 * @throws {HandledError} Throws a structured error object from `finalizeError`.
 */
export async function serverRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const baseUrl = site.urls.api;
    const fullUrl = `${baseUrl}/${url}`.replace(/([^:]\/)\/+/g, "$1"); // Prevents double slashes

    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null); // Attempt to parse error response
      throw buildError().custom({
        message: errorData.message,
        statusCode: response.status,
        meta: errorData.meta,
      });
    }

    return (await response.json()) as T;
  } catch (error) {
    throw error; // Ensure all errors are processed consistently
  }
}
