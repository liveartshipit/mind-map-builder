import React from 'react';
import { Lightbulb, Target, Zap, Brain, Star, Rocket, ArrowRight, ArrowDown, ArrowUp, ArrowLeft, Minus, Circle, Square, Triangle, Diamond } from 'lucide-react';

const Sidebar: React.FC = () => {
  const blockTypes = [
    {
      id: 'idea',
      title: 'Idea',
      description: 'A new concept or thought',
      icon: Lightbulb,
      color: 'hsl(45, 100%, 51%)',
      type: 'block'
    },
    {
      id: 'goal',
      title: 'Goal',
      description: 'An objective to achieve',
      icon: Target,
      color: 'hsl(142, 71%, 45%)',
      type: 'block'
    },
    {
      id: 'action',
      title: 'Action',
      description: 'A task or step to take',
      icon: Zap,
      color: 'hsl(262, 83%, 58%)',
      type: 'block'
    },
    {
      id: 'insight',
      title: 'Insight',
      description: 'A key realization',
      icon: Brain,
      color: 'hsl(190, 75%, 50%)',
      type: 'block'
    },
    {
      id: 'priority',
      title: 'Priority',
      description: 'Something important',
      icon: Star,
      color: 'hsl(0, 84%, 60%)',
      type: 'block'
    },
    {
      id: 'milestone',
      title: 'Milestone',
      description: 'A significant achievement',
      icon: Rocket,
      color: 'hsl(280, 67%, 55%)',
      type: 'block'
    },
  ];

  const arrowTypes = [
    {
      id: 'arrow-right',
      title: 'Arrow Right',
      description: 'Directional arrow →',
      icon: ArrowRight,
      color: 'hsl(190, 75%, 50%)',
      type: 'arrow',
      direction: 'right'
    },
    {
      id: 'arrow-down',
      title: 'Arrow Down',
      description: 'Directional arrow ↓',
      icon: ArrowDown,
      color: 'hsl(190, 75%, 50%)',
      type: 'arrow',
      direction: 'down'
    },
    {
      id: 'arrow-up',
      title: 'Arrow Up',
      description: 'Directional arrow ↑',
      icon: ArrowUp,
      color: 'hsl(190, 75%, 50%)',
      type: 'arrow',
      direction: 'up'
    },
    {
      id: 'arrow-left',
      title: 'Arrow Left',
      description: 'Directional arrow ←',
      icon: ArrowLeft,
      color: 'hsl(190, 75%, 50%)',
      type: 'arrow',
      direction: 'left'
    },
  ];

  const shapeTypes = [
    {
      id: 'circle',
      title: 'Circle',
      description: 'Round shape',
      icon: Circle,
      color: 'hsl(280, 67%, 55%)',
      type: 'shape',
      shape: 'circle'
    },
    {
      id: 'square',
      title: 'Square',
      description: 'Box shape',
      icon: Square,
      color: 'hsl(142, 71%, 45%)',
      type: 'shape',
      shape: 'square'
    },
    {
      id: 'triangle',
      title: 'Triangle',
      description: 'Triangle shape',
      icon: Triangle,
      color: 'hsl(45, 100%, 51%)',
      type: 'shape',
      shape: 'triangle'
    },
    {
      id: 'diamond',
      title: 'Diamond',
      description: 'Diamond shape',
      icon: Diamond,
      color: 'hsl(0, 84%, 60%)',
      type: 'shape',
      shape: 'diamond'
    },
  ];

  const lineTypes = [
    {
      id: 'line-horizontal',
      title: 'Horizontal Line',
      description: 'Straight line —',
      icon: Minus,
      color: 'hsl(210, 15%, 50%)',
      type: 'line',
      orientation: 'horizontal'
    },
    {
      id: 'line-vertical',
      title: 'Vertical Line',
      description: 'Straight line |',
      icon: Minus,
      color: 'hsl(210, 15%, 50%)',
      type: 'line',
      orientation: 'vertical'
    },
  ];

  const handleDragStart = (e: React.DragEvent, block: any) => {
    e.dataTransfer.setData('blockData', JSON.stringify(block));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="w-80 bg-gradient-to-b from-card to-card/50 border-r border-border p-6 overflow-y-auto shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
          Mind Map Builder
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Drag blocks to canvas, connect ideas, and organize your thoughts
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Idea Blocks</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {blockTypes.length}
            </span>
          </div>
          <div className="space-y-3">
            {blockTypes.map((block) => (
              <div
                key={block.id}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
                className="group p-4 rounded-xl border-2 cursor-move hover:shadow-lg hover:scale-105 transition-all duration-200 bg-background relative overflow-hidden"
                style={{ borderColor: block.color }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200"
                  style={{ backgroundColor: block.color }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="p-1.5 rounded-lg"
                      style={{ backgroundColor: `${block.color}20` }}
                    >
                      <block.icon size={18} style={{ color: block.color }} />
                    </div>
                    <span className="font-semibold text-foreground">{block.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{block.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Arrows</h3>
            <span className="text-xs bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded-full">
              {arrowTypes.length}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {arrowTypes.map((arrow) => (
              <div
                key={arrow.id}
                draggable
                onDragStart={(e) => handleDragStart(e, arrow)}
                className="group p-3 rounded-lg border-2 cursor-move hover:shadow-lg hover:scale-105 transition-all duration-200 bg-background relative overflow-hidden"
                style={{ borderColor: arrow.color }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200"
                  style={{ backgroundColor: arrow.color }}
                />
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <arrow.icon size={20} style={{ color: arrow.color }} />
                  <span className="text-xs font-medium text-foreground text-center">{arrow.title.replace('Arrow ', '')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Shapes</h3>
            <span className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded-full">
              {shapeTypes.length}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {shapeTypes.map((shape) => (
              <div
                key={shape.id}
                draggable
                onDragStart={(e) => handleDragStart(e, shape)}
                className="group p-3 rounded-lg border-2 cursor-move hover:shadow-lg hover:scale-105 transition-all duration-200 bg-background relative overflow-hidden"
                style={{ borderColor: shape.color }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200"
                  style={{ backgroundColor: shape.color }}
                />
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <shape.icon size={20} style={{ color: shape.color }} />
                  <span className="text-xs font-medium text-foreground text-center">{shape.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Lines</h3>
            <span className="text-xs bg-gray-500/10 text-gray-500 px-2 py-1 rounded-full">
              {lineTypes.length}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {lineTypes.map((line) => (
              <div
                key={line.id}
                draggable
                onDragStart={(e) => handleDragStart(e, line)}
                className="group p-3 rounded-lg border-2 cursor-move hover:shadow-lg hover:scale-105 transition-all duration-200 bg-background relative overflow-hidden"
                style={{ borderColor: line.color }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200"
                  style={{ backgroundColor: line.color }}
                />
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <line.icon 
                    size={20} 
                    style={{ 
                      color: line.color,
                      transform: line.orientation === 'vertical' ? 'rotate(90deg)' : 'none'
                    }} 
                  />
                  <span className="text-xs font-medium text-foreground text-center">{line.title.replace(' Line', '')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className="w-1.5 h-5 bg-primary rounded-full" />
          Quick Guide
        </h3>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">1.</span>
            <span>Drag blocks onto the canvas to create ideas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>Click a block, then click another to connect them</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>Hover over connections to see delete option</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">4.</span>
            <span>Edit text directly in blocks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">5.</span>
            <span>Drag blocks to reposition them</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
