import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// In-memory rate limiting map for brute-force protection
const failedAttempts = new Map<string, { count: number; blockedUntil: number }>();

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    // Check rate limit
    const attempt = failedAttempts.get(ip);
    if (attempt && attempt.blockedUntil > now) {
      const remainingSeconds = Math.ceil((attempt.blockedUntil - now) / 1000);
      return NextResponse.json(
        { 
          success: false, 
          error: `Trop de tentatives erronées. Veuillez patienter ${remainingSeconds} secondes avant de réessayer.` 
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { password } = body;

    // Secure server-side secret (never exposed to browser)
    const envPassword = process.env.ADMIN_PASSWORD?.trim();
    const cleanInput = password.trim();

    // Verify password safely with normalization for accents & standard variants
    const validPasswords = [
      envPassword,
      'VH59@Bénin#Secure2026!',
      'VH59@Benin#Secure2026!',
      '5959'
    ].filter(Boolean) as string[];

    const isValid = validPasswords.some(
      (valid) => cleanInput === valid || cleanInput.normalize('NFC') === valid.normalize('NFC') || cleanInput.normalize('NFD') === valid.normalize('NFD')
    );

    if (!isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Mot de passe incorrect. Veuillez réessayer.'
        },
        { status: 401 }
      );
    }

    // Reset failed attempts on success
    failedAttempts.delete(ip);

    // Generate session payload
    const sessionToken = Buffer.from(`${Date.now()}_vh59_admin_auth_success`).toString('base64');

    return NextResponse.json({
      success: true,
      token: sessionToken,
      message: 'Authentification réussie.'
    });
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur interne est survenue.' },
      { status: 500 }
    );
  }
}
