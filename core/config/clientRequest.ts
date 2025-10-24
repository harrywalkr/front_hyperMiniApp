import axios from "axios";
import { site } from "./site";
import { isServer } from "@tanstack/react-query";
import { getTgChatId } from "../utils";

/**
 * Creates an Axios instance with a predefined base URL.
 */
const instance = axios.create({
  baseURL: site.urls.api,
});

/**
 * Axios request interceptor.
 * - Removes empty query parameters (`""` or `undefined` values).
 */
instance.interceptors.request.use(
  async (request) => {
    if (!isServer) {
      const tg = await getTgChatId();

      if (tg?.id) {
        request.headers["X-TG-Init-Data"] = String(tg?.id ?? "561361266");
        request.headers["X-Dev-Chat-Id"] = String(tg?.id ?? "561361266");
      }
    }

    if (request.params && Object.keys(request.params).length) {
      for (const key of Object.keys(request.params)) {
        if (request.params[key] === "" || request.params[key] === undefined) {
          delete request.params[key]; // Remove empty parameters
        }
      }
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Axios response interceptor.
 * - Directly returns the response.
 * - Handles errors by forwarding them for centralized error handling.
 */
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export { instance as clientRequest };
