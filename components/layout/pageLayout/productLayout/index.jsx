import { BasicLayout } from '@/components/layout/index'

const config = {
  title: '产品中心',
  background: '/images/background/product.png',
  darkMode: true,
  customizeMenu: true,
  routeArray: [
    {
      name: '家用空调',
      path: '/product/household-AC'
    },
    {
      name: '商用空调',
      path: '/support/commercial-AC'
    },
    {
      name: '特种空调',
      path: '/support/special-AC'
    }
  ]
}

export default function AboutPage({ children, detailMenu}) {

  return (
    <BasicLayout config={{...config, detailMenu}}>
      <div className=''>
        {children}
      </div>
    </BasicLayout>
  )
}