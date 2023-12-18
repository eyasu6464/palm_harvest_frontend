import { useState, useEffect } from "react";
import { Select, Descriptions, Tag } from "antd";

const { Option } = Select;

const sampleData = [
  ["Harvester1", "2023-01-01", "2023-01-05", 10],
  ["Harvester2", "2023-01-02", "2023-01-06", 15],
  ["Harvester3", "2023-01-03", "2023-01-07", 20],
  ["Harvester4", "2023-01-04", "2023-01-08", 25],
  ["Harvester5", "2023-01-05", "2023-01-09", 30],
  ["Harvester6", "2023-01-06", "2023-01-10", 35],
  ["Harvester7", "2023-01-07", "2023-01-11", 40],
  ["Harvester8", "2023-01-08", "2023-01-12", 45],
  ["Harvester9", "2023-01-09", "2023-01-13", 50],
  ["Harvester10", "2023-01-10", "2023-01-14", 55],
];

const HarvestersTimeLine = () => {
  const [selectedHarvester, setSelectedHarvester] = useState<any>("");

  useEffect(() => {
    // Set the default harvester to the first one in sampleData
    setSelectedHarvester(sampleData[0][0]);
  }, []);

  const handleHarvesterChange = (value:any) => {
    setSelectedHarvester(value);
  };

  const getHarvesterData = (harvester:any) => {
    return sampleData.find((data) => data[0] === harvester);
  };

  const filteredData = getHarvesterData(selectedHarvester);

  return (
    <div className="w-96 drop-shadow-xl m-2 p-4 bg-white rounded-md">
      <p style={{color:"#ff6929"}} className='font-semibold'>Harvesters Workflow</p>
      <Select
        placeholder="Harvester Name"
        style={{ width: '100%', marginBottom: 8, display: 'block' }}
        onChange={handleHarvesterChange}
        value={selectedHarvester}
      >
        <Option value="">All</Option>
        {sampleData.map((data) => (
          <Option key={data[0]} value={data[0]}>
            {data[0]}
          </Option>
        ))}
      </Select>
      <Descriptions bordered column={1} style={{ marginTop: '16px' }}>
        {filteredData && (
          <>
            <Descriptions.Item label="Started Date:">
              <Tag color="blue">{filteredData[1]}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Last Date">
              <Tag color="blue">{filteredData[2]}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Palms Collected">
              <Tag color="blue">{`${filteredData[3]} Total`}</Tag>
            </Descriptions.Item>
          </>
        )}
      </Descriptions>
    </div>
  );
};

export default HarvestersTimeLine;
