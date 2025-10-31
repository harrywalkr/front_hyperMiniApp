export const site = {
  name: "HyperLiquid",
  slogan: "Your Gateway to the Future",
  title: "HyperLiquid",
  description: "Your Gateway to the Future",
  urls: {
    api: "https://mini.bitfx.com/api",
    domain: "https://mini.bitfx.com",
  },
};

// Enable logging when ?debug=1 or NEXT_PUBLIC_DEBUG=1
export const DEBUG =
  (typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("debug") === "1") ||
  process.env.NEXT_PUBLIC_DEBUG === "1";
