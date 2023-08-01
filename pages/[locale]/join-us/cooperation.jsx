import { JoinusLayout } from '@/components/layout/index'
import { useMedia } from '@/utils/hooks'
import { ContactUs } from '@/components/index'
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps([])
export { getStaticPaths, getStaticProps }


export default function CooperationPage() {
  return (
    <ContactUs/>
  )
}

CooperationPage.getLayout = page => (
  <JoinusLayout>
    {page}
  </JoinusLayout>
)