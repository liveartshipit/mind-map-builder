import React from 'react';
import { LayersIcon, BookOpenIcon, FileTextIcon, SettingsIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: LayersIcon, label: 'Workspaces', active: true },
    { icon: BookOpenIcon, label: 'Saved Maps', active: false },
    { icon: FileTextIcon, label: 'Templates', active: false },
    { icon: SettingsIcon, label: 'Settings', active: false },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-card border-r border-border">
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-1">
          <LayersIcon className="h-6 w-6 text-primary-foreground" strokeWidth={2} />
        </div>
        <h1 className="font-display text-xl font-bold text-foreground">MindFlow</h1>
      </div>

      <nav className="flex-1 space-y-2 px-4">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? 'secondary' : 'ghost'}
            className={`w-full justify-start gap-3 ${
              item.active
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <item.icon className="h-5 w-5" strokeWidth={2} />
            <span className="font-normal">{item.label}</span>
          </Button>
        ))}
      </nav>

      <Separator className="my-4" />

      <div className="space-y-2 px-4 pb-6">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <UserIcon className="h-5 w-5" strokeWidth={2} />
          <span className="font-normal">Profile</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOutIcon className="h-5 w-5" strokeWidth={2} />
          <span className="font-normal">Log out</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
