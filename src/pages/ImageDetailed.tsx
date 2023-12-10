import { useEffect, useState } from 'react';
import { Descriptions, Spin, notification, Card } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';
import { URL } from '../redux/ActionTypes';
import PalmDetailsTable from '../components/tables/PalmDetailsTable';
import ImageEditor from './ImageEditor';

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
  const [loading, setLoading] = useState<boolean>(true);
  const userAccessKey = getCookie("userAccessKey");

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
              src={`https://blackneb.com${imageDetails.imagepath}`}
              className="max-w-full"
            />
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
        <ImageEditor/>
      </Card>
    </div>
  );
};

export default ImageDetailed;
