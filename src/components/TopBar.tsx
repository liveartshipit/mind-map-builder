import React from 'react';
import { UndoIcon, RedoIcon, Share2Icon, DownloadIcon, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMindMapStore } from '../stores/mindMapStore';

const TopBar: React.FC = () => {
  const { workspaceName, toggleIdeaList } = useMindMapStore();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden bg-transparent text-foreground hover:bg-muted"
          onClick={toggleIdeaList}
          aria-label="Toggle menu"
        >
          <MenuIcon className="h-5 w-5" strokeWidth={2} />
        </Button>
        <h2 className="font-display text-lg font-semibold text-foreground">{workspaceName}</h2>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Undo"
        >
          <UndoIcon className="h-5 w-5" strokeWidth={2} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Redo"
        >
          <RedoIcon className="h-5 w-5" strokeWidth={2} />
        </Button>
        <div className="mx-2 h-6 w-px bg-border" />
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Share"
        >
          <Share2Icon className="h-5 w-5" strokeWidth={2} />
        </Button>
        <Button
          variant="default"
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <DownloadIcon className="h-5 w-5" strokeWidth={2} />
          <span className="hidden sm:inline font-normal">Export</span>
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
