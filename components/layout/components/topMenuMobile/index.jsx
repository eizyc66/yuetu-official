import { Link, ScrollView } from '@/components/index'

const Index = ({ routeArray, activeIndex }) => {


  return (
    <ScrollView className='bg-[#f6f5f5]'>
      {
        routeArray.map((item, idx)=>(
          <Link key={item.name} href={item.path} className={`${idx==activeIndex?'text-black/90 font-medium bg-white':'bg-[#f6f5f5] text-black/[.55]' } p-6 shrink-0`}>
          {item.name}
          </Link>
        ))
      }
    </ScrollView>
)}
 
export default Index;