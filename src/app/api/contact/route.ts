import { NextResponse } from 'next/server';
import { ContactSchema, sanitizeText } from '@/lib/security';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check honeypot for anti-spam
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Message reçu' });
    }

    const validation = ContactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0]?.message || 'Données invalides' },
        { status: 400 }
      );
    }

    const sanitizedData = {
      fullName: sanitizeText(validation.data.fullName),
      email: sanitizeText(validation.data.email),
      phone: validation.data.phone ? sanitizeText(validation.data.phone) : undefined,
      subject: sanitizeText(validation.data.subject),
      message: sanitizeText(validation.data.message),
    };

    // Log internally for trace (in real production, send via SendGrid / Resend / Nodemailer)
    console.log('[SECURE INQUIRY RECEIVED]:', {
      timestamp: new Date().toISOString(),
      ...sanitizedData,
    });

    return NextResponse.json({
      success: true,
      message: 'Votre message a été transmis avec succès à l\'équipe de VISION HUMAINE 59.',
    });
  } catch (error) {
    console.error('[CONTACT API ERROR]:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur lors du traitement du message.' },
      { status: 500 }
    );
  }
}
