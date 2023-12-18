import PalmQualityChart from '../components/Charts/PalmQualityChart'
import ImageUploadedByBranch from '../components/Charts/ImageUploadedByBranch'
import BranchVSHarvesterRelation from '../components/Charts/BranchVSHarvestersRelation'

const Home = () => {
  return (
    <div className='flex flex-wrap justify-evenly'>
      <PalmQualityChart/>
      <ImageUploadedByBranch/>
      <BranchVSHarvesterRelation/>
    </div>
  )
}

export default Home
