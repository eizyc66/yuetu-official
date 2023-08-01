import { BasicLayout } from '@/components/layout/index'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react';

export default function AboutPage({children, detailMenu}) {
  const { t, i18n } = useTranslation('common')

  const config = useMemo(()=>{
    let routeArray = []
    routeArray = i18n.language==='zh'? [
      {
        name: '集团介绍',
        path: '/about/introduction'
      },
      {
        name: '品牌故事 / 发展历程',
        path: '/about/timeline'
      },
      {
        name: '集团荣誉',
        path: '/about/honor'
      },
      {
        name: '集团资讯',
        path: '/about/news'
      },
      {
        name: '研发中心',
        path: '/about/RD-center'
      },
    ]:[
      {
        name: 'Company Introduction',
        path: '/about/introduction'
      },
      {
        name: 'History',
        path: '/about/timeline'
      }
    ]
    return {
      title: t('route.about_us'),
      background: '/images/background/building.png',
      routeArray
    }
  },[i18n.language, t])

  return (
    <BasicLayout config={{...config, detailMenu}}>
      <div className='mt-6 sm:mt-0'>
        {children}
      </div>
    </BasicLayout>
  )
}