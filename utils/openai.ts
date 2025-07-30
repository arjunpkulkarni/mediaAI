import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: "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",
});

export async function generateBio(instagramData: any, tiktokData: any): Promise<string> {
  const igStats = instagramData?.stats;
  const tkStats = tiktokData?.stats;
  const igPosts = instagramData?.topPosts?.map((p: any) => p.text).filter(Boolean).join('\n');
  const tkPosts = tiktokData?.topPosts?.map((p: any) => p.text).filter(Boolean).join('\n');

  const prompt = `
    Based on the following social media data, write a compelling, 2-3 sentence "About Me" bio for a media kit.
    The tone should be professional yet engaging.

    Instagram Stats:
    - Followers: ${igStats?.followerCount || 'N/A'}
    - Following: ${igStats?.followingCount || 'N/A'}
    - Posts: ${igStats?.postsCount || 'N/A'}

    TikTok Stats:
    - Followers: ${tkStats?.followerCount || 'N/A'}
    - Following: ${tkStats?.followingCount || 'N/A'}
    - Hearts: ${tkStats?.heartCount || 'N/A'}
    - Videos: ${tkStats?.videoCount || 'N/A'}

    Recent Instagram Post Captions:
    ${igPosts || 'No recent Instagram posts provided.'}

    Recent TikTok Post Captions:
    ${tkPosts || 'No recent TikTok posts provided.'}

    Generated Bio:
  `;

  try {
    const response = await client.responses.create({
      model: "gpt-4.1",
      input: prompt,
    });
    return response.output_text?.trim() || "We couldn't generate a bio for you at this time.";
  } catch (error) {
    console.error("Error generating bio from OpenAI:", error);
    throw new Error("Failed to generate bio.");
  }
} 