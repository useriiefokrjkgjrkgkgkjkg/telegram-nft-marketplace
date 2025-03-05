import { NextResponse } from 'next/server';
import { setWebhook } from '../../../lib/telegram';

export async function GET() {
  try {
    if (!process.env.VERCEL_URL) {
      return NextResponse.json(
        { error: 'VERCEL_URL is not defined' },
        { status: 400 }
      );
    }

    const webhookUrl = `https://${process.env.VERCEL_URL}/api/telegram/webhook`;
    const result = await setWebhook(webhookUrl);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to set webhook:', error);
    return NextResponse.json(
      { error: 'Failed to set webhook' },
      { status: 500 }
    );
  }
} 