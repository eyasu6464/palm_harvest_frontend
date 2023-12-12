import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Select, Input, Table, Button, notification, Dropdown, Menu } from 'antd';
import axios from 'axios';
import { EllipsisOutlined } from '@ant-design/icons';

const { Option } = Select;

const ImageEditor: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [image, setImage] = useState<string | null>(
    'https://palm.blackneb.com/media/uploads/e9da55822ab24ff715fc4355c3455b15_eo9pp5u.jpg'
  );
  const [tableData, setTableData] = useState<any[]>([]);
  const [userAccessKey] = useState<string>('your_user_access_key'); // Replace with actual user access key
  const URL = 'your_api_base_url'; // Replace with your actual API base URL
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);

  useEffect(() => {
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
              width: img.width || 800, // Set a default width if img.width is not available
              height: img.height || 600, // Set a default height if img.height is not available
            });

            // Initialize with one bounding rectangle
            const initialRect = new fabric.Rect({
              left: 50,
              top: 50,
              fill: 'transparent',
              stroke: 'red',
              strokeWidth: 2,
              width: 100,
              height: 100,
              lockRotation: true,
            });

            canvasRef.current?.add(initialRect);
            canvasRef.current?.renderAll();
          } else {
            setImageLoadError(true);
          }
        });
      }
    }
  }, [image]);

  const getBoundingCoordinates = () => {
    if (canvasRef.current) {
      const objects = canvasRef.current.getObjects();
      if (objects.length > 0) {
        const rect = objects[0] as fabric.Rect;

        if (rect) {
          const newRecord = {
            key: String(tableData.length + 1),
            quality: 'upripe',
            realPredicted: 'real',
            x1: rect.left ?? 0,
            y1: rect.top ?? 0,
            x2: (rect.left ?? 0) + (rect.width ?? 0),
            y2: (rect.top ?? 0) + (rect.height ?? 0),
            imageId: 'your_default_image_id',
          };
          console.log(rect)
          setTableData([...tableData, newRecord]);
        }
      }
    }
  };

  const showCoordinateOnCanvas = (record: any) => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      fabric.Image.fromURL(image!, (img) => {
        canvasRef.current?.setBackgroundImage(
          img,
          canvasRef.current?.renderAll.bind(canvasRef.current)
        );
      });
      const rect = new fabric.Rect({
        left: record.x1,
        top: record.y1,
        fill: 'transparent',
        stroke: 'red',
        strokeWidth: 2,
        width: record.x2 - record.x1,
        height: record.y2 - record.y1,
      });

      canvasRef.current.add(rect);
      canvasRef.current.renderAll();
    }
  };

  const sendToAPI = async (record: any) => {
    try {
      const response = await axios.post(URL + 'registerbranch/', record, {
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      notification.success({
        message: 'Branch Added Successfully',
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
      default:
        break;
    }
  };

  const tableMenu = (record: any) => (
    <Menu onClick={({ key }) => handleTableMenuClick(key, record)}>
      <Menu.Item key="showCoordinate">Show Coordinate</Menu.Item>
      <Menu.Item key="remove">Remove</Menu.Item>
      <Menu.Item key="sendToAPI">Send to API</Menu.Item>
    </Menu>
  );

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
      render: (_text: string, record: any) => (
        <Input onChange={(e) => handleTableChange(record.key, 'imageId', e.target.value)} />
      ),
    },
    {
      title: 'Actions',
      render: (_text: string, record: any) => (
        <Dropdown overlay={tableMenu(record)} placement="bottomCenter">
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
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

  return (
    <div className='flex flex-col justify-center'>
      <div className='flex items-center justify-center'>
        <Button onClick={getBoundingCoordinates} style={{ margin: '15px' }}>
          Get Bounding Coordinates
        </Button>
      </div>
      <div className='flex flex-col items-center justify-center'>
        {imageLoadError ? (
          <div>Error loading image. Please check the URL or try again later.</div>
        ) : (
          <>
            <canvas id="canvas"></canvas>
            <div className='mx-8'>
              <Table columns={columns} dataSource={tableData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;
