import { NextRequest, NextResponse } from 'next/server';
import { generateBio } from '../../../utils/openai';

export async function POST(request: NextRequest) {
  try {
    const { instagramData, tiktokData } = await request.json();

    if (!instagramData && !tiktokData) {
      return NextResponse.json({ error: 'At least one social media profile is required' }, { status: 400 });
    }

    const bio = await generateBio(instagramData, tiktokData);

    return NextResponse.json({ bio });
  } catch (error) {
    console.error('Error in OpenAI route:', error);
    return NextResponse.json({ error: 'Error generating bio' }, { status: 500 });
  }
} 