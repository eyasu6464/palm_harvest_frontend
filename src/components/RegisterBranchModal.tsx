import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;
const onFinish = (values: any) => {
  console.log('Received form from the form: ', values);
};

const RegisterBranchModal = () => {
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
          name="branch_name"
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
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: '#ff6929',
              width: '180px',
              borderColor: '#ff6929',
            }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterBranchModal;
