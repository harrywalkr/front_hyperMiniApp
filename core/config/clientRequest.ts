import axios from "axios";
import { site } from "./site";
import { Session } from "next-auth";
import { isServer } from "@tanstack/react-query";
import { getSession, signOut } from "next-auth/react";

let cachedSession: Session | null = null;

/**
 * Creates an Axios instance with a predefined base URL.
 */
const instance = axios.create({
  baseURL: site.urls.apiFull,
});

/**
 * Axios request interceptor.
 * - Removes empty query parameters (`""` or `undefined` values).
 */
instance.interceptors.request.use(
  async (request) => {
    request.headers["CLIENT-TYPE"] = "WEB-CLIENT";

    if (!isServer) {
      if (!cachedSession) {
        cachedSession = await getSession();
      }

      if (cachedSession?.token) {
        request.headers["Authorization"] = `Bearer ${cachedSession.token}`;
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
    console.log(error?.response?.data);

    if (error?.response?.data?.statusCode === 401) {
      await signOut();
    }

    return Promise.reject(error);
  }
);

export { instance as clientRequest };
