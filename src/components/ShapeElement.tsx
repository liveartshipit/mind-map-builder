import React, { useRef, useState } from 'react';
import { useMindMapStore, MindMapNode } from '../stores/mindMapStore';
import { Trash2 } from 'lucide-react';

interface ShapeElementProps {
  node: MindMapNode;
}

const ShapeElement: React.FC<ShapeElementProps> = ({ node }) => {
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

  const getShapePath = () => {
    const size = 80;
    const center = size / 2;
    switch (node.shape) {
      case 'circle':
        return <circle cx={center} cy={center} r={center - 5} />;
      case 'square':
        return <rect x="5" y="5" width={size - 10} height={size - 10} rx="4" />;
      case 'triangle':
        return <path d={`M ${center} 5 L ${size - 5} ${size - 5} L 5 ${size - 5} Z`} />;
      case 'diamond':
        return <path d={`M ${center} 5 L ${size - 5} ${center} L ${center} ${size - 5} L 5 ${center} Z`} />;
      default:
        return <circle cx={center} cy={center} r={center - 5} />;
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
          width="80"
          height="80"
          className="drop-shadow-lg"
        >
          <defs>
            <filter id={`shape-glow-${node.id}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g
            stroke={node.color}
            strokeWidth="3"
            fill="none"
            filter={`url(#shape-glow-${node.id})`}
          >
            {getShapePath()}
          </g>
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

export default ShapeElement;
