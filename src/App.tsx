import React, { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import IdeaListDrawer from './components/IdeaListDrawer';
import MindMapCanvas from './components/MindMapCanvas';
import PropertyDrawer from './components/PropertyDrawer';
import FooterBar from './components/FooterBar';
import { useMindMapStore } from './stores/mindMapStore';

function App() {
  const { initializeStore } = useMindMapStore();

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        
        <div className="relative flex flex-1 overflow-hidden">
          <IdeaListDrawer />
          
          <main className="relative flex-1 overflow-hidden">
            <MindMapCanvas />
          </main>
          
          <PropertyDrawer />
        </div>
        
        <FooterBar />
      </div>
      
      <Toaster />
    </div>
  );
}

export default App;
