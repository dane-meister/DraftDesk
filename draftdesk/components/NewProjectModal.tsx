import React, { useState } from 'react';
import { Modal, Button, Input, Form, Checkbox, Row, Col } from 'antd';

interface NewProjectModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (projectData: any) => void;
}

const genres = [
  'Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance',
  'Western', 'Dystopian', 'Contemporary', 'Historical Fiction',
  'Horror', 'Literary Fiction', 'Magical Realism', 'Adventure',
  'Paranormal', 'Short Story', 'Young Adult', 'New Adult',
  'Children\'s', 'Non-Fiction', 'Memoir', 'Biography',
  'Self-Help', 'Essay', 'Poetry', 'Speculative', 'Religious',
  'Spiritual', 'Philosophical', 'Political', 'Satire', 'Humor',
  'Autobiography', 'Anthology', 'Crime', 'Detective', 'Mythology', 'Fable',
  'Gothic', 'Mythology', 'Cookbook', 'How-To', 'Music', 'Art', 'Photography',
  'Crafts', 'Film', 'Fashion', 'Food', 'Travel', 'Parenting', 'Health',
  'Fitness', 'History', 'Technology', 'Medicine', 'Psychology', 'Sociology',
  'Economics', 'Business', 'Marketing','Academic', 'Textbook', 'Encyclopedia',
  'Dictionary', 'Thesaurus', 'Novella', 'Novelette', 'Epic', 'Saga', 'Tragedy',
  'Comedy', 'Drama'
].sort();

const NewProjectModal: React.FC<NewProjectModalProps> = ({ visible, onClose, onCreate }) => {
  const [form] = Form.useForm();
  const [customTag, setCustomTag] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (checkedValues: any) => {
    setSelectedTags(checkedValues);
  };

  const handleCustomTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTag(e.target.value);
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        const projectData = {
          ...values,
          tags: selectedTags,
        };
        form.resetFields();
        setSelectedTags([]);
        setCustomTag('');
        onCreate(projectData);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={visible}
      title="Create a new project"
      onCancel={onClose}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="new_project_form"
      >
        <Form.Item
          name="name"
          label="Project Name"
          rules={[{ required: true, message: 'Please enter the project name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="coverImage"
          label="Cover Image"
        >
          <Input type="file" />
        </Form.Item>
        <Form.Item
          name="tags"
          label="Genre Tags"
        >
          <div style={{ height: '100px', overflowY: 'scroll' }}>
            <Checkbox.Group style={{ width: '100%' }} onChange={handleTagChange}>
              <Row>
                {genres.map((genre, index) => (
                  <Col span={8} key={index}>
                    <Checkbox value={genre}>{genre}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
          <Input
            style={{ marginTop: '10px' }}
            value={customTag}
            onChange={handleCustomTagChange}
            onPressEnter={handleAddCustomTag}
            placeholder="Other (press Enter to add)"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewProjectModal;

