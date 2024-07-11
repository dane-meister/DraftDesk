'use client'

import { useState } from 'react';
import { SaveOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Modal, Button, Input } from 'antd';
import Header from './Header';

const { TextArea } = Input;

const TextEditor: React.FC = () => {
    const [text, setText] = useState('');
    const [font, setFont] = useState('Arial');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const save = () => {
        // Implement your save logic here
        setModalVisible(true);
    };

    const open = () => {
        // Implement your open logic here
        setModalVisible(true);
    };

    const spellCheck = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const content = (event.target as HTMLTextAreaElement).value;
        const spaceCount = content.split(' ').length - 1;
    
        // Clear previous tags
        // Implement your spell check logic here
    };

    return (
        <div className="flex flex-col h-screen">
            <Header onFontChange={setFont} />
            <div className="flex-1 bg-gray-100 p-4 mt-16">
                <div className="overflow-y-auto h-96 rounded-lg bg-white p-4">
                    <TextArea
                        spellCheck="false" // Disable browser's spell check
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoSize={{ minRows: 20 }}
                        className="w-full outline-none resize-none"
                        style={{ fontFamily: font }}
                        onKeyUp={spellCheck}
                    />
                </div>
            </div>

            <Modal
                title="DraftDesk"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setModalVisible(false)}>
                        Cancel
                    </Button>,
                ]}
            >
                <p>Modal content</p>
            </Modal>
        </div>
    );
};

export default TextEditor;
