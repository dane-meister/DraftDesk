'use client'

import { useState } from 'react';
import { SaveOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Modal, Button, Input } from 'antd';

const { TextArea } = Input;

const TextEditor: React.FC = () => {
    const [text, setText] = useState('');
    const [wordList] = useState(new Set<string>());
    const [oldSpaces, setOldSpaces] = useState<number>(0);
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
        setOldSpaces(spaceCount);
    };

    return (
        <div className="flex h-screen">
            <div className="m-auto w-3/5">
                <TextArea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    autoSize={{ minRows: 20 }}
                    className="border p-2 w-full"
                    onKeyUp={spellCheck}
                />

                <div className="mt-2 flex justify-between">
                    <Button type="primary" icon={<SaveOutlined />} onClick={save}>
                        Save
                    </Button>
                    <Button type="primary" icon={<FolderOpenOutlined />} onClick={open}>
                        Open
                    </Button>
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
