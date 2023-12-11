import React, { useState } from 'react';
import { Modal, Form, Input, Button, notification, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';
import { URL } from '../redux/ActionTypes';


const AddNewImageModal= () => {
  const [loading, setLoading] = useState(false);
  const userAccessKey = getCookie('userAccessKey');

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${URL}uploadimage/`, formData, {
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

      notification.success({
        message: 'Image Uploaded Successfully',
        duration: 5,
      });
    } catch (error) {
      console.error(error);

      notification.error({
        message: 'Failed to Upload Image',
        duration: 5,
      });
    }

    setLoading(false);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const { fileList } = values.imageUpload;

    if (fileList.length > 0) {
      const file = fileList[0].originFileObj as File;
      await uploadImage(file);
    } else {
      message.error('Please upload an image');
      setLoading(false);
    }
  };

  return (
      <Form onFinish={onFinish}>
        <Form.Item
          name="imageUpload"
          label="Image"
          rules={[{ required: true, message: 'Please upload an image' }]}
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#ff6929' }}>
            Upload
          </Button>
        </Form.Item>
      </Form>
  );
};

export default AddNewImageModal;
