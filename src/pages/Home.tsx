import PalmQualityChart from '../components/Charts/PalmQualityChart'
import ImageUploadedByBranch from '../components/Charts/ImageUploadedByBranch'
import BranchVSHarvesterRelation from '../components/Charts/BranchVSHarvestersRelation'
import PalmListTable from '../components/tables/PalmListTable'
import HarvestersTimeLine from '../components/Charts/HarvestersTimeLine'
import ImageUploadedMonthly from '../components/Charts/ImageUploadedMonthly'
import BranchImageUploadedMonthly from '../components/Charts/BranchImageUploadedMonthly'

const Home = () => {
  return (
    <div className='bg-slate-50'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-items-center'>
        <PalmQualityChart/>
        <ImageUploadedByBranch/>
        <BranchVSHarvesterRelation/>
        <HarvestersTimeLine/>
        <ImageUploadedMonthly/>
        <BranchImageUploadedMonthly/>
      </div>
      <div className='mx-8 mb-8'>
        <PalmListTable/>
      </div>
    </div>
  )
}

export default Home
