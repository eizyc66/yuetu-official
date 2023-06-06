import { BasicLayout } from '@/components/layout/index'

const config = {
  title: '售后服务',
  background: '/images/background/support.png',
  darkMode: true,
  routeArray: [
    {
      name: '常见问题',
      path: '/support/question'
    },
    {
      name: '遥控器说明书/故障代码',
      path: '/support/docs'
    },
    {
      name: '联系我们',
      path: '/support/contact-us'
    }
  ]
}

export default function SupportLayout({common, children}) {


  return (
    <BasicLayout config={config}>
      <div className='mt-6 sm:mt-0'>
        {children}
      </div>
    </BasicLayout>
  )
}