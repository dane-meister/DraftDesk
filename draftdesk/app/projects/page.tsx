'use client';
import Homepage from '@/components/HomePage';
import { removeToken } from '@/utils/auth';
import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/navigation';

const Projects: React.FC = () => {
    const router = useRouter();

    const handleNewProject = () => {
        // Implement the logic to create a new project
        console.log('Creating a new project');
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            removeToken();
            router.push('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
      };

    return (
        <div>
            <Homepage onNewProject={handleNewProject} onLogout={handleLogout} />
        </div>
  );
};

export default Projects;
