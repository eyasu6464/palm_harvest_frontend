import { useState, useEffect } from 'react'
import { Form, Input, Button, Select, notification } from 'antd';
import { URL } from '../redux/ActionTypes';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';

const { Option } = Select;

interface Branch{
    branchid:number;
    branchname:string;
    city:string;
    address_longitude:string;
    address_latitude:string;
}
interface EditBranchesModalProps {
    getBranches: () => void;
    branchId: number | null; // Add this prop
  }
const EditBranchesModal: React.FC<EditBranchesModalProps> = ({ getBranches, branchId }) => {
  const [loading, setLoading] = useState(false);
  const [branchData, setBranchData] = useState<Branch>()
  const userAccessKey = getCookie('userAccessKey')
  async function registerBranch(values:any){
    try{
      const response = await axios.put(URL + `updatebranch/${branchId}/`, values,{
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data)
      getBranches();
      notification.success({
        message: 'Branch Updated Successfully',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    }
    catch(error:any){
      console.log(error);
      notification.error({
        message: error.response.data.Message,
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
  useEffect(() => {
    async function getBranchDetails(){
        try{
            const response = await axios.get(URL + `getbranch/${branchId}`,{
              headers: {
                Authorization: `Bearer ${userAccessKey}`,
                'Content-Type': 'application/json',
              },
            });
            console.log(response.data)
            setBranchData(response.data);
          }
          catch(error){
            console.log(error);
          }
    }
    getBranchDetails();
    console.log(branchData)
  }, [])
  return (
    <div>
        {
            branchData === undefined?(
            <>
                Loading...
            </>
            ):(
            <>
                <Form
                    name="registrationForm"
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                    label="Branch Name"
                    name="branchname"
                    initialValue={branchData?.branchname}
                    rules={[{ required: true, message: 'Please enter the branch name!' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="City"
                    name="city"
                    initialValue={branchData?.city}
                    rules={[{ required: true, message: 'Please enter the city!' }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Address Longitude"
                    name="address_longitude"
                    initialValue={branchData?.address_longitude}
                    rules={[
                        { required: true, message: 'Please enter the address longitude!' },
                    ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Address Latitude"
                    name="address_latitude"
                    initialValue={branchData?.address_latitude}
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
                        Updating
                    </Button>
                    </>
                    ):(
                    <>
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ff6929', width:'180px', borderColor: '#ff6929' }}>
                        Update
                    </Button>
                    </>
                    )
                    }
                    </Form.Item>
                </Form>
            </>
            )
        }
    </div>
  );
};

export default EditBranchesModal;