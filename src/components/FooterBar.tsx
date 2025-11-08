import React from 'react';
import { ZoomInIcon, ZoomOutIcon, Maximize2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMindMapStore } from '../stores/mindMapStore';

const FooterBar: React.FC = () => {
  const { nodes, zoom, setZoom, setPan } = useMindMapStore();

  const handleZoomIn = () => setZoom(zoom + 0.1);
  const handleZoomOut = () => setZoom(zoom - 0.1);
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const connectionCount = nodes.reduce((acc, node) => acc + node.connections.length, 0);

  return (
    <footer className="flex h-12 items-center justify-between border-t border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {nodes.length} {nodes.length === 1 ? 'idea' : 'ideas'}
        </span>
        <div className="h-4 w-px bg-border" />
        <span className="text-sm text-muted-foreground">
          {connectionCount} {connectionCount === 1 ? 'link' : 'links'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomOut}
          disabled={zoom <= 0.25}
          className="h-8 w-8 bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
          aria-label="Zoom out"
        >
          <ZoomOutIcon className="h-4 w-4" strokeWidth={2} />
        </Button>
        <span className="text-sm text-muted-foreground min-w-[4rem] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomIn}
          disabled={zoom >= 2}
          className="h-8 w-8 bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
          aria-label="Zoom in"
        >
          <ZoomInIcon className="h-4 w-4" strokeWidth={2} />
        </Button>
        <div className="mx-2 h-6 w-px bg-border" />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleResetView}
          className="h-8 w-8 bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Reset view"
        >
          <Maximize2Icon className="h-4 w-4" strokeWidth={2} />
        </Button>
      </div>
    </footer>
  );
};

export default FooterBar;
