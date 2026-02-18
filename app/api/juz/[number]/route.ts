import { NextRequest, NextResponse } from 'next/server';
import { fetchJuzData } from '@/lib/api';

// Cache the response for 24 hours at the CDN / ISR level
export const revalidate = 86400;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ number: string }> }
) {
  const { number } = await params;
  const juzNumber = Number.parseInt(number, 10);

  if (Number.isNaN(juzNumber) || juzNumber < 1 || juzNumber > 30) {
    return NextResponse.json(
      { error: 'Numéro de Juz invalide. Doit être entre 1 et 30.' },
      { status: 400 }
    );
  }

  try {
    const data = await fetchJuzData(juzNumber);

    return NextResponse.json(data, {
      headers: {
        // Aggressive caching — Quran text never changes
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Erreur serveur inconnue';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
