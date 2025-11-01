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
 * - Waits for Telegram chat ID before sending the request.
 * - Removes empty query parameters.
 */
instance.interceptors.request.use(
  async (request) => {
    if (!isServer) {
      try {
        const tgIdSession = JSON.parse(
          sessionStorage.getItem("mini-app-tg-id") ?? ""
        );

        if (tgIdSession) {
          request.headers["X-TG-Init-Data"] = String(tgIdSession);
          request.headers["X-Dev-Chat-Id"] = String(tgIdSession);
        }

        if (!tgIdSession) {
          const tg = await getTgChatId();

          if (tg?.id) {
            request.headers["X-TG-Init-Data"] = String(tg?.id);
            request.headers["X-Dev-Chat-Id"] = String(tg?.id);
          }
        }
      } catch (err) {
        console.error("Telegram chat ID fetch failed:", err);
        return Promise.reject(
          new Error("Telegram chat ID not found. Open this app in Telegram.")
        );
      }
    }

    if (request.params && Object.keys(request.params).length) {
      for (const key of Object.keys(request.params)) {
        if (request.params[key] === "" || request.params[key] === undefined) {
          delete request.params[key];
        }
      }
    }

    return request;
  },
  (error) => Promise.reject(error)
);

/**
 * Axios response interceptor.
 */
instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export { instance as clientRequest };
