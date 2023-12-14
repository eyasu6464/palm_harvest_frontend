import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useParams } from 'react-router-dom';
import { Select,Spin, Input, Table, Button, notification, Slider } from 'antd';
import axios from 'axios';
// import { EllipsisOutlined } from '@ant-design/icons';
import { getCookie } from 'typescript-cookie';
import { URL } from '../redux/ActionTypes';
const { Option } = Select;


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
  palmdetails?: {
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
  }[];
}


const ImageEditor: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const { id } = useParams<{ id: string }>();
  const [imageDetails, setImageDetails] = useState<ImageDetails | null>({
    imageid: 0,
    imagepath: '',
    image_created: '',
    image_uploaded: '',
    harvester_id: 0,
    harvester_fullname: '',
    branch_id: '',
    branch_name: '',
    branch_city: '',
    palmdetails: [{
      palmid: 0,
      quality: '',
      real: false,
      predicted: false,
      x1_coordinate: '',
      y1_coordinate: '',
      x2_coordinate: '',
      y2_coordinate: '',
      palm_image_uploaded: '',
      imageid: 0,
    }],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<string | null>();
  const [tableData, setTableData] = useState<any[]>([]);
  const userAccessKey = getCookie("userAccessKey");
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);
  const [rectangleWidth, setRectangleWidth] = useState<number>(100);
  const [rectangleHeight, setRectangleHeight] = useState<number>(100);

  useEffect(() => {
    const initializeCanvas = async () => {
      console.log(`image link is: ${image}`);
      console.log('triggered')
      if (!canvasRef.current) {
        const canvas = new fabric.Canvas('canvas', {
          backgroundColor: '#f0f0f0',
        });

        canvasRef.current = canvas;

        if (image) {
          fabric.Image.fromURL(image, (img) => {
            if (img) {
              canvasRef.current?.setBackgroundImage(
                img,
                canvasRef.current?.renderAll.bind(canvasRef.current)
              );

              // Set canvas dimensions based on the loaded image
              canvasRef.current?.setDimensions({
                width: img.width || 800,
                height: img.height || 600,
              });

              // Initialize with one bounding rectangle
              const initialRect = new fabric.Rect({
                left: 50,
                top: 50,
                fill: 'transparent',
                stroke: 'red',
                strokeWidth: 2,
                width: rectangleWidth,
                height: rectangleHeight,
                hasControls: false,
                hasBorders: false,
              });

              canvasRef.current?.add(initialRect);
              canvasRef.current?.renderAll();

              // Listen for object modification events
              canvasRef.current?.on('object:modified', handleObjectModified);
            } else {
              setImageLoadError(true);
            }
          });
        }
      }
    };
    const fetchImageDetails = async () => {
      console.log(imageDetails)
      try {
        const response = await axios.get(`${URL}image/${id}`, {
          headers: {
            Authorization: `Bearer ${userAccessKey}`,
            'Content-Type': 'application/json',
          },
        });
        setImageDetails(response.data);
        setImage(`https://palm.blackneb.com${response.data.imagepath}`);
        console.log(`https://palm.blackneb.com${response.data.imagepath}`);
        if(image !== undefined){
          initializeCanvas();
        }
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
  }, [id, image, rectangleWidth, rectangleHeight]);

  const handleObjectModified = () => {
    if (canvasRef.current) {
      const objects = canvasRef.current.getObjects();
      if (objects.length > 0) {
        const rect = objects[0] as fabric.Rect;

        if (rect) {
          const newWidth = rect.width || 0;
          const newHeight = rect.height || 0;

          // Update the state of sliders with new dimensions
          setRectangleWidth(newWidth);
          setRectangleHeight(newHeight);
        }
      }
    }
  };

  const handleWidthChange = (value: number) => {
    setRectangleWidth(value);
    updateCanvasRect();
  };

  const handleHeightChange = (value: number) => {
    setRectangleHeight(value);
    updateCanvasRect();
  };

  const updateCanvasRect = () => {
    if (canvasRef.current) {
      const objects = canvasRef.current.getObjects();
      if (objects.length > 0) {
        const rect = objects[0] as fabric.Rect;
        rect.set({
          width: rectangleWidth,
          height: rectangleHeight,
        });
        canvasRef.current.renderAll();
      }
    }
  };

  const getBoundingCoordinates = () => {
    if (canvasRef.current) {
      const objects = canvasRef.current.getObjects();
      if (objects.length > 0) {
        const rect = objects[0] as fabric.Rect;

        if (rect) {
          rect.set({
            width: rectangleWidth,
            height: rectangleHeight,
          });

          // Update the table data with the new dimensions
          const newRecord = {
            key: String(tableData.length + 1),
            quality: 'upripe',
            realPredicted: 'real',
            x1: rect.left ?? 0,
            y1: rect.top ?? 0,
            x2: (rect.left ?? 0) + rectangleWidth,
            y2: (rect.top ?? 0) + rectangleHeight,
            imageId: 'your_default_image_id',
          };
          setTableData([...tableData, newRecord]);

          canvasRef.current.renderAll();
        }
      }
    }
  };
  
  const showCoordinateOnCanvas = (record: any) => {
    console.log(record)
    if (canvasRef.current) {
      canvasRef.current.clear();
      fabric.Image.fromURL(image!, (img) => {
        canvasRef.current?.setBackgroundImage(
          img,
          canvasRef.current?.renderAll.bind(canvasRef.current)
        );
      });
      const rect = new fabric.Rect({
        left: parseInt(record.x1_coordinate || record.x1),
        top: parseInt(record.y1_coordinate || record.y1),
        fill: 'transparent',
        stroke: 'red',
        strokeWidth: 2,
        width: parseInt(record.x2_coordinate || record.x2) - parseInt(record.x1_coordinate || record.x1),
        height: parseInt(record.y2_coordinate || record.y2) - parseInt(record.y1_coordinate || record.y1),
      });

      canvasRef.current.add(rect);
      canvasRef.current.renderAll();
    }
  };

  const removeRegisteredCoordinate = (palmid: number) => {
    if (imageDetails && imageDetails.palmdetails !== undefined) {
      const updatedPalmdetails = imageDetails.palmdetails.filter(
        (palm) => palm.palmid !== palmid
      );
      setImageDetails({
        ...imageDetails,
        palmdetails: updatedPalmdetails,
      });
    }
  };

  const deleteTableRow = async(record: any) => {
    console.log('Deleting palm with ID:', record.palmid);
    try {
      const response = await axios.delete(URL + `deletepalmdetail/${record.palmid}`, {
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      removeRegisteredCoordinate(record.palmid);
      notification.success({
        message: 'Deleted Successfully',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Please Try again',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    }
  };


  const sendToAPI = async (record: any) => {
    const apiRecord = {
      quality: record.quality,
      imageid: imageDetails?.imageid,
      real: true,
      predicted: false,
      x1_coordinate: record.x1,
      y1_coordinate: record.y1,
      x2_coordinate: record.x2,
      y2_coordinate: record.y2,
    };
    try {
      const response = await axios.post(URL + 'createpalmdetail/', apiRecord, {
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      notification.success({
        message: 'Registred Successfully',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Please Try again',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    }
  };

  const removeTableRow = (key: string) => {
    const newTableData = tableData.filter((record) => record.key !== key);
    setTableData(newTableData);
  };

  const handleTableMenuClick = (action: string, record: any) => {
    switch (action) {
      case 'showCoordinate':
        showCoordinateOnCanvas(record);
        break;
      case 'remove':
        removeTableRow(record.key);
        break;
      case 'sendToAPI':
        sendToAPI(record);
        break;
      case 'delete':
        deleteTableRow(record);
        break;
      default:
        break;
    }
  };

  // const tableMenu = (record: any) => (
  //   <Menu onClick={({ key }) => handleTableMenuClick(key, record)}>
  //     <Menu.Item key="showCoordinate">Show Coordinate</Menu.Item>
  //     <Menu.Item key="remove">Remove</Menu.Item>
  //     <Menu.Item key="sendToAPI">Send to API</Menu.Item>
  //   </Menu>
  // );

  const palmDetailsColumns = [
    {
      title: 'Palm ID',
      dataIndex: 'palmid',
    },
    {
      title: 'Quality',
      dataIndex: 'quality',
    },
    {
      title: 'Real/Predicted',
      dataIndex: 'realPredicted',
      render: (_text: string, record: any) => (
        <span>{record.real ? 'Real' : 'Predicted'}</span>
      ),
    },
    {
      title: 'X1 Coordinate',
      dataIndex: 'x1_coordinate',
    },
    {
      title: 'Y1 Coordinate',
      dataIndex: 'y1_coordinate',
    },
    {
      title: 'X2 Coordinate',
      dataIndex: 'x2_coordinate',
    },
    {
      title: 'Y2 Coordinate',
      dataIndex: 'y2_coordinate',
    },
    {
      title: 'Image ID',
      dataIndex: 'imageId',
      render: (_text: string) => (
        <span>{imageDetails?.imageid || 'your_default_image_id'}</span>
      ),
    },
    {
      title: 'Show Coordinate',
      dataIndex: 'showCoordinate',
      render: (_text: string, record: any) => (
        <Button onClick={() => handleTableMenuClick('showCoordinate', record)} style={{ backgroundColor: '#ff6929', color: 'white' }}>
          Show Coordinate
        </Button>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      render: (_text: string, record: any) => (
        <Button onClick={() => handleTableMenuClick('delete', record)} style={{ backgroundColor: 'red', color: 'white', borderColor: 'red' }}>
          Delete
        </Button>
      ),
    },
  ];

  const columns = [
    {
      title: 'Quality',
      dataIndex: 'quality',
      render: (_text: string, record: any) => (
        <Select defaultValue="upripe" onChange={(value) => handleTableChange(record.key, 'quality', value)}>
          <Option value="upripe">Unripe</Option>
          <Option value="ripe">Ripe</Option>
          <Option value="overripe">Overripe</Option>
        </Select>
      ),
    },
    {
      title: 'Real/Predicted',
      dataIndex: 'realPredicted',
      render: (_text: string, record: any) => (
        <Select defaultValue="real" onChange={(value) => handleTableChange(record.key, 'realPredicted', value)} disabled>
          <Option value="real">Real</Option>
          <Option value="predicted">Predicted</Option>
        </Select>
      ),
    },
    {
      title: 'X1 Coordinate',
      dataIndex: 'x1',
      render: (_text: string, record: any) => <Input value={record.x1} disabled />,
    },
    {
      title: 'Y1 Coordinate',
      dataIndex: 'y1',
      render: (_text: string, record: any) => <Input value={record.y1} disabled />,
    },
    {
      title: 'X2 Coordinate',
      dataIndex: 'x2',
      render: (_text: string, record: any) => <Input value={record.x2} disabled />,
    },
    {
      title: 'Y2 Coordinate',
      dataIndex: 'y2',
      render: (_text: string, record: any) => <Input value={record.y2} disabled />,
    },
    {
      title: 'Image ID',
      dataIndex: 'imageId',
      render: (_text: string) => (
        <span>{imageDetails?.imageid || 'your_default_image_id'}</span>
      ),
    },
    {
      title: 'Show Coordinate',
      dataIndex: 'showCoordinate',
      render: (_text: string, record: any) => (
        <Button onClick={() => handleTableMenuClick('showCoordinate', record)} style={{ backgroundColor: '#ff6929', color: 'white' }}>
          Show Coordinate
        </Button>
      ),
    },
    {
      title: 'Remove',
      dataIndex: 'remove',
      render: (_text: string, record: any) => (
        <Button onClick={() => handleTableMenuClick('remove', record)} style={{ backgroundColor: 'red', color: 'white', borderColor:'red' }}>
          Remove
        </Button>
      ),
    },
    {
      title: 'Register',
      dataIndex: 'sendToAPI',
      render: (_text: string, record: any) => (
        <Button onClick={() => handleTableMenuClick('sendToAPI', record)} style={{ backgroundColor: 'green', color: 'white', borderColor:'green' }}>
          Register
        </Button>
      ),
    },
  ];
  

  const handleTableChange = (key: string, dataIndex: string, value: any) => {
    const newData = [...tableData];
    const index = newData.findIndex((item) => key === item.key);
    const item = newData[index];
    item[dataIndex] = value;
    setTableData(newData);
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div className='flex flex-col justify-center'>
      <div className='flex items-center justify-center'>
      </div>
      <div className='flex flex-col items-center justify-center'>
        {imageLoadError ? (
          <div>Error loading image. Please check the URL or try again later.</div>
        ) : (
          <>
          <div className='flex flex-col my-8 justify-evenly'>
            <canvas id="canvas"></canvas>
              <div className='flex flex-row items-start my-8 justify-center'>
              <div className='w-48'>
                  <span style={{ marginRight: '10px' }}>Width:</span>
                  <Slider
                    min={30}
                    max={500}
                    step={1}
                    value={rectangleWidth}
                    onChange={handleWidthChange}
                    style={{ width: '80%' }}
                    trackStyle={{ backgroundColor: '#ff6929' }} 
                    handleStyle={{ borderColor: '#ff6929', backgroundColor: '#ff6929' }}
                  />
                </div>
                <div className='w-36'>
                  <span style={{ marginRight: '10px' }}>Height:</span>
                  <Slider
                    min={30}
                    max={500}
                    step={1}
                    value={rectangleHeight}
                    onChange={handleHeightChange}
                    style={{ width: '80%' }}
                    trackStyle={{ backgroundColor: '#ff6929' }} 
                    handleStyle={{ borderColor: '#ff6929', backgroundColor: '#ff6929' }}
                  />
                </div>
                <Button onClick={getBoundingCoordinates}>
                  Get Bounding Coordinates
                </Button>
              </div>
            </div>
            <div className='mx-8'>
              <Table columns={columns} dataSource={tableData} style={{ width: '95vw' }} title={() => 
                <div>
                  <p className='font-bold text-lg' style={{color:"#ff6929"}}>Pending Coordinates</p>
                </div>} 
              />
            </div>
            <div className='mx-8'>
              <Table columns={palmDetailsColumns} dataSource={imageDetails?.palmdetails || []}  style={{ width: '95vw' }} title={() => 
                <div>
                  <p className='font-bold text-lg' style={{color:"#ff6929"}}>Registered Coordinates</p>
                </div>} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;
