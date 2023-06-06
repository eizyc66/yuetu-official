import { JoinusLayout } from '@/components/layout/index'
import { useMedia } from '@/utils/hooks'
import { ContactUs } from '@/components/index'
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }


export default function CooperationPage({common}) {
  return (
    <ContactUs/>
  )
}

CooperationPage.getLayout = page => (
  <JoinusLayout>
    {page}
  </JoinusLayout>
)