import React, { useState } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface HeaderProps {
  onFontChange: (font: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onFontChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const fonts = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];

  const toggleHeader = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-200 px-4 py-2 ${isExpanded ? 'h-16' : 'h-8'}`}>
      <div>
        {/* Header content */}
        <span className="text-lg font-semibold">DraftDesk</span>
        
        {isExpanded && (
          <div className="inline-flex">
            <select 
              className="ml-4 bg-white hover:bg-gray-300 px-3 py-1 rounded-lg" 
              onChange={(e) => onFontChange(e.target.value)}
            >
              {fonts.map((font) => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div>
        {/* Toggle button to hide/unhide the header */}
        <button onClick={toggleHeader} className="focus:outline-none">
          {isExpanded ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </button>
      </div>
    </div>
  );
};

export default Header;

