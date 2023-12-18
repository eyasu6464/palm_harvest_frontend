import PalmQualityChart from '../components/Charts/PalmQualityChart'
import ImageUploadedByBranch from '../components/Charts/ImageUploadedByBranch'
import BranchVSHarvesterRelation from '../components/Charts/BranchVSHarvestersRelation'
import PalmListTable from '../components/tables/PalmListTable'

const Home = () => {
  return (
    <div>
      <div className='flex flex-wrap justify-evenly'>
        <PalmQualityChart/>
        <ImageUploadedByBranch/>
        <BranchVSHarvesterRelation/>
      </div>
      <div className='mx-8'>
        <PalmListTable/>
      </div>
    </div>
    
    
  )
}

export default Home
