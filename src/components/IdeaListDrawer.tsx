import React, { useState } from 'react';
import { PlusIcon, GripVerticalIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMindMapStore } from '../stores/mindMapStore';

const IdeaListDrawer: React.FC = () => {
  const { ideaList, isIdeaListOpen, addIdeaToList, removeIdeaFromList } = useMindMapStore();
  const [newIdeaTitle, setNewIdeaTitle] = useState('');

  const handleAddIdea = () => {
    if (newIdeaTitle.trim()) {
      addIdeaToList({
        title: newIdeaTitle,
        description: '',
        tags: [],
      });
      setNewIdeaTitle('');
    }
  };

  const handleDragStart = (e: React.DragEvent, ideaId: string) => {
    e.dataTransfer.setData('ideaId', ideaId);
    e.dataTransfer.effectAllowed = 'move';
  };

  if (!isIdeaListOpen) return null;

  return (
    <aside className="w-80 border-r border-border bg-card flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h3 className="font-display text-base font-semibold text-foreground">Idea Backlog</h3>
      </div>

      <div className="px-6 py-4 border-b border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Add new idea..."
            value={newIdeaTitle}
            onChange={(e) => setNewIdeaTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddIdea()}
            className="flex-1 bg-background text-foreground border-input"
          />
          <Button
            size="icon"
            onClick={handleAddIdea}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            aria-label="Add idea"
          >
            <PlusIcon className="h-5 w-5" strokeWidth={2} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {ideaList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">No ideas yet</p>
              <p className="text-xs text-muted-foreground mt-1">Add your first idea above</p>
            </div>
          ) : (
            ideaList.map((idea) => (
              <div
                key={idea.id}
                draggable
                onDragStart={(e) => handleDragStart(e, idea.id)}
                className="group relative flex items-start gap-3 rounded-lg border border-border bg-background p-4 cursor-move hover:border-primary transition-colors"
              >
                <GripVerticalIcon className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" strokeWidth={2} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">{idea.title}</h4>
                  {idea.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{idea.description}</p>
                  )}
                  {idea.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {idea.tags.map((tag, idx) => (
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeIdeaFromList(idea.id)}
                  aria-label="Remove idea"
                >
                  <XIcon className="h-4 w-4" strokeWidth={2} />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default IdeaListDrawer;
