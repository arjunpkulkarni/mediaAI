"use client";
import React, { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import MediaKitForm from "@/components/MediaKitForm";
import { Footer } from '@/components/Footer';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onGetStarted={handleGetStarted} />
      
      <main>
        {!showForm ? (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <section id="features">
              <Features />
            </section>
            <section id="pricing">
              <Pricing onGetStarted={handleGetStarted} />
            </section>
          </>
        ) : (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div ref={formRef}>
                <MediaKitForm />
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}; 