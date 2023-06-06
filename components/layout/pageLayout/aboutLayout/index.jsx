import { BasicLayout } from '@/components/layout/index'

const config = {
  title: '关于兔月',
  background: '/images/background/building.png',
  routeArray: [
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
  ]
}

export default function AboutPage({children, detailMenu}) {


  return (
    <BasicLayout config={{...config, detailMenu}}>
      <div className='mt-6 sm:mt-0'>
        {children}
      </div>
    </BasicLayout>
  )
}