import { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import AumkarVertival from '../images/AumkarVertical.png'
import axios from 'axios';
import { URL } from '../redux/ActionTypes';


const { Option } = Select;


const RegisterHarvesterModal = ({setCreateAccount}:any) => {
  const [loading, setLoading] = useState(false)
  async function registerUser(values:any){
    setLoading(true)
    if(values.password !== values.confirmPassword){
      setLoading(false)
      notification.warning({
        message: "Passwords are different",
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    }
    else{
      try{
        const response = await axios.post(URL + "registeruser/", values)
        console.log(response.data)
        setLoading(false)
      }
      catch(error){
        console.log(error)
        notification.error({
          message: "Please Try again",
          duration: 5,
          onClose: () => {
            console.log('Notification closed');
          },
        });
        setLoading(false)
      }
    }
  }
const onFinish = (values: any) => {
    console.log('Received form the form: ' , values)
    registerUser(values)
  };
  return (
    <div>
        <section className="flex flex-col md:flex-row h-screen justify-center items-center">
            <div className="bg-white shadow-md px-8  flex items-center rounded-2xl justify-center">
                <div className="w-full h-100">
                <div className='flex align-center justify-center mb-8'>
            </div>
            <div className='flex align-center justify-center'>
                <img src={AumkarVertival} alt="" className="h-32 rounded-full"/>
            </div>
                <Form
                  name="registrationForm"
                  onFinish={onFinish}
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 15 }}
                >
                  <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[{ required: true, message: 'Please enter your first name!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[{ required: true, message: 'Please enter your last name!' }]}
                  >
                    <Input />
                  </Form.Item>

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

                  <Form.Item
                    label="User Type"
                    name="user_type"
                    rules={[{ required: true, message: 'Please select user type!' }]}
                  >
                    <Select>
                      <Option value="Manager">Manager</Option>
                      <Option value="Harvester">Harvester</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please enter your address!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Branch ID"
                    name="branch_id"
                    rules={[{ required: true, message: 'Please enter branch ID!' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter Password!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please confirm Password!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <div className='flex flex-col'>
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
                      
                      <Button type="primary" style={{ backgroundColor: 'white', color:'#ff6929', width:'180px', borderColor: '#ff6929', marginTop:'10px' }} onClick={()=>setCreateAccount(false)}>
                        Cancel
                      </Button>
                    </div>
                  </Form.Item>
                </Form>

                <hr className="my-6 border-gray-300 w-full"/>
                </div>
            </div>
        </section>
    </div>

  )
}

export default RegisterHarvesterModal
