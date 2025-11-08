import React, { useState, useRef } from 'react';
import { GripVerticalIcon, Link2Icon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMindMapStore } from '../stores/mindMapStore';

interface IdeaBlockProps {
  node: {
    id: string;
    title: string;
    x: number;
    y: number;
    color: string;
    tags: string[];
  };
  connectingFrom: string | null;
  setConnectingFrom: (id: string | null) => void;
}

const IdeaBlock: React.FC<IdeaBlockProps> = ({ node, connectingFrom, setConnectingFrom }) => {
  const { updateNode, selectNode, deleteNode, addConnection } = useMindMapStore();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const blockRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && blockRef.current) {
      setIsDragging(true);
      const rect = blockRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      e.stopPropagation();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && blockRef.current) {
      const canvas = blockRef.current.parentElement;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const zoom = parseFloat(canvas.style.transform.match(/scale\(([\d.]+)\)/)?.[1] || '1');
        const pan = {
          x: parseFloat(canvas.style.transform.match(/translate\(([-\d.]+)px/)?.[1] || '0'),
          y: parseFloat(canvas.style.transform.match(/translate\([-\d.]+px,\s*([-\d.]+)px/)?.[1] || '0'),
        };
        
        const newX = (e.clientX - rect.left - pan.x - dragOffset.x) / zoom;
        const newY = (e.clientY - rect.top - pan.y - dragOffset.y) / zoom;
        
        updateNode(node.id, { x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      selectNode(node.id);
      e.stopPropagation();
    }
  };

  const handleConnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (connectingFrom === null) {
      setConnectingFrom(node.id);
    } else if (connectingFrom !== node.id) {
      addConnection(connectingFrom, node.id);
      setConnectingFrom(null);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(node.id);
  };

  return (
    <div
      ref={blockRef}
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
        borderColor: node.color,
        zIndex: 10,
      }}
      className="absolute w-64 rounded-lg border-2 bg-card p-4 shadow-md cursor-move hover:shadow-lg transition-shadow"
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div className="flex items-start gap-2">
        <GripVerticalIcon className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" strokeWidth={2} />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground break-words">{node.title}</h4>
          {node.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {node.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 ${
            connectingFrom === node.id
              ? 'bg-tertiary text-tertiary-foreground'
              : 'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          onClick={handleConnect}
          aria-label="Connect node"
        >
          <Link2Icon className="h-4 w-4" strokeWidth={2} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-transparent text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleDelete}
          aria-label="Delete node"
        >
          <Trash2Icon className="h-4 w-4" strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
};

export default IdeaBlock;
