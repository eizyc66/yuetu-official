import { useTranslation } from 'next-i18next'
import { AboutLayout } from '@/components/layout/index'
import { useMemo } from 'react';
import { useMedia } from '@/utils/hooks'

import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps([])
export { getStaticPaths, getStaticProps }

export const owns = [
  {
    property: '4.5',
    unit: 'million',
    attr: 'Productivity'
  },
  {
    property: '160',
    unit: 'million',
    attr: 'Sales Revenue'
  },
  {
    property: '3000+',
    attr: 'Staff'
  }
]

export default function IntroductionPage() {
  const { t, i18n } = useTranslation('common')

  const isZH = useMemo(()=>{
    return i18n.language === 'zh'
  }, [i18n.language])

  const renderTitle = (title) => (
    <p id={title} className='font-medium text-black/90 text-[22px]/[22px] relative mb-10 mt-8 sm:mb-4 sm:pl-[6px] sm:text-base after:content-[""] after:absolute after:bg-primary after:w-11 after:h-[2.5px] after:bottom-[-18.5px] after:left-0 sm:after:top-0 sm:after:left-0 sm:after:h-full sm:after:w-[2px]'>
      {title}
    </p>
  )

  const renderContent = (content) => (
    <div dangerouslySetInnerHTML={{__html:content}} className='text-black/70 text-base/[1.75] mb-8 sm:text-xs/[20px]'>
    </div>
  )

  return (
      <div className='px-4 pb-10 sm:-mt-6 sm:pl-6 sm:pb-14 sm:pr-0'>
        {
          isZH?(
            <>
            {renderTitle('关于月兔')}
            {renderContent('月兔品牌创立于1986年，是中国最早的一批空调品牌，至今已有30多年的历史，是专业致力于空调产品的研发、生产、销售和服务的大型综合性白电集团。经过多年的发展与沉淀，集团形成四大产业：家用空调产业、商用（特种）空调产业、智能家居产业、工程建设（地产）产业。 集团旗下拥有自有品牌月兔、一诺维克（Ynovik）、Benba等，投资建设了福建省三明市和安徽省马鞍山市两大生产制造基地，年产值可达450万套。')}
            <div className='w-full sm:flex sm:flex-row sm:flex-nowrap'>
              <img className='mb-3 w-full sm:w-[62.5%] sm:mb-0 sm:mr-2 sm:flex-shrink-0' src="/images/introduction/company.png" alt="" />
              <img className='w-full sm:w-[36%] sm:flex-1 sm:object-cover' src="/images/introduction/factory.png" alt="" />
            </div>
            {renderTitle('三明基地')}
            {renderContent('宁化月兔（集团）科技有限公司成立于2015年3月22日，总部位于福建省三明市宁化县工业园，占地面积385亩，一期工程建设14.6万平方米，总投资17亿元。 凭借着对技术和品质的极致追求，在福建省、市、县各级领导的高度重视和亲切关怀下，成为福建省家电龙头企业、福建省重点上市后备企业、福建省重点建设项目、三明市百亿龙头企业培训对象，荣获三明市优势品牌产品、福建省科技小巨人领军企业、三明市企业技术中心等荣誉称号。')}
            <div className='w-full sm:flex sm:flex-row sm:flex-nowrap'>
              <img className='mb-3 w-full sm:w-[43%] sm:mb-0 sm:mr-2 sm:flex-shrink-0' src="/images/introduction/ceremony.png" alt="" />
              <img className='w-full sm:w-[55%] sm:flex-1 sm:object-cover' src="/images/introduction/park.png" alt="" />
            </div>
            {renderTitle('马鞍山基地')}   
            {renderContent('月兔智能家居产业园位于安徽省马鞍山市当涂县经济开发区核心位置，占地约435亩，规划建筑面积22万㎡。总投资21.6 亿，项目以聚集空调智造及其上下游配套企业、智能家居、智能智造、定制代建、生活配套为功能分区的综合性产业园区。空调生产基地分两期建设，总项目占地189亩，建成总产值可达空调年产300万套，目前一期已于2月19日正式投产。')}
            </>
          ):(
            <>
              {renderTitle('About Us')}
              {renderContent(`The brand "Yuetu" was founded in 1986 and is one of the earliest air conditioning brands in China with a history of air-conditioner manufacturing for over 30 years. It is a large-scale comprehensive white household appliances group specializing in the R&D, manufacturing, sales and service of air-conditioning products. After years of development and precipitation, the conglomerate has formed four significant industries: household air-conditioning industry, commercial air-conditioning industry, smart home industry, and engineering construction (real estate) industry. The group has its own brands such as Yuetu, Ynovik, Benba, etc., and invested in the construction of two manufacturing bases in Sanming City, Fujian Province and Ma'anshan City, Anhui Province, with a productivity value of 4.5 million sets of air-conditioner annually.`)}
              {renderTitle('Our Vision')}
              {renderContent('To provide customers with comfortable air solutions during any season.')}
              {renderTitle('Our Mission')}
              {renderContent('Provide our customers with the ultimate experiences including the best services, affordable prices and superior quality.')}
              {renderTitle('Yuetu Owns')}
              {renderContent('2 Manufacturing Base<br/>2 manufacturing bases in Fujian province and Anhui province.')}
              <div className='w-full flex flex-row text-black/70 text-base/[1.75] sm:text-xs/[20px]'>
                {
                  owns.map(item=>(
                    <div className='w-1/3  xs:w-1/4  flex-inline flex-col' key={item.property}>
                      <div className='border-b inline-block'>
                        <span className='text-lg font-medium'>{item.property}</span>
                        <span className='ml-1'>{item.unit}</span>
                      </div>
                      <div className='text-xs mt-1'>{item.attr}</div>
                    </div>
                  ))
                }
              </div>
            </>
          )
        }
      </div>
  )
}

IntroductionPage.getLayout = page => (
  <AboutLayout>
    {page}
  </AboutLayout>
)