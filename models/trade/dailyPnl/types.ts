export type GetDailyPnlResponse = {
  ok: boolean;
  data: {
    day: string;
    realized_pnl: string;
    trades: number;
    wins: number;
    losses: number;
    sum_pct: string;
    last_closed_at: string;
  }[];
};
