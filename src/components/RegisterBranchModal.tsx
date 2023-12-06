import { useState } from 'react'
import { Form, Input, Button, notification } from 'antd';
import { URL } from '../redux/ActionTypes';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';

const RegisterBranchModal = ({getBranches}:any) => {
  const [loading, setLoading] = useState(false);
  const userAccessKey = getCookie('userAccessKey')
  async function registerBranch(values:any){
    try{
      const response = await axios.post(URL + 'registerbranch/', values,{
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data)
      getBranches();
      notification.success({
        message: 'Branch Added Successfully',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    }
    catch(error){
      console.log(error);
      notification.success({
        message: 'Please Try again',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    }
    setLoading(false)
  }
  const onFinish = (values: any) => {
    setLoading(true)
    console.log('Received form from the form: ', values);
    registerBranch(values);
  };
  return (
    <div>
      <Form
        name="registrationForm"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Branch Name"
          name="branchname"
          rules={[{ required: true, message: 'Please enter the branch name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: 'Please enter the city!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address Longitude"
          name="address_longitude"
          rules={[
            { required: true, message: 'Please enter the address longitude!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address Latitude"
          name="address_latitude"
          rules={[
            { required: true, message: 'Please enter the address latitude!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        {
          loading?(
          <>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ff6929', width:'180px', borderColor: '#ff6929' }} loading>
            Registering
          </Button>
          </>
          ):(
          <>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ff6929', width:'180px', borderColor: '#ff6929' }}>
            Register
          </Button>
          </>
          )
        }
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterBranchModal;
