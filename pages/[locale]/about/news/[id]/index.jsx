import { useTranslation } from 'next-i18next'
import { AboutLayout } from '@/components/layout/index'
import { useMemo } from 'react';
import { useRouter } from 'next/router'
import { useMedia } from '@/utils/hooks'
import { NEWS_LIST } from '@/utils/const'
import { makeStaticPaths, makeStaticProps, createParams } from '@/utils/getStatic'

const params = {
  id: NEWS_LIST.map(item=>item.id)
}
const getStaticPaths = makeStaticPaths(createParams(params))
const getStaticProps = makeStaticProps([], async (ctx) =>{
  const id = ctx?.params?.id
  if(id===undefined) return {}
  let news = await import(`@/utils/json/news/article/${id}.json`)
        .then(module => module.default)
  return {
    news,
    detailMenu: NEWS_LIST.find(item=>item.id==id)?.title??''
  }
})

export { getStaticPaths, getStaticProps }


export default function NewsDetailPage({detailMenu, news}) {
  // const { t } = useTranslation('common')
  const router = useRouter()
  const id = router.query.id

  const renderTitle = (title, classes) => (
    <p className={`text-black/90 text-lg/[28px] font-medium mb-4 sm:text-base/[24px] ${classes??''}`} dangerouslySetInnerHTML={{__html:title}}></p>
  )

  const renderHeader = ( header ) => (
    <p className='text-black/90 text-[22px]/[36px] mb-6 font-medium'>{header}</p>
  )

  const renderContent = ( content ) => (
    <p className='text-black/70 mb-6 text-[16px]/[28px] sm:text-xs/[20px]' dangerouslySetInnerHTML={{__html:content}}></p>
  )

  const renderImg = ( img, desc ) => (
    <div className='mb-6'>
      <img className='w-full' src={img}/>
      <p className='mt-4 text-black/[.55] text-xs text-center' dangerouslySetInnerHTML={{__html:desc}}></p>
    </div>
  )




  return (
    <div className='px-4 pb-10 sm:pl-6  sm:pb-14 sm:pr-0'>
      {renderHeader(detailMenu)}
       <div dangerouslySetInnerHTML={{__html:news}}></div>
      {/* <div>
      </div> */}
    </div>
  )
}

NewsDetailPage.getLayout = (page, { detailMenu }) => (
  <AboutLayout detailMenu={detailMenu}>
    {page}
  </AboutLayout>
)