import { BasicLayout } from '@/components/layout/index'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react';

export default function SupportLayout({common, children}) {
  const { t, i18n } = useTranslation('common')
  const config = useMemo(()=>{
    let routeArray = []
    routeArray = i18n.language==='zh'? [
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
    ]:[
      {
        name: 'Contact Us',
        path: '/support/contact-us'
      },
      {
        name: 'Online Feedback',
        path: '#online_feedback'
      }
    ]
    return {
      title: t('route.service'),
      background: '/images/background/support.png',
      darkMode: true,
      routeArray
    }
  },[ i18n.language, t ])

  return (
    <BasicLayout config={config}>
      <div className='mt-6 sm:mt-0'>
        {children}
      </div>
    </BasicLayout>
  )
}