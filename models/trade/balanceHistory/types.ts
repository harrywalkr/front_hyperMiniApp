export type BalanceHistoryResponse = {
  ok: boolean;
  data: {
    equity_est: number;
    available: number;
    margin: number;
    crossUpnl: number;
    isoUpnl: number;
    bonus: number;
    taken_at: string;
  }[];
};

export type GetBalanceHistoryVariables = {
  limit?: number;
};
