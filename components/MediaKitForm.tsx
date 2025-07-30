// boulevard-app/src/components/MediaKitForm.tsx
"use client";

import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PDFTemplate from "./PDFTemplate";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormValues {
  instagram?: string;
  tiktok?: string;
  email: string;
}

export default function MediaKitForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { instagram: "", tiktok: "", email: "" },
  });

  const [loading, setLoading] = useState(false);
  const [mediaKitData, setMediaKitData] = useState<any>(null);

  const onSubmit = async (data: FormValues) => {
    const { instagram, tiktok, email } = data;
    if (!instagram && !tiktok) {
      alert("Please enter an Instagram or TikTok handle.");
      return;
    }

    setLoading(true);
    setMediaKitData(null);

    try {
      // Fetch Instagram & TikTok data in parallel
      const [igResponse, tiktokResponse] = await Promise.all([
        instagram
          ? fetch(`/api/instagram?handle=${encodeURIComponent(instagram)}`)
          : Promise.resolve(null),
        tiktok
          ? fetch(`/api/tiktok?handle=${encodeURIComponent(tiktok)}`)
          : Promise.resolve(null),
      ]);

      if (igResponse && !igResponse.ok) throw new Error("Failed to fetch Instagram data");
      if (tiktokResponse && !tiktokResponse.ok) throw new Error("Failed to fetch TikTok data");

      const igData = igResponse ? await igResponse.json() : null;
      const tiktokData = tiktokResponse ? await tiktokResponse.json() : null;

      // Generate bio via OpenAI
      let bio = "";
      if (igData || tiktokData) {
        const bioResponse = await fetch("/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ instagramData: igData, tiktokData }),
        });
        if (!bioResponse.ok) throw new Error("Failed to generate bio");
        const bioResult = await bioResponse.json();
        bio = bioResult.bio;
      }

      setMediaKitData({ ...data, instagramData: igData, tiktokData, bio });
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!mediaKitData) return;
    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mediaKitData),
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "media-kit.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } else {
      alert("Failed to download PDF.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 space-y-8"
    >
      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Your Media Kit</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="instagram">Instagram Handle</Label>
              <Input
                id="instagram"
                placeholder="e.g., natgeo"
                {...register("instagram")}
              />
            </div>
            <div>
              <Label htmlFor="tiktok">TikTok Handle</Label>
              <Input
                id="tiktok"
                placeholder="e.g., averyywoods"
                {...register("tiktok")}
              />
            </div>
            <div>
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Generating..." : "Generate Media Kit"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Preview Section */}
      {mediaKitData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold text-center">
            Your Media Kit is Ready!
          </h3>
          <div className="relative aspect-w-1 aspect-h-1 w-full max-w-2xl mx-auto transition-all">
            <div className="blur-sm hover:blur-0 transition duration-300">
              <PDFViewer width="100%" height="100%">
                <PDFTemplate {...mediaKitData} />
              </PDFViewer>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
              <Button onClick={handleDownload} variant="primary">
                Download Full PDF
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
