import { useEffect, useState } from 'react';
import { Descriptions, Spin, notification, Card, Button, Popconfirm } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';
import { URL } from '../redux/ActionTypes';
import PalmDetailsTable from '../components/tables/PalmDetailsTable';

interface ImageDetails {
  imageid: number;
  imagepath: string;
  image_created: string;
  image_uploaded: string;
  harvester_id: number;
  harvester_fullname: string;
  branch_id: string;
  branch_name: string;
  branch_city: string;
  palmdetails: [{
    palmid: number;
    quality: string;
    real: boolean;
    predicted: boolean;
    x1_coordinate: string;
    y1_coordinate: string;
    x2_coordinate: string;
    y2_coordinate: string;
    palm_image_uploaded: string;
    imageid: number;
  }]
}

const ImageDetailed = () => {
  const { id } = useParams<{ id: string }>();
  const [imageDetails, setImageDetails] = useState<ImageDetails | null>(null);
  const [popConfirmVisible, setPopConfirmVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const userAccessKey = getCookie("userAccessKey");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(`${URL}image/${id}`, {
          headers: {
            Authorization: `Bearer ${userAccessKey}`,
            'Content-Type': 'application/json',
          },
        });
        setImageDetails(response.data);
      } catch (error: any) {
        console.error('Error fetching image details:', error);
        notification.error({
          message: 'Failed to fetch image details. Please try again!',
          description: error.message || 'Unknown error',
          duration: 5,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [id]);

  const handleEditImage = () => {
    navigate(`/imageeditor/${id}`)
  };

  const showPopConfirm = () => {
    setPopConfirmVisible(true);
  };

  const hidePopConfirm = () => {
    setPopConfirmVisible(false);
  };
  const handleDeleteImage = async () => {
    try {
      // Assuming you have an API endpoint for deleting the image
      const response = await axios.delete(`${URL}deleteimage/${id}`, {
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        notification.success({
          message: 'Image deleted successfully!',
          duration: 5,
        });
        navigate('/allimages');
      } else {
        notification.error({
          message: 'Failed to delete image. Please try again!',
          duration: 5,
        });
      }
    } catch (error:any) {
      console.error('Error deleting image:', error);
      notification.error({
        message: 'Failed to delete image. Please try again!',
        description: error.message,
        duration: 5,
      });
    } finally {
      hidePopConfirm();
    }
  };

  if (loading) {
    return <Spin />;
  }

  if (!imageDetails) {
    return <div>Error loading image details.</div>;
  }

  return (
    <div className="my-8 mx-4">
      <Card style={{ width: '100%' }}>
        <div className='flex flex-col md:flex-row'>
          <div className="md:w-1/3 zoom-container bg-ff6929">
            <img
              alt="example"
              src={`https://palm.blackneb.com${imageDetails.imagepath}`}
              className="max-w-full"
            />
            <Button type="primary" style={{ backgroundColor: '#ff6929', color: 'white', marginTop:'5px', width: '100%' }} onClick={handleEditImage} >
                  Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this image?"
              visible={popConfirmVisible}
              onConfirm={handleDeleteImage}
              onCancel={hidePopConfirm}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ style: { backgroundColor: '#ff6929', color: 'white' } }}
            >
              <Button
                type="primary"
                style={{ backgroundColor: 'red', color: 'white', marginTop:'5px', width: '100%' }}
                onClick={showPopConfirm}
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
          <div className='md:w-2/3 mx-4'>
            <Descriptions bordered column={1} style={{ marginTop: '16px' }}>
              <Descriptions.Item label="Image ID">{imageDetails.imageid}</Descriptions.Item>
              <Descriptions.Item label="Harvester Full Name">{imageDetails.harvester_fullname}</Descriptions.Item>
              <Descriptions.Item label="Branch Name">{imageDetails.branch_name}</Descriptions.Item>
              <Descriptions.Item label="Image Created">{imageDetails.image_created}</Descriptions.Item>
              <Descriptions.Item label="Image Uploaded">{imageDetails.image_uploaded}</Descriptions.Item>
            </Descriptions>
          </div>
        </div>
        <PalmDetailsTable palmdetails={imageDetails.palmdetails}/>
      </Card>
    </div>
  );
};

export default ImageDetailed;
