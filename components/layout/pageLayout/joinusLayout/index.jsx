import { BasicLayout } from '@/components/layout/index'

const config = {
  title: '加入月兔',
  background: '/images/background/building.png',
  routeArray: [
    {
      name: '月兔招聘',
      path: '/join-us/hiring'
    },
    {
      name: '代理商入驻',
      path: '/join-us/agent'
    },
    {
      name: '战略合作',
      path: '/join-us/cooperation'
    }
  ]
}

export default function JoinUsLayout({children, customizeMenu = false, detailMenu}) {


  return (
    <BasicLayout config={{...config, customizeMenu, detailMenu }}>
      <div className='mt-6 sm:mt-0'>
        {children}
      </div>
    </BasicLayout>
  )
}