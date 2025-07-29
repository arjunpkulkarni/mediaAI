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
      title: "One-Click Generation",
      description: "Enter your social handles and get a professional media kit in under 30 seconds. No design skills required.",
      badge: "Lightning Fast"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real Analytics",
      description: "Automatically fetch your latest follower counts, engagement rates, and top-performing content.",
      badge: "Live Data"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Bio",
      description: "Our AI analyzes your content to create compelling bio sections that showcase your unique brand.",
      badge: "Smart Content"
    },
    {
      icon: <FileDown className="w-8 h-8" />,
      title: "Professional PDF",
      description: "Download a beautifully designed PDF that's ready to send to brands and agencies immediately.",
      badge: "Brand Ready"
    },
    {
      icon: <Instagram className="w-8 h-8" />,
      title: "Instagram Integration",
      description: "Pull your Instagram stats, top posts, and engagement metrics directly from your profile.",
      badge: "Instagram"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "TikTok Analytics",
      description: "Showcase your TikTok performance with views, likes, and viral content highlights.",
      badge: "TikTok"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Everything You Need to{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Land Brand Deals
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop spending hours in Canva. Generate professional media kits that convert brands into partnerships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative group hover:shadow-card transition-all duration-300 border-0 shadow-sm hover:shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-gradient-primary rounded-lg text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary mr-2" />
                <span className="text-3xl font-bold text-primary">89%</span>
              </div>
              <p className="text-muted-foreground">Higher Response Rate</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Users className="w-6 h-6 text-primary mr-2" />
                <span className="text-3xl font-bold text-primary">1000+</span>
              </div>
              <p className="text-muted-foreground">Creators Using KitGen</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary mr-2" />
                <span className="text-3xl font-bold text-primary">3x</span>
              </div>
              <p className="text-muted-foreground">Faster Brand Outreach</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 