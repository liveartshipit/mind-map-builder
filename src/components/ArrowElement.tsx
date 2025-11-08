import React, { useRef, useState } from 'react';
import { useMindMapStore, MindMapNode } from '../stores/mindMapStore';
import { Trash2 } from 'lucide-react';

interface ArrowElementProps {
  node: MindMapNode;
}

const ArrowElement: React.FC<ArrowElementProps> = ({ node }) => {
  const { updateNode, removeNode } = useMindMapStore();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && elementRef.current) {
      const canvas = elementRef.current.parentElement;
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
  }, [isDragging, dragOffset]);

  const handleDelete = () => {
    removeNode(node.id);
  };

  const getArrowPath = () => {
    const size = 100;
    switch (node.direction) {
      case 'right':
        return `M 10 50 L 70 50 M 70 50 L 55 35 M 70 50 L 55 65`;
      case 'left':
        return `M 90 50 L 30 50 M 30 50 L 45 35 M 30 50 L 45 65`;
      case 'down':
        return `M 50 10 L 50 70 M 50 70 L 35 55 M 50 70 L 65 55`;
      case 'up':
        return `M 50 90 L 50 30 M 50 30 L 35 45 M 50 30 L 65 45`;
      default:
        return `M 10 50 L 70 50 M 70 50 L 55 35 M 70 50 L 55 65`;
    }
  };

  return (
    <div
      ref={elementRef}
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
        zIndex: 10,
      }}
      className="absolute cursor-move group"
      onMouseDown={handleMouseDown}
    >
      <div className="relative">
        <svg
          width="100"
          height="100"
          className="drop-shadow-lg"
        >
          <defs>
            <filter id={`arrow-glow-${node.id}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d={getArrowPath()}
            stroke={node.color}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#arrow-glow-${node.id})`}
          />
        </svg>
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
};

export default ArrowElement;
