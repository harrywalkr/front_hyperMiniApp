export type GetPnlResponse = {
  ok: boolean;
  data: {
    symbol: string;
    pnl_amt: number;
    pnl_pct: number;
    closed_at: string;
  }[];
};
