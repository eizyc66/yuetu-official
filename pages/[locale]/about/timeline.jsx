import { useTranslation } from 'next-i18next'
import { AboutLayout } from '@/components/layout/index'
import { useMemo } from 'react';
import { useMedia } from '@/utils/hooks'

import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }

const timeline = [
  {
    year: '1986',
    content: '月兔品牌成立于温州'
  },
  {
    year: '1986',
    content: '月兔空调新厂建成投产，三条自动化生产线及配套设备，自行开发设计生产家用分体空调、家用商用空调、汽车空调、家用厨具等40多种电器产品'
  },
  {
    year: '2004',
    content: '月兔空调总产量的80%出口世界60多个国家和地区，其中95%供应欧洲发达国家市场'
  },
  {
    year: '2015',
    content: '月兔空调将总部从温州搬到了福建三明。集团定位为以家用空调产品为发展基石，从内销切入，逐渐扩张外销发展'
  },
  {
    year: '2015',
    content: '宁化月兔科技有限公司于3月正式成立，位于福建省三明市宁化县工业园。公司占地面积385亩，建有生产厂房9.6万平方米，设有总装分厂、两器分厂、钣金分厂、注塑分厂，总装线12条，达到年产300万套家用及商用空调整机的能力'
  },
  {
    year: '2017',
    content: '月兔品牌产品品质全面提升，荣登央视品牌展播，影响力剧增，产销50万套'
  },
  {
    year: '2019',
    content: '产品以家用空调为核心，向商用、智能家居板块扩张；销售渠道往海外市场的拓展。全新一级变频智能空调系列问世，成为月兔主打产品'
  },
  {
    year: '2020',
    content: '月兔空调布局生态，扬帆起航，拓展家用、商用、智能家居、地产领域4大产业。集团大力投入研发建设，全面推进月兔集团高速发展，达到产销100万套'
  },
  {
    year: '2022',
    content: '在安徽省马鞍山市投资50亿，建设月兔智能家居产业园，以聚集空调智造及其上下游配套企业、智能家居、智能智造、定制代建、生活配套为功能分区的综合性产业园区'
  },
  {
    year: '2023',
    content: '月兔空调生产基地一期于2月19日正式投入生产，一期年产值可达150万套'
  },
]
export default function TimelinePage({common}) {
  // const { t } = useTranslation('common')
  const isPC = useMedia()

  const lineStyle = 'before:content-[""] before:left-0 before:w-px before:bg-black/10 before:absolute before:top-[-12px] before:bottom-[-12px] before:left-[5px] sm:before:left-[4px]'
  return (
      <div className='px-4 pb-10  sm:pl-6 sm:pb-14'>
        <ul className='pl-6'>
          {
            timeline.map((item,key)=>(
              <li key={key} className=''>
                <p className='text-black/90 relative font-medium pl-8 text-[32px]/[32px] sm:text-2xl before:content-[""] before:left-0 before:w-[12px] before:h-[12px] before:bg-primary before:absolute before:rounded-full before:bottom-1/2 before:translate-y-1/2 sm:before:w-[9px] sm:before:h-[9px]' >{item.year}</p>
                <p className={`text-black/70 relative pt-4 pl-8 pb-11 text-base sm:text-sm/[22px] sm:pt-3 sm:pb-10 ${key!=(timeline.length-1)?lineStyle:''}`}>{item.content}</p>
              </li>
            ))
          }
        </ul>
      </div>
  )
}

TimelinePage.getLayout = page => (
  <AboutLayout>
    {page}
  </AboutLayout>
)