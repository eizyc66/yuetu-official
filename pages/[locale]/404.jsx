import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps([])
export { getStaticPaths, getStaticProps }

export default function Index() {
  const router = useRouter()
  const locale = router.query.locale || ''

  return <Head>

    <meta
        httpEquiv="Refresh"
        content={`0; URL=/${locale}`}
        key="desc"
      />
  </Head>
}