// boulevard-app/src/components/MediaKitForm.tsx
"use client";

import { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFTemplate from './PDFTemplate';

export default function MediaKitForm() {
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mediaKitData, setMediaKitData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMediaKitData(null);

    if (!instagram && !tiktok) {
      alert('Please enter an Instagram or TikTok handle.');
      setLoading(false);
      return;
    }

    try {
      const [igResponse, tiktokResponse] = await Promise.all([
        instagram ? fetch(`/api/instagram?handle=${encodeURIComponent(instagram)}`) : Promise.resolve(null),
        tiktok ? fetch(`/api/tiktok?handle=${encodeURIComponent(tiktok)}`) : Promise.resolve(null),
      ]);

      if (igResponse && !igResponse.ok) throw new Error('Failed to fetch Instagram data');
      if (tiktokResponse && !tiktokResponse.ok) throw new Error('Failed to fetch TikTok data');

      const igData = igResponse ? await igResponse.json() : null;
      const tiktokData = tiktokResponse ? await tiktokResponse.json() : null;
      
      let bio = '';
      if (igData || tiktokData) {
        const bioResponse = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ instagramData: igData, tiktokData }),
        });
        if (!bioResponse.ok) throw new Error('Failed to generate bio');
        const bioResult = await bioResponse.json();
        bio = bioResult.bio;
      }
      
      setMediaKitData({
        instagramData: igData,
        tiktokData,
        bio,
        instagramHandle: instagram,
        tiktokHandle: tiktok,
      });

    } catch (error) {
      console.error(error);
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!mediaKitData) return;
    const res = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mediaKitData),
    });

    if (res.ok) {
      const blob = await res.blob();
      
      // Trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'media-kit.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();

    } else {
      alert('Failed to download PDF.');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
            Instagram Handle
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="instagram"
              id="instagram"
              className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="e.g., natgeo"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tiktok" className="block text-sm font-medium text-gray-700">
            TikTok Handle
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="tiktok"
              id="tiktok"
              className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={tiktok}
              onChange={(e) => setTiktok(e.target.value)}
              placeholder="e.g., averyywoods"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
          >
            {loading ? 'Generating...' : 'Generate Media Kit'}
          </button>
        </div>
      </form>
      {mediaKitData && (
        <div className="pt-6 relative">
           <div className="w-full h-px bg-gray-200 mb-6"></div>
           <h3 className="text-2xl font-bold text-center mb-2">Your Media Kit is Ready!</h3>
           <p className="text-center text-muted-foreground mb-6">Here's a preview of your AI-generated media kit. Ready to land your next brand deal?</p>
           
           <div className="relative">
             <div className="aspect-w-1 aspect-h-1 w-full max-w-2xl mx-auto blur-sm">
                <PDFViewer width="100%" height="100%">
                  <PDFTemplate {...mediaKitData} />
                </PDFViewer>
             </div>
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                <h4 className="text-2xl font-bold text-white mb-4">Unlock Full Version</h4>
                <button
                    onClick={handleDownload}
                    className="px-6 py-3 text-lg font-semibold text-white bg-primary rounded-md shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    Download PDF & Unlock
                </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
} 