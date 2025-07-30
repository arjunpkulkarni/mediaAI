import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-brand-primary/20 bg-brand-dark text-brand-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                  KitGen
                </h3>
                <p className="text-xs text-brand-light/70">AI Media Kits</p>
              </div>
            </div>
            <p className="text-sm text-brand-light/70">
              The fastest way for creators to generate professional media kits and land brand deals.
            </p>
            <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              Built by creators, for creators
            </Badge>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-sm text-brand-light/70">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#examples" className="hover:text-white transition-colors">Examples</a></li>
              <li><a href="#api" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-brand-light/70">
              <li><a href="#docs" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#community" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-brand-light/70">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-primary/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-brand-light/70">
            © 2024 KitGen. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-brand-light/70">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-brand-primary fill-current" />
            <span>for creators</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 