// boulevard-app/src/lib/tiktok.ts
import { ApifyClient } from 'apify-client';

const APIFY_TOKEN = 'apify_api_CMWhmxDrvmgR6onotolMobSeiQgOiC44YCcf';
const TIKTOK_SCRAPER_ACTOR_ID = 'GdWCkxBtKWOsKjdch';

const client = new ApifyClient({
    token: APIFY_TOKEN,
});

async function runActor(actorId: string, input: object) {
    const run = await client.actor(actorId).call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items;
}

interface TikTokPost {
    id: string;
    text: string;
    webVideoUrl: string;
    diggCount: number;
    commentCount: number;
    playCount: number;
    videoMeta: {
        coverUrl: string;
    };
    authorMeta: {
        fans: number;
        following: number;
        heart: number;
        video: number;
        avatar: string;
    };
}

export async function fetchTikTokData(username: string, limit: number = 3) {
    const items = (await runActor(
        TIKTOK_SCRAPER_ACTOR_ID, {
        profiles: [username],
        resultsPerPage: limit,
    })) as unknown as TikTokPost[];

    if (!items || items.length === 0) {
        return { stats: {}, topPosts: [] };
    }

    const firstPost = items[0];
    const stats = firstPost.authorMeta ? {
        followerCount: firstPost.authorMeta.fans,
        followingCount: firstPost.authorMeta.following,
        heartCount: firstPost.authorMeta.heart,
        videoCount: firstPost.authorMeta.video,
    } : {};

    const topPosts = items.map((p: TikTokPost) => ({
        id: p.id,
        thumbnailUrl: p.videoMeta?.coverUrl || p.authorMeta?.avatar,
        postUrl: p.webVideoUrl,
        likes: p.diggCount,
        comments: p.commentCount,
        views: p.playCount,
        text: p.text,
    }));

    return { stats, topPosts };
} 