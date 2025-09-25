import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Home, Trophy, TrendingUp, User, Settings, Bell, MessageCircle, Wallet } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSwipeGestures } from '@/hooks/useSwipeGestures';
import { useNotifications } from '@/contexts/NotificationContext';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navigationItems: NavItem[] = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'Explore', href: '/sports', icon: Trophy },
  { title: 'Messages', href: '/social', icon: MessageCircle, badge: '1' },
  { title: 'Profile', href: '/profile', icon: User },
  { title: 'Wallet', href: '/wallet', icon: Wallet },
];

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close navigation when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Swipe gestures for navigation
  useSwipeGestures(sheetRef, {
    onSwipeLeft: () => setIsOpen(false),
  });

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg gradient-text">SportsBet</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse emoji-font"
                  style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              )}
            </Button>

            {/* Menu Toggle */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent 
                side="right" 
                className="w-80 p-0 animate-slide-in-right"
                ref={sheetRef}
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="font-semibold">SportsBet</h2>
                        <p className="text-sm text-muted-foreground">Your betting platform</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsOpen(false)}
                      className="p-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Navigation Items */}
                  <nav className="flex-1 py-4">
                    <ul className="space-y-2 px-4">
                      {navigationItems.map((item) => {
                        const isItemActive = isActive(item.href);
                        
                        return (
                          <li key={item.href}>
                            <NavLink
                              to={item.href}
                              className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300",
                                "hover:bg-accent hover:text-accent-foreground",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                "group",
                                isItemActive && "bg-primary text-primary-foreground shadow-lg"
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              <item.icon 
                                className={cn(
                                  "h-5 w-5 transition-transform duration-300",
                                  "group-hover:scale-110",
                                  isItemActive && "text-primary-foreground"
                                )} 
                              />
                              <span className="font-medium">{item.title}</span>
                              {item.badge && (
                                <Badge variant="secondary" className="ml-auto text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>

                  {/* Footer */}
                  <div className="p-4 border-t border-border">
                    <div className="text-center text-sm text-muted-foreground">
                      <p>Swipe left to close</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Bottom Tab Bar for Mobile - Updated for proper social navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const isItemActive = isActive(item.href);
            const showBadge = item.title === 'Messages' && item.badge;
            
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 relative",
                  "hover:bg-accent/50 min-w-[60px]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isItemActive && "text-primary"
                )}
              >
                <div className="relative">
                  <item.icon 
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      isItemActive && "scale-110 text-primary animate-bounce-subtle"
                    )} 
                  />
                  {showBadge && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs animate-pulse"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span 
                  className={cn(
                    "text-xs font-medium transition-all duration-300 emoji-font",
                    isItemActive ? "text-primary" : "text-muted-foreground"
                  )}
                  style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}
                >
                  {item.title}
                </span>
                {isItemActive && (
                  <div className="w-1 h-1 bg-primary rounded-full animate-scale-in" />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Spacer for fixed header and bottom nav */}
      <div className="lg:hidden h-14" /> {/* Top spacer */}
      <div className="lg:hidden h-16" /> {/* Bottom spacer */}
    </>
  );
};