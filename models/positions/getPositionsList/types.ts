export type GetPositionsListResponse = {
  symbol: string;
  side: "BUY" | "SELL";
  qty: number;
  positionId: string;
  unrealizedPNL: number;
  margin: number;
  leverage: number;
  liqPrice: number;
  avgOpenPrice: number;
}[];
