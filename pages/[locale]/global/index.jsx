import { useRouter } from 'next/router';
import { GlobalLayout } from '@/components/layout/index'
import { D3Map, Panel, ScrollView } from '@/components'
import { useMemo } from 'react';
import { WORLD_LIST } from '@/utils/const'

import { makeStaticPaths, makeStaticProps, createParams } from '@/utils/getStatic'
import { useState } from 'react';

const getList = async (list) => {
  let data = await Promise.allSettled(
    list.map((id)=>import(`@/utils/json/global/${id}.json`)
      .then(module => ({
        id,
        countryList: module.default
      })
    )))
  return data.map(item=>item.value)
}


const params = {
  locale: ['en']
}
const getStaticPaths = makeStaticPaths(createParams(params))
const getStaticProps = makeStaticProps([], async() => {
  const globals = WORLD_LIST.map(item=>item.value)
  const globalList = await getList(globals)
  return {
    globalList
  }
})
export { getStaticPaths, getStaticProps }


export default function GlobalPage({globalList}) {
  const router = useRouter()
  const [active, setActive] = useState(WORLD_LIST[0].value)
  const list = useMemo(()=>{
    return globalList?.find(item=>item.id==active)?.countryList??[]
  }, [globalList, active])

  return <>
  <div className='bg-gradient-to-b from-[rgba(236,240,245,1)] to-[rgba(244,246,248,1)]'>
    <D3Map active={active} onChange={(val)=>setActive(val)}/>
  </div>
  <div className='content-auto'>
  <ScrollView>
    <ul className='flex flex-1 flex-row text-center text-xs sm:text-sm sm:mt-8 sm:mb-4'>
      {
        WORLD_LIST&&WORLD_LIST.map(item=>(
          <li key={item.value} className={`${item.value===active?'bg-black text-white':'text-black/70'} flex-1 border-[#ddd] border py-3 px-3 sm:px-0 font-medium transition-all ease-in-out cursor-pointer duration-200 mx-[-0.5px] whitespace-nowrap`} onClick={()=>setActive(item.value)}>{item.label}</li>
        ))
      }
    </ul>
  </ScrollView>
    <div className='pb-14 px-4 pt-4 sm:px-0 sm:pt-0'>
      {
        list&&list.length==0?(
          <p className='text-xl text-black/40 text-center pt-10'>Empty</p>
        ):
        list&&list.map((item,idx)=>(
          <Panel key={item.country} value={item} status={false}/>
        ))
      }
    </div>
  </div>
  </>
}
GlobalPage.getLayout = page => (
  <GlobalLayout>
    {page}
  </GlobalLayout>
)