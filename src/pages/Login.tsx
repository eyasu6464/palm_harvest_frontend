import { useState, useEffect } from 'react';
import { Button, Input, Form, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AumkarVertival from '../images/AumkarVertical.png';
import axios from 'axios';
import { URL } from '../redux/ActionTypes';
import { getCookie, setCookie } from 'typescript-cookie';
import { useDispatch } from 'react-redux';
import { add_user_information } from '../redux/Actions';

const Login = ({ setLogin, setCreateAccount }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function getLogin(values: any) {
    try {
      const response = await axios.post(URL + 'token/', values);
      try {
        const res = await axios.get(URL + 'userinformation/', {
          headers: {
            Authorization: `Bearer ${response.data.access}`,
            'Content-Type': 'application/json',
          },
        });
        setCookie('userAccessKey', response.data.access, { expires: 1 });
        dispatch(add_user_information(res.data));
        setLogin(false);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Login Failed',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
      setLoading(false);
    }
  }

  const onFinish = async (values: any) => {
    setLoading(true);
    getLogin(values);
  };

  useEffect(() => {
    async function createLogin(userAccessKey: any) {
      try {
        const response = await axios.get(URL + 'userinformation/', {
          headers: {
            Authorization: `Bearer ${userAccessKey}`,
            'Content-Type': 'application/json',
          },
        });
        dispatch(add_user_information(response.data));
        setLogin(false);
      } catch (error) {
        console.log(error);
      }
    }
    if (getCookie('userAccessKey')) {
      createLogin(getCookie('userAccessKey'));
    }
  }, []);

  return (
    <div>
      <section className="flex flex-col md:flex-row h-screen justify-center items-center">
        <div className="bg-white shadow-md px-4 md:px-8 w-full md:w-1/2 lg:w-1/3 flex items-center rounded-2xl justify-center">
          <div className="w-full h-100">
            <div className="flex align-center justify-center mb-8">
              <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-gray-700">Aumkar</h1>
            </div>
            <div className="flex align-center justify-center">
              <img src={AumkarVertival} alt="" className="h-32 rounded-full" />
            </div>
            <h1 className="text-xl text-center md:text-2xl font-bold leading-tight mt-12">Log in</h1>
            <Form name="basic" autoComplete="off" layout="vertical" onFinish={onFinish}>
              <div>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input name="username" style={{ height: 40 }} prefix={<UserOutlined />} />
                </Form.Item>
              </div>

              <div className="mt-4">
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password name="password" style={{ height: 40 }} />
                </Form.Item>
              </div>

              <div className="text-right mt-2">
                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                  Forgot Password?
                </a>
              </div>
              {loading ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ backgroundColor: '#ff6929', color: 'white', width: '100%' }}
                  loading
                >
                  Loading
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ backgroundColor: '#ff6929', color: 'white', width: '100%' }}
                >
                  Login
                </Button>
              )}
            </Form>

            <hr className="my-6 border-gray-300 w-full" />
            <div className="flex justify-between items-center w-full mb-8">
              <p>Don't have an account?</p>
              <Button
                type="text"
                style={{ color: '#ff6929', fontWeight: 'bolder', fontSize: '16px' }}
                onClick={() => setCreateAccount(true)}
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
