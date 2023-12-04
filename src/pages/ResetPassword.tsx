import { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';  // Updated import
import { URL } from '../redux/ActionTypes';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { uid, token } = useParams();  // Updated to use useParams

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${URL}reset-password/${uid}/${token}/`,
        values
      );

      console.log(response.data);

      // Display a success notification
      notification.success({
        message: response.data.Message,
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });

      // Redirect to the login page after successful password reset
      navigate('/');
    } catch (error:any) {
      console.log(error);
      notification.error({
        message: error.response?.data.Message || 'An error occurred',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="flex flex-col md:flex-row h-screen justify-center items-center">
        <div className="bg-white shadow-md px-8 flex items-center rounded-2xl justify-center w-full md:w-1/2 lg:w-1/3">
          <div className="w-full h-100">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <Form
              name="resetPasswordForm"
              onFinish={onFinish}
              labelCol={{ flex: '150px', span: 30 }}
              labelAlign="left"
              labelWrap
            >
              <Form.Item
                label="New Password"
                name="new_password"
                rules={[{ required: true, message: 'Please enter your new password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <div className="flex flex-col justify-center items-center">
                  {loading ? (
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ff6929', width: '180px', borderColor: '#ff6929' }} loading>
                      Reset Password
                    </Button>
                  ) : (
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ff6929', width: '180px', borderColor: '#ff6929' }}>
                      Reset Password
                    </Button>
                  )}
                </div>
              </Form.Item>
            </Form>

            <hr className="my-6 border-gray-300 w-full" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
