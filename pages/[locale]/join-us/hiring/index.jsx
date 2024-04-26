import { useTranslation } from 'next-i18next'
import { JoinusLayout } from '@/components/layout/index'
import { Link } from '@/components/index'
import { useMedia } from '@/utils/hooks'
import { JOB_LIST } from '@/utils/const'
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'


const getStaticProps = makeStaticProps([])
export { getStaticPaths, getStaticProps }

export default function HiringPage() {
  const { t } = useTranslation('common')

  const renderJob = ({title, id, basic, salary, count, desc}) => (
    <Link href={`/join-us/hiring/${id}`}>
      <li className='text-black/[.55] font-[13px]/[13px] border-b border-black/[.07] mb-5 pb-4 sm:text-xs sm:mb-6 sm:pb-6'>
        <p className='text-black/90 font-medium text-lg sm:text-base'>{title} {count?` (${count})`:''}</p>
        <p className='mt-3 mb-4 sm:mb-3'>
          <span className='text-primary font-medium mr-1 sm:mr-2'>{salary}</span>
          <span>{basic}</span>
        </p>
        <p>{desc}</p>
      </li>
    </Link>
  )

  return (
    <div className='px-4 pb-10 sm:pl-6 sm:pb-14 '>
      <ul>
        {
          JOB_LIST&&JOB_LIST.map(item=>renderJob(item))
        }
      </ul>
    </div>
  )
}

HiringPage.getLayout = page => (
  <JoinusLayout>
    {page}
  </JoinusLayout>
)