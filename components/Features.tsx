import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  BarChart3, 
  Brain, 
  FileDown, 
  Instagram, 
  Video,
  Mail,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Land Deals in One Click",
      description: "Stop wasting hours in Canva. Go from social handles to a stunning, brand-ready media kit in 30 seconds.",
      badge: "Save Hours"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Impress brands with live, verifiable data. We automatically fetch your latest stats so you don't have to.",
      badge: "Always Updated"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Crafted Pitches",
      description: "Our AI writes compelling bios and content highlights that get you noticed. No more writer's block.",
      badge: "Smart"
    },
    {
      icon: <FileDown className="w-8 h-8" />,
      title: "Pitch-Perfect PDF",
      description: "Download a professionally designed PDF that makes brands say 'yes'. Get replies in hours, not weeks.",
      badge: "High-Converting"
    },
    {
      icon: <Instagram className="w-8 h-8" />,
      title: "Instagram Integration",
      description: "Showcase your Instagram success. We automatically fetch your top posts to prove your value to brands.",
      badge: "Instagram"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "TikTok Analytics",
      description: "Go viral and get paid. Highlight your TikTok success with real-time analytics and top-performing videos.",
      badge: "TikTok"
    }
  ];

  return (
    <section className="py-20 bg-brand-light/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark">
            Everything You Need to{' '}
            <span className="text-brand-primary">
              Land Brand Deals
            </span>
          </h2>
          <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto">
            Stop spending hours in Canva. Generate professional media kits that convert brands into partnerships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative group bg-white hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-gradient-primary rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs bg-brand-light text-brand-primary">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-brand-dark group-hover:text-brand-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-dark/70 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold text-brand-dark mb-4">Built By Creators, For Creators</h3>
          <p className="text-xl text-brand-dark/70 max-w-3xl mx-auto mb-12">
            We get it. You're a creator, not a designer. Here's what people are saying about their one-click media kits.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white">
              <CardContent className="p-6 text-left">
                <p className="text-brand-dark/70 mb-4 italic">"I sent this exact PDF to a brand and they said yes within 1 hour. This has never happened before."</p>
                <p className="font-semibold text-brand-dark">- Sarah J, Lifestyle Creator</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6 text-left">
                <p className="text-brand-dark/70 mb-4 italic">"I used to spend 2 hours in Canva. Now I just click one button. If I knew about this 3 years ago I'd be making so much more money."</p>
                <p className="font-semibold text-brand-dark">- David L, Tech Reviewer</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6 text-left">
                <p className="text-brand-dark/70 mb-4 italic">"I used to send my old media kit and get ghosted. The first kit I made here landed me 3 brand deals in a week."</p>
                <p className="font-semibold text-brand-dark">- Maria K, Fitness Coach</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
} 