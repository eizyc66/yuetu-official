import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter()
  const locale = router.query.locale || ''

  return <Head>

    <meta
        httpEquiv="Refresh"
        content={`0; URL=/zh`}
        key="desc"
      />
  </Head>
}