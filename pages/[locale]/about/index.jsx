import { useTranslation } from 'next-i18next'
import { AboutLayout } from '@/components/layout/index'
import { useMemo } from 'react';
import { useMedia } from '@/utils/hooks'
import NoSSR from 'react-no-ssr';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }

export default function AboutPage({common}) {
  const { t } = useTranslation('common')
  const isPC = useMedia()


  return (
    <AboutLayout>
      <div className='px-4 pb-10 sm:pl-6 sm:pb-14 '>

      </div>
    </AboutLayout>
  )
}