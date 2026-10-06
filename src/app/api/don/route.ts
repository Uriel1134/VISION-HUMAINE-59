import { NextResponse } from 'next/server';
import { DonationSchema, sanitizeText, generateTransactionReference } from '@/lib/security';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = DonationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0]?.message || 'Données du don invalides' },
        { status: 400 }
      );
    }

    const { amount, currency, donorName, donorEmail, donorPhone, allocation, paymentMethod, type, transactionId } = validation.data;

    const reference = transactionId ? `KKIA-${transactionId}` : generateTransactionReference('VH59-DON');

    const sanitizedReceipt = {
      reference,
      transactionId: transactionId || reference,
      amount,
      currency,
      type,
      donorName: sanitizeText(donorName),
      donorEmail: sanitizeText(donorEmail),
      donorPhone: donorPhone ? sanitizeText(donorPhone) : undefined,
      allocation,
      paymentMethod,
      date: new Date().toISOString(),
      status: 'CONFIRMED',
      organization: 'VISION HUMAINE 59',
      certificateUrl: `/don/recu/${reference}`,
    };

    console.log('[SECURE DONATION PROCESSED]:', sanitizedReceipt);
    
    // Save to Supabase if configured
    try {
      const { createDonation } = await import('@/lib/supabase');
      const normalizedType: 'once' | 'monthly' = type === 'mensuel' ? 'monthly' : 'once';
      await createDonation({
        id: reference,
        reference,
        transactionId: transactionId || reference,
        donorName: sanitizeText(donorName),
        donorEmail: sanitizeText(donorEmail),
        donorPhone: donorPhone ? sanitizeText(donorPhone) : undefined,
        amount,
        currency,
        type: normalizedType,
        allocation,
        paymentMethod,
        status: 'CONFIRMED',
        createdAt: sanitizedReceipt.date
      });
    } catch (dbErr) {
      console.warn('[SUPABASE DONATION PERSIST WARNING]:', dbErr);
    }

    return NextResponse.json({
      success: true,
      reference,
      message: 'Don validé avec succès. Merci pour votre soutien à VISION HUMAINE 59.',
      receipt: sanitizedReceipt,
    });
  } catch (error) {
    console.error('[DON API ERROR]:', error);
    return NextResponse.json(
      { error: 'Erreur interne lors du traitement sécurisé du don.' },
      { status: 500 }
    );
  }
}
