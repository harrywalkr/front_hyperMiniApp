export type CreateSubscriptionResponse = {
  reused: boolean;
  payment_id: string;
  price_amount: number;
  price_currency: string;
  pay_currency: string;
  pay_amount: number;
  pay_address: string;
  expires_at: string;
  minutes_left: number;
  seconds_left: number;
};

export type CreateSubscriptionVariables = { payCurrency: string };
