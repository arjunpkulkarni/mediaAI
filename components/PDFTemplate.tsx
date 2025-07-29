// boulevard-app/src/components/PDFTemplate.tsx
import React from 'react';

interface PDFTemplateProps {
  instagramData?: any;
  tiktokData?: any;
  bio?: string;
  instagramHandle?: string;
  tiktokHandle?: string;
}

const PDFTemplate: React.FC<PDFTemplateProps> = ({ instagramData, tiktokData, bio, instagramHandle, tiktokHandle }) => {
  const igStats = instagramData?.stats;
  const tkStats = tiktokData?.stats;
  const igPosts = instagramData?.topPosts;
  const tkPosts = tiktokData?.topPosts;

  return (
    <div className="w-[8.5in] h-[11in] bg-white shadow-lg p-8 text-gray-800 font-sans">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-200 pb-4 mb-8">
        <h1 className="text-5xl font-bold text-gray-900">
          {(instagramHandle || tiktokHandle)?.toUpperCase()}'s Media Kit
        </h1>
        <p className="text-lg text-gray-500">
          {instagramHandle && `@${instagramHandle}`} {tiktokHandle && `| @${tiktokHandle}`}
        </p>
      </div>

      {/* About Me Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold border-b border-gray-300 pb-2 mb-4">About Me</h2>
        <p className="text-base leading-relaxed">{bio || 'Bio goes here...'}</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {igStats && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-semibold mb-2 text-pink-600">Instagram</h3>
            <p><strong>Followers:</strong> {igStats.followerCount?.toLocaleString()}</p>
            <p><strong>Following:</strong> {igStats.followingCount?.toLocaleString()}</p>
            <p><strong>Posts:</strong> {igStats.postsCount?.toLocaleString()}</p>
          </div>
        )}
        {tkStats && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-semibold mb-2 text-blue-600">TikTok</h3>
            <p><strong>Followers:</strong> {tkStats.followerCount?.toLocaleString()}</p>
            <p><strong>Hearts:</strong> {tkStats.heartCount?.toLocaleString()}</p>
            <p><strong>Videos:</strong> {tkStats.videoCount?.toLocaleString()}</p>
          </div>
        )}
      </div>
      
      {/* Top Posts Section */}
      <div>
        <h2 className="text-3xl font-semibold border-b border-gray-300 pb-2 mb-4">Top Content</h2>
        <div className="grid grid-cols-3 gap-4">
          {igPosts?.map((post: any) => (
            <a key={post.id} href={post.postUrl} target="_blank" rel="noopener noreferrer" className="block">
              <img src={post.thumbnailUrl} alt="Instagram Post" className="w-full h-auto rounded-md shadow-md" />
            </a>
          ))}
          {tkPosts?.map((post: any) => (
            <a key={post.id} href={post.postUrl} target="_blank" rel="noopener noreferrer" className="block">
              <img src={post.thumbnailUrl} alt="TikTok Post" className="w-full h-auto rounded-md shadow-md" />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PDFTemplate; 