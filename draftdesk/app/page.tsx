'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TextEditor from '@/components/TextEditor';
import Homepage from '@/components/HomePage';
import LandingPage from '@/components/LandingPage';

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by checking for a token
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleNewProject = () => {
    
  };

  const handleLogin = () => {
    // Handle login logic and set the user as authenticated
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Handle logout logic and set the user as not authenticated
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <main className="relative">
      <div>
        {!isAuthenticated ? (
          <LandingPage onLogin={handleLogin} />
        ) : (
          showTextEditor ? (
            <>
              <Header
                onFontChange={(font: string) => {
                  console.log(`Font changed to ${font}`);
                }}
              />
              <TextEditor />
            </>
          ) : (
            <Homepage onNewProject={handleNewProject} onLogout={handleLogout} />
          )
        )}
      </div>
    </main>
  );
};

export default Home;


