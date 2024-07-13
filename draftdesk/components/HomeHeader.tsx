import React from 'react';
import { Button } from 'antd';

interface HomeHeaderProps {
    onLogout: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onLogout }) => {
    return (
        <header className="flex justify-between items-center bg-gray-200 p-4">
            <h1 className="text-xl font-bold">DraftDesk</h1>
            <Button type="link" onClick={onLogout}>
                Logout
            </Button>
        </header>
    );
};

export default HomeHeader;
