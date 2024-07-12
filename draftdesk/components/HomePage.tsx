import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import HomeHeader from './HomeHeader'; // Adjust the path based on your project structure

interface HomepageProps {
    onNewProject: () => void;
    onLogout: () => void; // Define the logout handler
}

const Homepage: React.FC<HomepageProps> = ({ onNewProject, onLogout }) => {
    const handleOpenFile = () => {
        // Implement the logic to open an existing file
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <HomeHeader onLogout={onLogout} />
            <div className="mt-8">
                <h1 className="text-3xl font-bold mb-8">Projects</h1>
                <div className="flex flex-col items-center mb-8">
                    <p className="text-gray-500">No projects yet.</p>
                </div>
                <div className="flex space-x-4">
                    <Button
                        onClick={onNewProject}
                        className="flex items-center justify-center w-40 h-40 bg-white border-2 border-gray-300 rounded-lg shadow-lg"
                    >
                        <div className="flex flex-col items-center">
                            <PlusOutlined style={{ fontSize: '24px' }} />
                            <span className="mt-2">New Project</span>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Homepage;


