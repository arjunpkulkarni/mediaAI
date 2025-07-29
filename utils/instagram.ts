// boulevard-app/src/lib/instagram.ts
import { ApifyClient } from 'apify-client';

const APIFY_TOKEN = 'apify_api_CMWhmxDrvmgR6onotolMobSeiQgOiC44YCcf'; 
const INSTAGRAM_SCRAPER_ACTOR_ID = 'shu8hvrXbJbY3Eb9W';

const client = new ApifyClient({
    token: APIFY_TOKEN,
});

/**
 * Generic function to run an Apify actor and get results.
 * @param {object} input - The input for the actor.
 * @returns {Promise<any>} - The items from the actor's dataset.
 */
async function runActor(input: object) {
    const run = await client.actor(INSTAGRAM_SCRAPER_ACTOR_ID).call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items;
}

/**
 * Fetches profile details for a given Instagram username.
 * @param {string} username - The Instagram username.
 * @returns {Promise<object>} - An object containing followerCount, followingCount, and postsCount.
 */
export async function fetchProfileDetails(username: string) {
    const items = await runActor({
        directUrls: [`https://www.instagram.com/${username}/`],
        resultsType: 'details',
        resultsLimit: 1,
    });
    const data = items[0];
    return {
        followerCount: data.followersCount,
        followingCount: data.followingCount,
        postsCount: data.postsCount,
    };
}

/**
 * Fetches the top N posts for a given Instagram username.
 * @param {string} username - The Instagram username.
 * @param {number} limit - The number of top posts to fetch.
 * @returns {Promise<Array<object>>>} - An array of post objects.
 */
export async function fetchTopPosts(username: string, limit: number = 3) {
    const posts = await runActor({
        directUrls: [`https://www.instagram.com/${username}/`],
        resultsType: 'posts',
        resultsLimit: limit,
    });

    return posts.map((p: any) => ({
        id: p.id,
        thumbnailUrl: p.imageUrl,
        postUrl: `https://instagram.com/p/${p.shortcode}/`,
        likes: p.likesCount,
        comments: p.commentsCount,
        text: p.caption,
    }));
} 