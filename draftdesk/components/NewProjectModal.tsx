import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';

interface NewProjectModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (projectData: any) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ visible, onClose, onCreate }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        form.resetFields();
        onCreate(values);
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
          name="tags"
          label="Genre Tags"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="coverImage"
          label="Cover Image"
        >
          <Input type="file" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewProjectModal;
