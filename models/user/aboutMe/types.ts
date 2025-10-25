import { CheckIsUserEligibleDueTo } from "@/models/eligibility/checkIsUserEligible/types";

export type AboutMeResponse = {
  ok: boolean;
  user: null;
  chat_id: number;
  subscription: { active: false };
  eligibility: {
    ok: boolean;
    due_to: CheckIsUserEligibleDueTo;
    member: boolean;
    subscribed: boolean;
    copy: {
      enabled: boolean;
      exchange: string;
      closed_positions: number;
      open_positions: number;
      has_history: boolean;
    };
  };
  prefs: { threshold: number; filter: string; alerts: boolean };
  addresses: {
    address: string;
    label: string;
  }[];

  copy: {
    enabled: boolean;
    exchange: string;
    settings: {
      fixed_amount: string;
      pct_account: string;
      max_drawdown_pct: string;
      max_daily_positions: number;
      take_profit_pct: string;
      stop_loss_pct: string;
    };
  };
};
