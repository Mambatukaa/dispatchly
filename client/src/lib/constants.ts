import { LayoutDashboard, Truck, Users, Settings } from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const APP_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Loads', href: '/loads', icon: Truck },
  { label: 'Drivers', href: '/drivers', icon: Users },
  { label: 'Settings', href: '/settings', icon: Settings }
];
