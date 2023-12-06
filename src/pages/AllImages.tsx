import React, { useState, useEffect } from 'react';
import { Card, Pagination, Select, notification, Spin, DatePicker } from 'antd';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';  // Import Dayjs
import { URL } from '../redux/ActionTypes';
import { getCookie } from 'typescript-cookie';

const { Option } = Select;

interface Image {
  imageid: number;
  imagepath: string;
  image_created: string;
  image_uploaded: string;
  harvester_id: number;
  harvester_fullname: string;
  branch_id: number;
  branch_name: string;
  branch_city: string;
}

const AllImages: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [branchesFilter, setBranchesFilter] = useState<number | null>(null);
  const [harvesterFilter, setHarvesterFilter] = useState<number | null>(null);
  const [branchCitiesFilter, setBranchCitiesFilter] = useState<string | null>(null);
  const [imageCreatedFilter, setImageCreatedFilter] = useState<Dayjs | null>(null); // Use Dayjs
  const [imageUploadedFilter, setImageUploadedFilter] = useState<Dayjs | null>(null); // Use Dayjs
  const [loading, setLoading] = useState<boolean>(false);
  const userAccessKey = getCookie('userAccessKey');

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}images/`, {
        headers: {
          Authorization: `Bearer ${userAccessKey}`,
          'Content-Type': 'application/json',
        },
      });
      setImages(response.data);
    } catch (error: any) {
      console.error('Error fetching images:', error);
      notification.error({
        message: 'Failed to fetch images. Please try again!',
        description: error.message || 'Unknown error',
        duration: 5,
        onClose: () => {
          console.log('Notification closed');
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []); // Fetch data on component mount

  const filteredImages = images.filter((image) => {
    const branchCondition = branchesFilter ? image.branch_id === branchesFilter : true;
    const harvesterCondition = harvesterFilter ? image.harvester_id === harvesterFilter : true;
    const branchCityCondition = branchCitiesFilter
      ? image.branch_city === branchCitiesFilter
      : true;
    const imageCreatedCondition = imageCreatedFilter
      ? dayjs(image.image_created).isSame(imageCreatedFilter, 'day') // Use dayjs
      : true;
    const imageUploadedCondition = imageUploadedFilter
      ? dayjs(image.image_uploaded).isSame(imageUploadedFilter, 'day') // Use dayjs
      : true;

    return (
      branchCondition &&
      harvesterCondition &&
      branchCityCondition &&
      imageCreatedCondition &&
      imageUploadedCondition
    );
  });

  const uniqueBranches = Array.from(new Set(images.map((image) => image.branch_id)));
  const uniqueHarvesters: any[] = Array.from(new Set(images.map((image) => image.harvester_id)));
  const uniqueBranchCities: string[] = Array.from(new Set(images.map((image) => image.branch_city)));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBranchFilterChange = (value: number | null) => {
    setBranchesFilter(value);
  };

  const handleHarvesterFilterChange = (value: number | null) => {
    setHarvesterFilter(value);
  };

  const handleBranchCitiesFilterChange = (value: string | null) => {
    setBranchCitiesFilter(value);
  };

  const handleImageCreatedFilterChange = (date: dayjs.Dayjs | null) => {
    setImageCreatedFilter(date);
  };
  
  const handleImageUploadedFilterChange = (date: dayjs.Dayjs | null) => {
    setImageUploadedFilter(date);
  };

  return (
    <div className="my-8 mx-4">
      <div className="mb-4 flex flex-wrap items-center justify-center">
        <Select
          placeholder="Filter by Branch"
          style={{ width: '100%', maxWidth: '200px', marginBottom: '8px', marginRight: '8px' }}
          onChange={handleBranchFilterChange}
        >
          <Option value={null}>All Branches</Option>
          {uniqueBranches.map((branchId) => (
            <Option key={branchId} value={branchId}>
              {`${images.find((image) => image.branch_id === branchId)?.branch_name}`}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Harvester"
          style={{ width: '100%', maxWidth: '200px', marginBottom: '8px', marginRight: '8px' }}
          onChange={handleHarvesterFilterChange}
        >
          <Option value={null}>All Harvesters</Option>
          {uniqueHarvesters.map((harvesterId) => (
            <Option key={harvesterId} value={harvesterId}>
              {`${images.find((image) => image.harvester_id === harvesterId)?.harvester_fullname}`}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Branch City"
          style={{ width: '100%', maxWidth: '200px', marginBottom: '8px', marginRight: '8px' }}
          onChange={handleBranchCitiesFilterChange}
        >
          <Option value={null}>All Cities</Option>
          {uniqueBranchCities.map((city: any) => (
            <Option key={city} value={city}>
              {city}
            </Option>
          ))}
        </Select>

        <DatePicker
          placeholder="Filter by Image Created"
          onChange={handleImageCreatedFilterChange}
          style={{ width: '100%', maxWidth: '240px', marginBottom: '8px', marginRight: '8px' }}
        />

        <DatePicker
          placeholder="Filter by Image Uploaded"
          onChange={handleImageUploadedFilterChange}
          style={{ width: '100%', maxWidth: '240px', marginBottom: '8px' }}
        />
      </div>

      <Spin spinning={loading}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredImages
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((image) => (
              <Card key={image.imageid} cover={<img alt="example" src={"https://plus.unsplash.com/premium_photo-1677003649685-a9ff56182dbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFsbSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"} />}>
                <p>{image.harvester_fullname}</p>
                <p>{`${image.branch_name}, ${image.branch_city}`}</p>
              </Card>
            ))}
        </div>
      </Spin>

      <Pagination
        className="mt-4"
        current={currentPage}
        pageSize={itemsPerPage}
        total={filteredImages.length}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default AllImages;
