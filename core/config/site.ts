export const site = {
  name: "HyperLiquid",
  slogan: "Your Gateway to the Future",
  title: "HyperLiquid",
  description: "Your Gateway to the Future",
  urls: {
    onchain: process.env.NEXT_PUBLIC_BASE_URL_ONE || process.env.BASE_URL_ONE,
    apiFull: process.env.NEXT_PUBLIC_BASE_URL_TWO,
    wallet: process.env.NEXT_PUBLIC_BASE_URL_THREE,
    api: process.env.NEXT_PUBLIC_BASE_URL_FOUR,
    hello: process.env.NEXT_PUBLIC_BASE_URL_FIVE,
    track: process.env.NEXT_PUBLIC_BASE_URL_SIX,
    domain: process.env.NEXT_PUBLIC_BASE_URL_SEVEN,
    ws: process.env.NEXT_PUBLIC_WS_URL,
  },
};
