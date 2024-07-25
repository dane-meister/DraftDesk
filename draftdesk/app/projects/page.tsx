'use client';
import Homepage from '@/components/HomePage';
import { getToken, removeToken } from '@/utils/auth';
import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/navigation';
import UserData from '@/components/UserData';
import withAuth from '@/components/withAuth';
import NewProjectModal from '@/components/NewProjectModal';


const Projects: React.FC = () => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = React.useState(false);

    const handleNewProject = () => {
        setModalVisible(true);
    };

    const handleCreateProject = async (projectData: any) => {
        //const token = getToken();

        try {
          /*
          const formData = new FormData();
          formData.set('name', projectData.name);
          formData.append('name', projectData.name);
          formData.append('description', projectData.description);
          formData.append('tags', projectData.tags);
          if (projectData.coverImage) {
            formData.append('coverImage', projectData.coverImage);
          }
          console.log(formData);
          */
    
          const response = await axios.post('http://localhost:5000/projects', projectData, {
            withCredentials: true,
          });
    
          if (response.status === 201) {
            setModalVisible(false);
            router.push('/projects');
          }
        } catch (error) {
          console.error('Error creating project:', error);
        }
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
            <UserData />
            <Homepage onNewProject={handleNewProject} onLogout={handleLogout} />
            <NewProjectModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreate={handleCreateProject}
            />
        </div>
  );
};

export default withAuth(Projects);
