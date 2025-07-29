import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                  KitGen
                </h3>
                <p className="text-xs text-muted-foreground">AI Media Kits</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              The fastest way for creators to generate professional media kits and land brand deals.
            </p>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Built by creators, for creators
            </Badge>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#examples" className="hover:text-foreground transition-colors">Examples</a></li>
              <li><a href="#api" className="hover:text-foreground transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#docs" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#blog" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#help" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#community" className="hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#terms" className="hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 KitGen. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for creators</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 