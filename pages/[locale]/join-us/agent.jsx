import { JoinusLayout } from '@/components/layout/index'
import { ContactUs } from '@/components/index'
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }


export default function AgentPage({common}) {


  return (
    <ContactUs/>
  )
}

AgentPage.getLayout = page => (
  <JoinusLayout>
    {page}
  </JoinusLayout>
)