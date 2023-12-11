import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Button, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

const ImageEditor: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [image, setImage] = useState<string | null>(
    'https://palm.blackneb.com/media/uploads/e9da55822ab24ff715fc4355c3455b15_eo9pp5u.jpg'
  );

  useEffect(() => {
    if (!canvasRef.current) {
      // Initialize Fabric.js canvas
      const canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#f0f0f0',
      });

      canvasRef.current = canvas;

      if (image) {
        fabric.Image.fromURL(image, (img) => {
          canvasRef.current?.setBackgroundImage(
            img,
            canvasRef.current?.renderAll.bind(canvasRef.current)
          );
        });
      }
    }
  }, [image]);

  const addRectangle = () => {
    if (canvasRef.current) {
      const rect = new fabric.Rect({
        left: 10,
        top: 10,
        fill: 'transparent',
        stroke: 'red',
        strokeWidth: 2,
        width: 50,
        height: 50,
      });

      canvasRef.current.add(rect);
      canvasRef.current.renderAll();
    }
  };

  const getBoundingCoordinates = () => {
    if (canvasRef.current) {
      const objects = canvasRef.current.getObjects();
      if (objects.length > 0) {
        const rect = objects[0] as fabric.Rect;
        
        // Ensure rect is not undefined before accessing its properties
        if (rect) {
          const x1 = rect.left ?? 0;
          const y1 = rect.top ?? 0;
          
          // Ensure rect.width is not undefined before using it
          const width = rect.width ?? 0;
          const height = rect.height ?? 0;
  
          const x2 = (rect.left ?? 0) + width;
          const y2 = (rect.top ?? 0) + height;
          
          console.log(`Bounding Coordinates: (${x1},${y1}) - (${x2},${y2})`);
        }
      }
    }
  };

  return (
    <div className='flex flex-col justify-center'>
      <div className='flex items-center justify-center '>
        <Button onClick={addRectangle} style={{margin:'15px'}}>Add Rectangle</Button>
        <Button onClick={getBoundingCoordinates}>Get Bounding Coordinates</Button>
      </div>
      <div className=''>
        <canvas id="canvas" width={800} height={600}></canvas>
      </div>
    </div>
  );
};

export default ImageEditor;
