import { useTranslation } from 'next-i18next'
import { AboutLayout } from '@/components/layout/index'
import { useMemo } from 'react';
import { useMedia } from '@/utils/hooks'
import { ContactUs } from '@/components/index'

import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps([])
export { getStaticPaths, getStaticProps }


const patentsList = [
  '一种多功能烟草烘干装置',
  '空调(825UA)',
  '空调(1080UA)',
  '驻车空调外机(BBW)',
  '驻车空调外机(GCW)',
  '驻车空调内机(GCG)',
  '一种多功能烟草烘干装置',
  '置顶一体驻车空调',
  '空调(YY)',
  '空调(相似设计1、2)',
  '空调',
  '一种用于空调感温包的安装结构'
]

export default function RDCenterPage() {
  const isPC = useMedia()

  const renderImg = (list) => (
    <div className='flex flex-row justify-evenly flex-wrap'>
      {
        list&&list.map(({img, name})=>(
        <div key={name} className='flex flex-col w-[48%] flex-shrink-0 sm:w-[42%] items-center sm:mb-8'>
          <img className='w-full sm:w-[85%] object-contain' src={img} alt="" />
          {name?<p className='text-black/[.55] mt-3 mb-6 text-xs/[20px] text-center sm:text-xs sm:mt-4 sm:mb-0'>{name}</p>:null}
        </div>
        ))
      }
    </div>
  )

  const renderContent = (content) => (
    <p className='text-black/70 text-base/[28px] mb-6 sm:text-xs/[20px]'>
      {content}
    </p>
  )

  const renderPatent = (name) => (
    <li className='w-[48%] mb-3 sm:w-[47%]'>
      <img className='w-full' src={`/images/r&d-center/patents/${name}.png`} alt="" />
    </li>
  )

  return (
    <div className='px-4 pb-10 sm:pl-6 sm:pb-14 sm:pt-0 sm:pr-0'>
      {renderContent('核心技术，自主研发。月兔空调研发中心拥有专业的研发实验室及研发技术团队，拥有技术管理、家用定频空调研发、家用变频空调研发、商用空调研发、汽车空调研发等部门。拥有3匹、5匹焓差实验室、内外机静音测试实验室等专业空调研发设备，申请发明专利，实用新型专利，外观专利等150余项。可开发各种平台的家用壁挂式、立柜式变频、定频空调，风管机、天花机、热泵烘干机、除湿新风机、新能源空调、汽车空调等。掌握包括AI智能语音、WIFI物联、全直流变频技术、健康除菌技术、驻车空调技术、热泵烘干技术等多项核心技术，是行业少数拥有空调自主研发实验室和研发能力的空调厂家之一。')}
      {
        renderImg(
          [
            {
              img: '/images/r&d-center/lab-1.png',
              name: '行业认可实验室'
            },
            {
              img: '/images/r&d-center/lab-2.png',
              name: '3匹、5匹焓差实验室'
            },
            {
              img: '/images/r&d-center/lab-3.png',
              name: '室内机静音实验室'
            },
            {
              img: '/images/r&d-center/lab-4.png',
              name: '室外机静音实验室'
            },
          ]
        )
      }
      
      {renderContent('行业认可实验室，能进行温度极限、老化极限、噪音极限、电压极限、极限安装环境测试、跌落运输实验等十八项极限实验。模拟用户使用环境的可靠性测试项目，开创了空调可靠性试验新局面，填补了空调行业空白，满足市场多样化的使用环境需求。')}
      {
        renderImg(
          [
            {
              img: '/images/r&d-center/work-1.png',
            },
            {
              img: '/images/r&d-center/work-2.png',
            },
          ]
        )
      }
      <ul className='flex flex-row flex-wrap justify-around mt-8 sm:justify-evenly'>
        {
          patentsList.map(item=>renderPatent(item))
        }
      </ul>
    </div>
  )
}

RDCenterPage.getLayout = page => (
  <AboutLayout>
    {page}
  </AboutLayout>
)