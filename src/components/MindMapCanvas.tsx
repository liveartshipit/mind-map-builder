import React, { useRef, useState, useEffect } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMindMapStore } from '../stores/mindMapStore';
import IdeaBlock from './IdeaBlock';
import Connector from './Connector';
import ArrowElement from './ArrowElement';
import ShapeElement from './ShapeElement';
import LineElement from './LineElement';

const MindMapCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    nodes,
    zoom,
    pan,
    setZoom,
    setPan,
    addNode,
    moveIdeaToCanvas,
  } = useMindMapStore();

  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom(zoom + delta);
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      return () => canvas.removeEventListener('wheel', handleWheel);
    }
  }, [zoom, setZoom]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.target === canvasRef.current)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const ideaId = e.dataTransfer.getData('ideaId');
    if (ideaId && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;
      moveIdeaToCanvas(ideaId, x, y);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleAddNode = () => {
    const centerX = (window.innerWidth / 2 - pan.x) / zoom;
    const centerY = (window.innerHeight / 2 - pan.y) / zoom;
    addNode({
      title: 'New Idea',
      description: '',
      x: centerX,
      y: centerY,
      color: 'hsl(261, 85%, 58%)',
      tags: [],
      connections: [],
    });
  };

  return (
    <div
      ref={canvasRef}
      className="relative h-full w-full overflow-hidden bg-gradient-to-br from-neutral via-background to-neutral grid-pattern cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
        className="absolute inset-0"
      >
        {nodes.map((node) =>
          node.connections.map((targetId) => (
            <Connector key={`${node.id}-${targetId}`} fromId={node.id} toId={targetId} />
          ))
        )}

        {nodes.map((node) => (
          <IdeaBlock
            key={node.id}
            node={node}
            connectingFrom={connectingFrom}
            setConnectingFrom={setConnectingFrom}
          />
        ))}
      </div>

      {nodes.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-lg font-display text-muted-foreground">Drag your first idea here!</p>
            <p className="text-sm text-muted-foreground">Or click the button below to add one</p>
            <Button
              onClick={handleAddNode}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <PlusIcon className="h-5 w-5" strokeWidth={2} />
              <span className="font-normal">Add Idea</span>
            </Button>
          </div>
        </div>
      )}

      <Button
        onClick={handleAddNode}
        size="icon"
        className="absolute bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
        aria-label="Add new idea"
      >
        <PlusIcon className="h-6 w-6" strokeWidth={2} />
      </Button>
    </div>
  );
};

export default MindMapCanvas;
