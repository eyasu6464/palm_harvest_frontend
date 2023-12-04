import { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { URL } from '../redux/ActionTypes';
import { getCookie } from 'typescript-cookie';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const userAccessKey = getCookie('userAccessKey');

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      // You may need to adjust the URL and payload based on your API requirements
      const response = await axios.put(URL + 'changepassword/', values, {
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);

      notification.success({
        message: 'Password changed successfully',
        duration: 5,
      });

      setLoading(false);
    } catch (error) {
      console.error(error);

      notification.error({
        message: 'Failed to change password',
        duration: 5,
      });

      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col mt-8 md:flex-row justify-center items-center">
      <div className="bg-white shadow-md px-8 flex items-center rounded-2xl justify-center w-full md:w-1/2 lg:w-1/3">
        <div className="w-full h-100">
          <Form
            name="changePasswordForm"
            onFinish={onFinish}
            labelCol={{ flex: '150px', span: 30 }}
            labelAlign="left"
            labelWrap
          >
            <Form.Item
              label="Old Password"
              name="old_password"
              rules={[{ required: true, message: 'Please enter your old password' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="new_password"
              rules={[{ required: true, message: 'Please enter your new password' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              dependencies={['new_password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#ff6929',
                    width: '180px',
                    borderColor: '#ff6929',
                  }}
                  loading={loading}
                >
                  {loading ? 'Changing Password' : 'Change Password'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
