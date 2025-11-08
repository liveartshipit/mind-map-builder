import React, { useRef, useState } from 'react';
import { useMindMapStore, MindMapNode } from '../stores/mindMapStore';
import { Trash2 } from 'lucide-react';

interface LineElementProps {
  node: MindMapNode;
}

const LineElement: React.FC<LineElementProps> = ({ node }) => {
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
        const x = e.clientX - rect.left - dragOffset.x;
        const y = e.clientY - rect.top - dragOffset.y;
        updateNode(node.id, { x, y });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleDelete = () => {
    removeNode(node.id);
  };

  const isHorizontal = node.orientation === 'horizontal';
  const width = isHorizontal ? 150 : 4;
  const height = isHorizontal ? 4 : 150;

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
          width={width}
          height={height}
          className="drop-shadow-lg"
        >
          <defs>
            <filter id={`line-glow-${node.id}`}>
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <line
            x1={isHorizontal ? 0 : 2}
            y1={isHorizontal ? 2 : 0}
            x2={isHorizontal ? width : 2}
            y2={isHorizontal ? 2 : height}
            stroke={node.color}
            strokeWidth="4"
            strokeLinecap="round"
            filter={`url(#line-glow-${node.id})`}
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

export default LineElement;
