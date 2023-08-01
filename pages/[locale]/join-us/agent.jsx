import { JoinusLayout } from '@/components/layout/index'
import { ContactUs } from '@/components/index'
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps([])
export { getStaticPaths, getStaticProps }


export default function AgentPage() {


  return (
    <ContactUs/>
  )
}

AgentPage.getLayout = page => (
  <JoinusLayout>
    {page}
  </JoinusLayout>
)