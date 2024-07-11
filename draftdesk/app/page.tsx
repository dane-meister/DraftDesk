'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import TextEditor from '@/components/TextEditor';
import Homepage from '@/components/HomePage';

const Home: React.FC = () => {
  const [showTextEditor, setShowTextEditor] = useState(false);

  const handleNewProject = () => {
    setShowTextEditor(true);
  };

  return (
    <main className="relative">
      <div>
        {showTextEditor ? (
          <>
            <Header
              onFontChange={(font: string) => {
                console.log(`Font changed to ${font}`);
              }}
            />
            <TextEditor />
          </>
        ) : (
          <Homepage onNewProject={handleNewProject} />
        )}
      </div>
    </main>
  );
};

export default Home;

