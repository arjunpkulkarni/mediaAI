import { NextRequest, NextResponse } from 'next/server';
import { generateBio, generateAudience } from '../../../utils/openai';

export async function POST(request: NextRequest) {
  try {
    const { instagramData, tiktokData } = await request.json();

    if (!instagramData && !tiktokData) {
      return NextResponse.json({ error: 'At least one social media profile is required' }, { status: 400 });
    }

    const [bio, audience] = await Promise.all([
      generateBio(instagramData, tiktokData),
      generateAudience(instagramData, tiktokData)
    ]);

    return NextResponse.json({ bio, audience });
  } catch (error) {
    console.error('Error in OpenAI route:', error);
    return NextResponse.json({ error: 'Error generating AI content' }, { status: 500 });
  }
} 