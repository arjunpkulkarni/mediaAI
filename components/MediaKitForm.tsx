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
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormValues {
  instagram?: string;
  tiktok?: string;
  email: string;
  name: string;
}

export default function MediaKitForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { instagram: "", tiktok: "", email: "", name: "" },
  });

  const [loading, setLoading] = useState(false);
  const [mediaKitData, setMediaKitData] = useState<any>(null);

  const onSubmit = async (data: FormValues) => {
    const { instagram, tiktok, email, name } = data;
    if (!instagram && !tiktok) {
      alert("Please enter an Instagram or TikTok handle.");
      return;
    }

    console.log("Form submitted with data:", data);
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
        console.log("Bio generated:", bio);
      }

      const newMediaKitData = {
        ...data,
        instagramData: igData,
        tiktokData,
        bio,
        instagramHandle: instagram,
        tiktokHandle: tiktok,
        name,
        profilePicture: igData?.profileDetails?.profilePicUrl || tiktokData?.stats?.profilePicUrl,
      };

      setMediaKitData(newMediaKitData);
      console.log("Media kit data set:", newMediaKitData);
    } catch (err: any) {
      console.error("Error in onSubmit:", err);
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!mediaKitData) return;

    console.log("Downloading PDF with data:", mediaKitData);
    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mediaKitData),
    });

    if (res.ok) {
      console.log("PDF generated successfully");
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
      console.error("Failed to download PDF");
      alert("Failed to download PDF.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create Your Professional Media Kit
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your social media handles to generate a stunning, data-driven
            media kit in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="font-semibold">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Jane Doe"
                  {...register("name", { required: "Full Name is required" })}
                  className="mt-1"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="font-semibold">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="instagram" className="font-semibold">
                  Instagram Handle
                </Label>
                <Input
                  id="instagram"
                  placeholder="e.g., natgeo"
                  {...register("instagram")}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="tiktok" className="font-semibold">
                  TikTok Handle
                </Label>
                <Input
                  id="tiktok"
                  placeholder="e.g., averyywoods"
                  {...register("tiktok")}
                  className="mt-1"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full text-lg py-3"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Generating..." : "Generate Media Kit"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {mediaKitData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Your Media Kit is Ready!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden border">
                <div className="absolute inset-0">
                  <PDFViewer width="100%" height="100%">
                    <PDFTemplate {...mediaKitData} />
                  </PDFViewer>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 transition-opacity opacity-100 hover:opacity-0">
                  <h3 className="text-white text-3xl font-bold">
                    Hover to Preview
                  </h3>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button onClick={handleDownload} size="lg">
                  Download Full PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
