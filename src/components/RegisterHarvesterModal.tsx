import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;
const onFinish = (values: any) => {
    console.log('Received form the form: ' , values)
  };

const RegisterHarvesterModal = () => {
  return (
    <div>
      <Form
      name="registrationForm"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ff6929', width:'180px', borderColor: '#ff6929' }}>
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default RegisterHarvesterModal
