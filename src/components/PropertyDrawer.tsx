import React, { useState, useEffect } from 'react';
import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMindMapStore } from '../stores/mindMapStore';

const PropertyDrawer: React.FC = () => {
  const { nodes, selectedNodeId, isPropertyDrawerOpen, selectNode, updateNode } = useMindMapStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setTitle(selectedNode.title);
      setDescription(selectedNode.description);
      setTags(selectedNode.tags.join(', '));
      setColor(selectedNode.color);
    }
  }, [selectedNode]);

  const handleSave = () => {
    if (selectedNodeId) {
      updateNode(selectedNodeId, {
        title,
        description,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        color,
      });
    }
  };

  const colorOptions = [
    { label: 'Primary', value: 'hsl(261, 85%, 58%)' },
    { label: 'Secondary', value: 'hsl(261, 65%, 48%)' },
    { label: 'Tertiary', value: 'hsl(190, 75%, 50%)' },
    { label: 'Success', value: 'hsl(150, 60%, 40%)' },
    { label: 'Warning', value: 'hsl(35, 85%, 45%)' },
  ];

  if (!isPropertyDrawerOpen || !selectedNode) return null;

  return (
    <aside className="w-80 border-l border-border bg-card flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h3 className="font-display text-base font-semibold text-foreground">Properties</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => selectNode(null)}
          className="bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Close properties"
        >
          <XIcon className="h-5 w-5" strokeWidth={2} />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-foreground">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
              className="bg-background text-foreground border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleSave}
              rows={4}
              className="bg-background text-foreground border-input resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium text-foreground">
              Tags (comma separated)
            </Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              onBlur={handleSave}
              placeholder="planning, research, design"
              className="bg-background text-foreground border-input"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Color</Label>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setColor(option.value);
                    updateNode(selectedNodeId, { color: option.value });
                  }}
                  className={`h-10 w-10 rounded-lg border-2 transition-all ${
                    color === option.value ? 'border-foreground scale-110' : 'border-border'
                  }`}
                  style={{ backgroundColor: option.value }}
                  aria-label={option.label}
                />
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSave}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span className="font-normal">Save Changes</span>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default PropertyDrawer;
