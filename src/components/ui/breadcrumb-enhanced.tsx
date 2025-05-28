
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface EnhancedBreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  maxItems?: number;
}

// Route mappings for automatic breadcrumb generation
const routeLabels: Record<string, string> = {
  '/': 'Inicio',
  '/sports': 'Deportes',
  '/american-football': 'Fútbol Americano',
  '/basketball': 'Baloncesto',
  '/casino': 'Casino',
  '/blackjack': 'Blackjack',
  '/roulette': 'Ruleta',
  '/social': 'Social',
  '/leaderboard': 'Clasificación',
  '/profile': 'Perfil',
  '/admin': 'Admin',
  '/admin/dashboard': 'Panel de Control'
};

export const EnhancedBreadcrumb: React.FC<EnhancedBreadcrumbProps> = ({
  items,
  className,
  showHome = true,
  maxItems = 4
}) => {
  const location = useLocation();
  
  // Generate breadcrumbs from current path if no items provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    if (showHome && location.pathname !== '/') {
      breadcrumbs.push({
        label: 'Inicio',
        href: '/',
        icon: <Home className="w-4 h-4" />
      });
    }
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      breadcrumbs.push({
        label,
        href: index === pathSegments.length - 1 ? undefined : currentPath
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Truncate breadcrumbs if they exceed maxItems
  const displayBreadcrumbs = breadcrumbs.length > maxItems 
    ? [
        breadcrumbs[0],
        { label: '...', href: undefined },
        ...breadcrumbs.slice(-2)
      ]
    : breadcrumbs;
  
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <Breadcrumb className={cn("mb-4", className)}>
      <BreadcrumbList>
        {displayBreadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link 
                    to={item.href} 
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="flex items-center gap-2 font-medium">
                  {item.icon}
                  <span>{item.label}</span>
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < displayBreadcrumbs.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default EnhancedBreadcrumb;
