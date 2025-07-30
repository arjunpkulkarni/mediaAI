import { NextRequest, NextResponse } from 'next/server';
import { fetchProfileDetails, fetchTopPosts } from '../../../utils/instagram';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const handle = searchParams.get('handle');

  if (!handle) {
    return NextResponse.json({ error: 'Handle is required' }, { status: 400 });
  }

  try {
    const [profileDetails, topPosts] = await Promise.all([
      fetchProfileDetails(handle),
      fetchTopPosts(handle, 3),
    ]);

    return NextResponse.json({
      profileDetails,
      topPosts,
    });
  } catch (error) {
    console.error(`Error fetching Instagram data for ${handle}:`, error);
    return NextResponse.json({ error: 'Error fetching Instagram data' }, { status: 500 });
  }
} 