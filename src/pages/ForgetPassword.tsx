import { useState } from 'react';
import { Form, Input, Button, Modal, notification, Result } from 'antd';
import axios from 'axios';
import { URL } from '../redux/ActionTypes';
import { Link } from 'react-router-dom';
import AumkarVertical from '../images/AumkarVertical.png';

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const response = await axios.post(URL + 'forgetpassword/', values);
      console.log(response.data);
      setLoading(false);
      showModal();
    } catch (error:any) {
      console.log(error);
      notification.error({
        message: error.response?.data.Message || 'An error occurred',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal title="Forget Password" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Result
          status="success"
          title="Forget Password!"
          subTitle="A reset link is sent to your email. Please check your Email. Thanks!"
        />  
      </Modal>

      <section className="flex flex-col md:flex-row h-screen justify-center items-center">
        <div className="bg-white shadow-md px-8 flex items-center rounded-2xl justify-center w-full md:w-1/2 lg:w-1/3">
          <div className="w-full h-100">
            <div className="flex align-center justify-center mb-8">
              <img src={AumkarVertical} alt="Aumkar Logo" className="h-32 rounded-full" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Forget Password</h2>
            <Form
              name="forgetPasswordForm"
              onFinish={onFinish}
              labelCol={{ flex: '75px', span: 30 }}
              labelAlign="left"
              labelWrap
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'Invalid email address!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <div className="flex flex-col justify-center items-center">
                  {loading ? (
                    <>
                      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ff6929', width: '180px', borderColor: '#ff6929' }} loading>
                        Reset Password
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ff6929', width: '180px', borderColor: '#ff6929' }}>
                        Reset Password
                      </Button>
                    </>
                  )}
                  <Link to="/">
                    <Button type="primary" style={{ backgroundColor: 'white', color: '#ff6929', width: '180px', borderColor: '#ff6929', marginTop: '10px' }}>
                      Cancel
                    </Button>
                  </Link>
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

export default ForgetPassword;
