import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Download } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center space-y-8">
          {/* Badge */}
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Media Kit Generator
          </Badge>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Create Professional{' '}
              <span className="text-black">
                Media Kits
              </span>{' '}
              in Seconds
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Input your Instagram and TikTok handles, get a branded AI-powered media kit PDF instantly. 
              Perfect for landing brand deals and showcasing your creator metrics.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="bg-black hover:opacity-90 shadow-glow text-lg px-8 py-6"
            >
              <Zap className="w-5 h-5 mr-2" />
              Generate My Media Kit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Download className="w-5 h-5 mr-2" />
              View Sample Kit
            </Button>
          </div>

          {/* Social Proof */}
          <div className="pt-8 space-y-4">
            <p className="text-sm text-muted-foreground">Trusted by creators worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full"></div>
                <span className="font-semibold">1000+ Media Kits Created</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full"></div>
                <span className="font-semibold">500+ Brand Deals Landed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
} 