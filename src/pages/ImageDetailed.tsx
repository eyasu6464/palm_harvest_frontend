import { useEffect, useState } from 'react';
import { Descriptions, Spin, notification, Card } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface ImageDetails {
  imageid: number;
  quality: string;
  realOrPredicted: string;
  palmImageUploaded: string;
}

const ImageDetailed = () => {
  const { id } = useParams<{ id: string }>();
  const [imageDetails, setImageDetails] = useState<ImageDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(`/api/images/${id}`); // Update with your API endpoint
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
        <div className="zoom-container">
            <img alt="example" src={"https://plus.unsplash.com/premium_photo-1677003649685-a9ff56182dbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFsbSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"} className="zoom-image" />
        </div>
        <Descriptions bordered column={2} style={{ marginTop: '16px' }}>
          <Descriptions.Item label="Image ID">{imageDetails.imageid}</Descriptions.Item>
          <Descriptions.Item label="Quality">{imageDetails.quality}</Descriptions.Item>
          <Descriptions.Item label="Real or Predicted">{imageDetails.realOrPredicted}</Descriptions.Item>
          <Descriptions.Item label="Palm Image Uploaded">{imageDetails.palmImageUploaded}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ImageDetailed;
