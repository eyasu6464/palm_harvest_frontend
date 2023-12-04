import { useState, useEffect } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import axios from 'axios';
import { URL } from '../redux/ActionTypes';
import { useSelector } from 'react-redux';
import AumkarVertival from '../images/AumkarVertical.png'
import { getCookie } from 'typescript-cookie'


const { Option } = Select;

const Profile = () => {
  const userData = useSelector((state: any) => state.userInformation);
  const [loading, setLoading] = useState(false);
  const [branchData, setBranchData] = useState<any[]>([])
  const userAccessKey = getCookie('userAccessKey')
  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      // You may need to adjust the URL and payload based on your API requirements
      const response = await axios.put(URL + 'updateprofile/', values,{
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);

      // Handle success, show notification, or update local state as needed.

      setLoading(false);
    } catch (error) {
      console.error(error);

      notification.error({
        message: 'Failed to update profile',
        duration: 5,
      });

      setLoading(false);
    }
  };
  useEffect(() => {
    async function getBranches(){
      try{
        const response = await axios.get( URL + 'allbranchnames/')
        setBranchData(response.data)
      }
      catch(error){
        console.log(error)
      }
    }
    getBranches()
  }, [])

  return (
    <section className="flex flex-col mt-8 md:flex-row justify-center items-center">
      <div className="bg-white shadow-md px-8 flex items-center rounded-2xl justify-center w-full md:w-1/2 lg:w-1/3">
        <div className="w-full h-100">
          <div className="flex align-center justify-center mb-8">
          </div>
          <div className="flex align-center justify-center">
            <img src={AumkarVertival} alt="" className="h-32 rounded-full" />
          </div>
          <Form
            name="profileForm"
            onFinish={onFinish}
            initialValues={{
              first_name: userData.palmuser.first_name,
              last_name: userData.palmuser.last_name,
              email: userData.palmuser.email,
              user_type: userData.user_type,
              address: userData.address,
              branch_id: userData.branch,
            }}
            labelCol={{ flex: '150px', span: 30 }}
            labelAlign="left"
            labelWrap
          >
            <Form.Item label="First Name" name="first_name">
              <Input />
            </Form.Item>

            <Form.Item label="Last Name" name="last_name">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>

            <Form.Item label="User Type" name="user_type">
              <Select disabled>
                <Option value="Manager">Manager</Option>
                <Option value="Harvester">Harvester</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>

            <Form.Item label="Branch ID" name="branch_id">
              <Select>
                {
                  branchData.map((branch, index) => (
                    <Option key={index} vlaue={branch.id}>{branch.name}</Option>
                  ))
                }
              </Select>
            </Form.Item>

            <Form.Item>
            <div className="flex justify-center"> {/* Updated this line */}
    {loading ? (
      <>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: '#ff6929',
            width: '180px',
            borderColor: '#ff6929',
          }}
          loading
        >
          Updating
        </Button>
      </>
    ) : (
      <>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: '#ff6929',
            width: '180px',
            borderColor: '#ff6929',
          }}
        >
          Update
        </Button>
      </>
    )}
  </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
