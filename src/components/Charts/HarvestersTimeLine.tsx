import { useState, useEffect } from "react";
import { Select, Descriptions, Tag, Spin, notification } from "antd";
import axios from "axios";
import { URL } from '../../redux/ActionTypes';
import { getCookie } from 'typescript-cookie';

interface HarvesterData {
  harvesterid: number;
  full_name: string;
  image_count: number;
  total_fruits_collected: number;
  start_date: string;
  last_date: string;
}

const { Option } = Select;

const HarvestersTimeLine = () => {
  const [selectedHarvester, setSelectedHarvester] = useState<number | null>(null);
  const [harvestersData, setHarvestersData] = useState<HarvesterData[] | null>(null);
  const userAccessKey = getCookie('userAccessKey');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${URL}harvesterpalmconnectedsummary/`, {
          headers: {
            Authorization: `Bearer ${userAccessKey}`,
            'Content-Type': 'application/json',
          },
        });

        setHarvestersData(response.data);

        // Set the default harvester to the first one in the fetched data
        setSelectedHarvester(response.data && response.data.length > 0 ? response.data[0].harvesterid : null);

      } catch (error) {
        console.error('Error fetching harvester data:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch harvester data. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleHarvesterChange = (value: number) => {
    setSelectedHarvester(value);
  };

  const selectedHarvesterData = harvestersData?.find(
    (harvester) => harvester.harvesterid === selectedHarvester
  );

  return (
    <div className="w-96 drop-shadow-xl m-2 p-4 bg-white rounded-md">
      <p style={{ color: "#ff6929" }} className="font-semibold">
        Harvesters Workflow
      </p>
      <Select
        placeholder="Harvester Name"
        style={{ width: '100%', marginBottom: 8, display: 'block' }}
        onChange={handleHarvesterChange}
        value={selectedHarvester}
      >
        {loading ? (
          <Option disabled value={null}>
            Loading...
          </Option>
        ) : (
          <>
            <Option value={null}>All</Option>
            {harvestersData?.map((harvester: HarvesterData) => (
              <Option key={harvester.harvesterid} value={harvester.harvesterid}>
                {harvester.full_name}
              </Option>
            ))}
          </>
        )}
      </Select>
      <Spin spinning={loading}>
        <Descriptions bordered column={1} style={{ marginTop: '16px' }}>
          {selectedHarvesterData && (
            <>
              <Descriptions.Item label="Harvester ID:">
                <Tag color="blue">{selectedHarvesterData.harvesterid}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Started Date:">
                <Tag color="blue">{selectedHarvesterData.start_date}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Last Date">
                <Tag color="blue">{selectedHarvesterData.last_date}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Palms Collected">
                <Tag color="blue">{`${selectedHarvesterData.total_fruits_collected} Total`}</Tag>
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </Spin>
    </div>
  );
};

export default HarvestersTimeLine;
