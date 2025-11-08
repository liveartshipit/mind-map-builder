import React, { useState } from 'react';
import { useMindMapStore } from '../stores/mindMapStore';
import { Trash2 } from 'lucide-react';

interface ConnectorProps {
  fromId: string;
  toId: string;
}

const Connector: React.FC<ConnectorProps> = ({ fromId, toId }) => {
  const { nodes, removeConnection } = useMindMapStore();
  const [isHovered, setIsHovered] = useState(false);

  const fromNode = nodes.find((n) => n.id === fromId);
  const toNode = nodes.find((n) => n.id === toId);

  if (!fromNode || !toNode) return null;

  const fromX = fromNode.x + 128;
  const fromY = fromNode.y + 40;
  const toX = toNode.x + 128;
  const toY = toNode.y + 40;

  const dx = toX - fromX;
  const dy = toY - fromY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const controlOffset = Math.min(distance * 0.3, 100);
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;

  const path = `M ${fromX} ${fromY} Q ${midX} ${midY - controlOffset} ${toX} ${toY}`;

  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeConnection(fromId, toId);
  };

  return (
    <svg
      className="absolute inset-0"
      style={{ overflow: 'visible', zIndex: isHovered ? 5 : 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        <marker
          id={`arrowhead-${fromId}-${toId}`}
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
        >
          <path
            d="M 0 0 L 12 6 L 0 12 Z"
            fill={isHovered ? 'hsl(190, 100%, 60%)' : 'hsl(190, 75%, 50%)'}
            className="transition-colors duration-200"
          />
        </marker>
        
        <filter id={`glow-${fromId}-${toId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={isHovered ? "4" : "2"} result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <linearGradient id={`gradient-${fromId}-${toId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(190, 75%, 50%)" stopOpacity="0.9"/>
          <stop offset="50%" stopColor="hsl(195, 85%, 55%)" stopOpacity="1"/>
          <stop offset="100%" stopColor="hsl(200, 90%, 60%)" stopOpacity="0.9"/>
        </linearGradient>

        <filter id={`shadow-${fromId}-${toId}`}>
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>

      <path
        d={path}
        stroke="transparent"
        strokeWidth="20"
        fill="none"
        className="cursor-pointer"
        style={{ pointerEvents: 'stroke' }}
      />

      <path
        d={path}
        stroke={`url(#gradient-${fromId}-${toId})`}
        strokeWidth={isHovered ? "4" : "3"}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={`url(#arrowhead-${fromId}-${toId})`}
        filter={`url(#glow-${fromId}-${toId})`}
        opacity={isHovered ? "1" : "0.85"}
        className="transition-all duration-200 pointer-events-none"
        strokeDasharray={isHovered ? "0" : "5 5"}
      />

      <circle
        cx={fromX}
        cy={fromY}
        r={isHovered ? "7" : "6"}
        fill="hsl(190, 75%, 50%)"
        stroke="white"
        strokeWidth="2.5"
        filter={`url(#shadow-${fromId}-${toId})`}
        className="transition-all duration-200 pointer-events-none"
      />

      <circle
        cx={toX}
        cy={toY}
        r={isHovered ? "7" : "6"}
        fill="hsl(200, 90%, 60%)"
        stroke="white"
        strokeWidth="2.5"
        filter={`url(#shadow-${fromId}-${toId})`}
        className="transition-all duration-200 pointer-events-none"
      />

      <circle
        cx={midX}
        cy={midY - controlOffset}
        r={isHovered ? "5" : "4"}
        fill="hsl(195, 80%, 55%)"
        opacity={isHovered ? "1" : "0.6"}
        className="transition-all duration-200 pointer-events-none"
        style={{
          animation: isHovered ? 'none' : 'pulse-glow 2s ease-in-out infinite'
        }}
      />

      {isHovered && (
        <g>
          <circle
            cx={midX}
            cy={midY - controlOffset}
            r="16"
            fill="white"
            stroke="hsl(0, 75%, 50%)"
            strokeWidth="2"
            className="cursor-pointer"
            onClick={handleDelete}
          />
          <foreignObject
            x={midX - 12}
            y={midY - controlOffset - 12}
            width="24"
            height="24"
            className="pointer-events-none"
          >
            <div className="flex items-center justify-center w-full h-full">
              <Trash2 size={14} className="text-red-500" />
            </div>
          </foreignObject>
        </g>
      )}
    </svg>
  );
};

export default Connector;
