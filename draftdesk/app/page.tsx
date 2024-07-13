'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TextEditor from '@/components/TextEditor';
import Homepage from '@/components/HomePage';
import LandingPage from '@/components/LandingPage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { setToken, getToken, removeToken } from '@/utils/auth';

const Home: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/log-in');
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      removeToken();
      setIsAuthenticated(false);
      setShowTextEditor(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <main className="relative">
      <div>
        
      </div>
    </main>
  );
};

export default Home;


