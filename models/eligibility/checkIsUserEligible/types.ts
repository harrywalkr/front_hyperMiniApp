export type CheckIsUserEligibleDueTo = "channel" | "member" | "subscribed";

export type CheckIsUserEligibleResponse = {
  ok: boolean;
  chat_id: number;
  eligible: boolean;
  because: CheckIsUserEligibleDueTo;
  subscription_active: boolean;
  member: boolean;
  cached: boolean;
};
