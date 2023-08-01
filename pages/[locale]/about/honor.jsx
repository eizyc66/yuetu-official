import { useTranslation } from 'next-i18next'
import { AboutLayout } from '@/components/layout/index'
import { useMemo } from 'react';
import { useMedia } from '@/utils/hooks'

import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps([])
export { getStaticPaths, getStaticProps }

const honorList = [
  {
    img: '/images/honor/2022-福建省创新型民营企业100强.png',
    name: '2022年，荣获“福建省创新型民营企业100强”'
  },
  {
    img: '/images/honor/2021-福建省创新型民营企业100强.png',
    name: '2021年，荣获“福建省创新型民营企业100强”'
  },
  {
    img: '/images/honor/2021-三明市优秀民营企业.png',
    name: '2021年，荣获“三明市优秀民营企业”'
  },
  {
    img: '/images/honor/2018-福建科技小巨人领军企业.png',
    name: '2018年7月，荣获“福建科技小巨人领军企业”称号'
  },
  {
    img: '/images/honor/2017-三明市企业技术中心.png',
    name: '2017年12月，荣获“三明市企业技术中心”称号'
  },
  {
    img: '/images/honor/2015-三明市优势品牌产品.png',
    name: '2015年12月，荣获“三明市优势品牌产品”称号'
  }
]

export default function HonorPage() {
  // const { t } = useTranslation('common')
  const isPC = useMedia()

  const renderHonor = ({img, name}) => (
    <li className='flex flex-col mb-8 items-center sm:mb-10'>
      <img className='w-[87%] h-[156px] sm:w-[85%] sm:h-[214px] object-contain' src={img} alt="" />
      <p className='text-black/[.55] mt-4 text-sm/[20px] text-center sm:text-xs'>{name}</p>
    </li>
  )

  return (
      <div className='px-4 pb-10 sm:pl-6  sm:pb-14 sm:pr-0'>
        <p className='text-base/[28px] text-black/70 sm:text-xs/[20px]'>宁化月兔科技有限公司凭借着对技术和品质的极致追求，在福建省、市、县各级领导的高度重视和亲切关怀下，成为福建省家电龙头企业、福建省重点上市后备企业、福建省重点建设项目、三明市优秀民营企业、三明市百亿龙头企业培育对象，荣获福建省创新型民营企业100强、三明市优势品牌产品、福建省科技小巨人领军企业、三明市企业技术中心等荣誉称号。</p>
        <ul className='mt-8 grid grid-cols-[repeat(2,46%)] sm:grid-cols-[repeat(2,36%)] text-center justify-around'>
          {honorList.map(item=>renderHonor(item))}
        </ul>
      </div>
  )
}

HonorPage.getLayout = page => (
  <AboutLayout>
    {page}
  </AboutLayout>
)