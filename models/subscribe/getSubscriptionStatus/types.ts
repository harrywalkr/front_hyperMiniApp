export type SubscriptionStatus = "waiting" | "confirmed" | "expired";

export type GetSubscriptionStatusResponse = {
  payment_id: string;
  status: SubscriptionStatus;
  pay_currency: string;
  pay_amount: number;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  order_id: string;
  expires_at: string;
  minutes_left: number;
  seconds_left: number;
};
