import { BasicLayout } from '@/components/layout/index'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react';


export default function AboutPage({ children, detailMenu}) {
  const { t, i18n } = useTranslation('common')

  const config = useMemo(()=>{
    const routeArray = [
      {
        name: t(`AC_type.household_AC`),
        path: '/product/household-AC'
      },
      {
        name: t(`AC_type.commercial_AC`),
        path: '/product/commercial-AC'
      },
      {
        name: t(`AC_type.special_AC`),
        path: '/product/special-AC'
      }
    ]
    return {
      title: t('route.product'),
      background: '/images/background/product.png',
      darkMode: true,
      customizeMenu: true,
      routeArray
    }
  },[ t ])

  const configs =  useMemo(()=>{
    return {
      ...config, detailMenu
    }
  }, [config, detailMenu])

  return (
    <BasicLayout config={configs}>
      <div className=''>
        {children}
      </div>
    </BasicLayout>
  )
}