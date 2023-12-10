import React, { useState, useEffect } from 'react';
import { Card, Pagination, Select, notification, Spin, DatePicker } from 'antd';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';  // Import Dayjs
import { URL } from '../redux/ActionTypes';
import { getCookie } from 'typescript-cookie';
import { Link } from 'react-router-dom';

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

const AllImages: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [branchesFilter, setBranchesFilter] = useState<number | null>(null);
  const [harvesterFilter, setHarvesterFilter] = useState<number | null>(null);
  const [branchCitiesFilter, setBranchCitiesFilter] = useState<string | null>(null);
  const [imageCreatedFilter, setImageCreatedFilter] = useState<Dayjs | null>(null);
  const [imageUploadedFilter, setImageUploadedFilter] = useState<Dayjs | null>(null);
  const [labelFilter, setLabelFilter] = useState<string | null>(null); // New filter for AI/Human Labeled
  const [loading, setLoading] = useState<boolean>(false);
  const userAccessKey = getCookie('userAccessKey');

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}images/`, {
        params: {
          label: labelFilter, // Add label filter to the API request
        },
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
      ? dayjs(image.image_created).isSame(imageCreatedFilter, 'day')
      : true;
    const imageUploadedCondition = imageUploadedFilter
      ? dayjs(image.image_uploaded).isSame(imageUploadedFilter, 'day')
      : true;

    const labelCondition = labelFilter
      ? image.palmdetails.some((palm) => palm.real === (labelFilter === 'AI Labeled'))
      : true;

    return (
      branchCondition &&
      harvesterCondition &&
      branchCityCondition &&
      imageCreatedCondition &&
      imageUploadedCondition &&
      labelCondition
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
          style={{ width: '100%', maxWidth: '240px', marginBottom: '8px', marginRight:'8px' }}
        />

        <Select
          placeholder="Filter by Label"
          style={{ width: '100%', maxWidth: '200px', marginBottom: '8px', marginRight: '8px' }}
          onChange={(value) => setLabelFilter(value)}
        >
          <Option value={null}>All Labels</Option>
          <Option value="AI Labeled">AI Labeled</Option>
          <Option value="Human Labeled">Human Labeled</Option>
        </Select>
      </div>

      <Spin spinning={loading}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredImages
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((image) => (
              <Link to={`/image/${image.imageid}`} key={image.imageid}>
                <Card key={image.imageid} cover={<img alt="example" src={`https://palm.blackneb.com${image.imagepath}`} />}>
                  <p>{`Image Created: ${image.image_created}`}</p>
                  <p>{`Image Uploaded: ${image.image_uploaded}`}</p>
                </Card>
              </Link>
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
