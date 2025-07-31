import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface Audience {
  gender: { [key: string]: number };
  age: { [key: string]: number };
  interests: string[];
}

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
    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content?.trim() || "We couldn't generate a bio for you at this time.";
  } catch (error) {
    console.error("Error generating bio from OpenAI:", error);
    throw new Error("Failed to generate bio.");
  }
}

export async function generateAudience(instagramData: any, tiktokData: any): Promise<Audience> {
  const igPosts = instagramData?.topPosts?.map((p: any) => p.text).filter(Boolean).join('\n');
  const tkPosts = tiktokData?.topPosts?.map((p: any) => p.text).filter(Boolean).join('\n');

  const prompt = `
    Analyze the following social media data to determine the audience demographics.
    Provide the output in a structured JSON format with the following keys: "gender", "age", "interests".

    - "gender": An object with gender keys (e.g., "male", "female", "non-binary") and their corresponding percentage as a number (0-100).
    - "age": An object with age range keys (e.g., "18-24", "25-34") and their corresponding percentage as a number (0-100).
    - "interests": An array of strings, listing the top 4-5 audience interests.

    Social Media Data:
    Instagram Posts:
    ${igPosts || 'No recent Instagram posts provided.'}

    TikTok Posts:
    ${tkPosts || 'No recent TikTok posts provided.'}

    JSON Output:
  `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
    
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content received from OpenAI for audience generation.");
    }
    
    return JSON.parse(content);
  } catch (error) {
    console.error("Error generating audience data from OpenAI:", error);
    throw new Error("Failed to generate audience data.");
  }
} 