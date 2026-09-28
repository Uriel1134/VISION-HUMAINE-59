export const KKIAPAY_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY || "5077c5e0b9b211f18e1d4532f755649c",
  privateKey: process.env.KKIAPAY_PRIVATE_KEY || "tpk_5077ecf2b9b211f18e1d4532f755649c",
  secret: process.env.KKIAPAY_SECRET || "tsk_5077ecf2b9b211f18e1d4532f755649c",
  sandbox: process.env.NEXT_PUBLIC_KKIAPAY_SANDBOX === 'true' || true,
};

export interface KkiapayPaymentOptions {
  amount: number;
  name?: string;
  email?: string;
  phone?: string;
  data?: Record<string, any>;
  theme?: string;
}

export function openKkiapay({
  amount,
  name,
  email,
  phone,
  data,
  theme = "#292D77"
}: KkiapayPaymentOptions, 
onSuccess: (response: { transactionId: string }) => void, 
onFailed?: (error: any) => void
) {
  if (typeof window === 'undefined') return;

  const win = window as any;

  if (typeof win.openKkiapayWidget === 'function') {
    if (typeof win.addSuccessListener === 'function') {
      win.addSuccessListener(onSuccess);
    }
    if (typeof win.addFailedListener === 'function' && onFailed) {
      win.addFailedListener(onFailed);
    }

    win.openKkiapayWidget({
      amount: Math.round(amount),
      api_key: KKIAPAY_CONFIG.publicKey,
      sandbox: KKIAPAY_CONFIG.sandbox,
      email: email || '',
      phone: phone || '',
      name: name || '',
      data: data ? JSON.stringify(data) : '',
      theme: theme,
    });
  } else {
    console.warn('[KKIAPAY] Le SDK KkiaPay n\'est pas encore chargé.');
  }
}
