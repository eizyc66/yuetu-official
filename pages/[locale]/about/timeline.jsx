import { useTranslation } from 'next-i18next'
import { AboutLayout } from '@/components/layout/index'
import { useMemo } from 'react';
import { useMedia } from '@/utils/hooks'

import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps([ 'history'])
export { getStaticPaths, getStaticProps }

const timeline = [
  {
    year: '1986',
    content: '1986-1'
  },
  {
    year: '1986',
    content: '1986-2'
  },
  {
    year: '2004',
    content: '2004'
  },
  {
    year: '2015',
    content: '2015-1'
  },
  {
    year: '2015',
    content: '2015-2'
  },
  {
    year: '2017',
    content: '2017'
  },
  {
    year: '2019',
    content: '2019'
  },
  {
    year: '2020',
    content: '2020'
  },
  {
    year: '2022',
    content: '2022'
  },
  {
    year: '2023',
    content: '2023'
  },
]
export default function TimelinePage() {
  const { t } = useTranslation('history')
  const isPC = useMedia()

  const lineStyle = 'before:content-[""] before:left-0 before:w-px before:bg-black/10 before:absolute before:top-[-12px] before:bottom-[-12px] before:left-[5px] sm:before:left-[4px]'
  return (
      <div className='px-4 pb-10  sm:pl-6 sm:pb-14'>
        <ul className='pl-6'>
          {
            timeline.map((item,key)=>(
              <li key={key} className=''>
                <p className='text-black/90 relative font-medium pl-8 text-[32px]/[32px] sm:text-2xl before:content-[""] before:left-0 before:w-[12px] before:h-[12px] before:bg-primary before:absolute before:rounded-full before:bottom-1/2 before:translate-y-1/2 sm:before:w-[9px] sm:before:h-[9px]' >{item.year}</p>
                <p className={`text-black/70 relative pt-4 pl-8 pb-11 text-base sm:text-sm/[22px] sm:pt-3 sm:pb-10 ${key!=(timeline.length-1)?lineStyle:''}`}>{t(item.content)}</p>
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