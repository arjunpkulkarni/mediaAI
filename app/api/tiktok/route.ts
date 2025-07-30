import { NextRequest, NextResponse } from 'next/server';
import { fetchTikTokData } from '../../../utils/tiktok';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const handle = searchParams.get('handle');

  if (!handle) {
    return NextResponse.json({ error: 'Handle is required' }, { status: 400 });
  }

  try {
    const tiktokData = await fetchTikTokData(handle, 3);

    return NextResponse.json(tiktokData);
  } catch (error) {
    console.error(`Error fetching TikTok data for ${handle}:`, error);
    return NextResponse.json({ error: 'Error fetching TikTok data' }, { status: 500 });
  }
} 