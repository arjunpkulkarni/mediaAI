import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Menu } from 'lucide-react';

interface HeaderProps {
  onGetStarted: () => void;
}

export function Header({ onGetStarted }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  KitGen
                </h1>
                <p className="text-xs text-brand-light">AI Media Kits</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-brand-light hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-brand-light hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#examples" className="text-sm font-medium text-brand-light hover:text-white transition-colors">
              Examples
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="hidden sm:flex bg-white/20 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Beta
            </Badge>
            <Button onClick={onGetStarted} className="bg-white text-brand-primary hover:bg-white/90">
              Get Started
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 