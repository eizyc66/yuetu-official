import { useTranslation } from 'next-i18next'
import { SupportLayout } from '@/components/layout/index'
import { Responsive, ContactUs } from '@/components/index'
import { useMemo } from 'react';
import { useCopyToClipboard } from "react-use";
import { useMedia } from '@/utils/hooks'
import NoSSR from 'react-no-ssr';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }

export default function ContactUSPage({common}) {
  const { t } = useTranslation('common')

  return (
      <ContactUs/>
  )
}

ContactUSPage.getLayout = page => (
  <SupportLayout>
    {page}
  </SupportLayout>
)