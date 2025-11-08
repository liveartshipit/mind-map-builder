import { create } from 'zustand';

export interface IdeaNode {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  color: string;
  tags: string[];
  connections: string[];
}

export interface IdeaListItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

interface MindMapState {
  nodes: IdeaNode[];
  ideaList: IdeaListItem[];
  selectedNodeId: string | null;
  isIdeaListOpen: boolean;
  isPropertyDrawerOpen: boolean;
  zoom: number;
  pan: { x: number; y: number };
  workspaceName: string;
  
  addNode: (node: Omit<IdeaNode, 'id'>) => void;
  updateNode: (id: string, updates: Partial<IdeaNode>) => void;
  deleteNode: (id: string) => void;
  selectNode: (id: string | null) => void;
  addConnection: (fromId: string, toId: string) => void;
  removeConnection: (fromId: string, toId: string) => void;
  
  addIdeaToList: (idea: Omit<IdeaListItem, 'id'>) => void;
  removeIdeaFromList: (id: string) => void;
  moveIdeaToCanvas: (id: string, x: number, y: number) => void;
  
  toggleIdeaList: () => void;
  togglePropertyDrawer: () => void;
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  setWorkspaceName: (name: string) => void;
  
  initializeStore: () => void;
  saveToLocalStorage: () => void;
}

export const useMindMapStore = create<MindMapState>((set, get) => ({
  nodes: [],
  ideaList: [],
  selectedNodeId: null,
  isIdeaListOpen: true,
  isPropertyDrawerOpen: false,
  zoom: 1,
  pan: { x: 0, y: 0 },
  workspaceName: 'My Workspace',
  
  addNode: (node) => {
    const newNode: IdeaNode = {
      ...node,
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
    get().saveToLocalStorage();
  },
  
  updateNode: (id, updates) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, ...updates } : node
      ),
    }));
    get().saveToLocalStorage();
  },
  
  deleteNode: (id) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id).map((node) => ({
        ...node,
        connections: node.connections.filter((connId) => connId !== id),
      })),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    }));
    get().saveToLocalStorage();
  },
  
  selectNode: (id) => {
    set({ selectedNodeId: id, isPropertyDrawerOpen: id !== null });
  },
  
  addConnection: (fromId, toId) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === fromId && !node.connections.includes(toId)
          ? { ...node, connections: [...node.connections, toId] }
          : node
      ),
    }));
    get().saveToLocalStorage();
  },
  
  removeConnection: (fromId, toId) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === fromId
          ? { ...node, connections: node.connections.filter((id) => id !== toId) }
          : node
      ),
    }));
    get().saveToLocalStorage();
  },
  
  addIdeaToList: (idea) => {
    const newIdea: IdeaListItem = {
      ...idea,
      id: `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    set((state) => ({
      ideaList: [...state.ideaList, newIdea],
    }));
    get().saveToLocalStorage();
  },
  
  removeIdeaFromList: (id) => {
    set((state) => ({
      ideaList: state.ideaList.filter((idea) => idea.id !== id),
    }));
    get().saveToLocalStorage();
  },
  
  moveIdeaToCanvas: (id, x, y) => {
    const state = get();
    const idea = state.ideaList.find((i) => i.id === id);
    if (idea) {
      state.addNode({
        title: idea.title,
        description: idea.description,
        x,
        y,
        color: 'hsl(261, 85%, 58%)',
        tags: idea.tags,
        connections: [],
      });
      state.removeIdeaFromList(id);
    }
  },
  
  toggleIdeaList: () => {
    set((state) => ({ isIdeaListOpen: !state.isIdeaListOpen }));
  },
  
  togglePropertyDrawer: () => {
    set((state) => ({ isPropertyDrawerOpen: !state.isPropertyDrawerOpen }));
  },
  
  setZoom: (zoom) => {
    set({ zoom: Math.max(0.25, Math.min(2, zoom)) });
  },
  
  setPan: (pan) => {
    set({ pan });
  },
  
  setWorkspaceName: (name) => {
    set({ workspaceName: name });
    get().saveToLocalStorage();
  },
  
  initializeStore: () => {
    const saved = localStorage.getItem('mindmap-data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        set({
          nodes: data.nodes || [],
          ideaList: data.ideaList || [],
          workspaceName: data.workspaceName || 'My Workspace',
        });
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    } else {
      set({
        ideaList: [
          {
            id: 'idea-1',
            title: 'Project Goals',
            description: 'Define the main objectives',
            tags: ['planning'],
          },
          {
            id: 'idea-2',
            title: 'Research Phase',
            description: 'Gather information and insights',
            tags: ['research'],
          },
          {
            id: 'idea-3',
            title: 'Design Mockups',
            description: 'Create visual prototypes',
            tags: ['design'],
          },
        ],
      });
    }
  },
  
  saveToLocalStorage: () => {
    const state = get();
    localStorage.setItem(
      'mindmap-data',
      JSON.stringify({
        nodes: state.nodes,
        ideaList: state.ideaList,
        workspaceName: state.workspaceName,
      })
    );
  },
}));
