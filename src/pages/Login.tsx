import { Button, Input, Form } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import AumkarVertival from '../images/AumkarVertical.png'

const Login = () => {
  return (
    <div>
        <section className="flex flex-col md:flex-row h-screen rounded-2xl justify-center items-center">
            <div className="bg-white shadow-md w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3  px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                <div className="w-full h-100">
                <div className='flex align-center justify-center mb-8'>
                <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-gray-700">Aumkar</h1>
            </div>
            <div className='flex align-center justify-center'>
                <img src={AumkarVertival} alt="" className="h-32 rounded-full"/>
            </div>
                <h1 className="text-xl text-center md:text-2xl font-bold leading-tight mt-12">Log in</h1>
                <Form
                    name="basic"
                    autoComplete="off"
                    layout="vertical"
                    >
                    <div>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input name='username' style={{height:40}} prefix={<UserOutlined/>}/>
                    </Form.Item>
                    
                    
                    </div>

                    <div className="mt-4">
                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Input.Password name='password' style={{height:40}}/>
                    </Form.Item>
                    </div>

                    <div className="text-right mt-2">
                    <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
                    </div>                
                    <Button htmlType="submit"className="w-full" style={{ backgroundColor: '#ff6929', color: 'white' }}>
                    Login
                    </Button>
                    </Form>

                <hr className="my-6 border-gray-300 w-full"/>
                
                </div>
            </div>
        </section>
    </div>
  )
}

export default Login
