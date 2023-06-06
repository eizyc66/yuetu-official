import { useTranslation } from 'next-i18next'
import { AboutLayout } from '@/components/layout/index'
import { useMemo, useState } from 'react';
import { useMedia } from '@/utils/hooks'
import { Link, RatioBox } from '@/components/index'
import { NEWS_LIST } from '@/utils/const'

import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps(['common'], async (ctx) =>{
  const id = NEWS_LIST?.[0]?.id
  if(id===undefined) return {}
  const reg = /[class, style]\w*?={?[`"'](.*?)[`"']}?/g
  let news = await import(`@/utils/json/news/article/${id}.json`)
        .then(module => module.default)
  return {
    firstNews: news.replace(reg, '')
  }
})
export { getStaticPaths, getStaticProps }

export default function NewsPage({common, firstNews}) {
  // const { t } = useTranslation('common')
  const [listLength, setListLength] = useState(8)

  const showIdx = useMemo(()=>{
    if(!NEWS_LIST?.length) return 0
    else return Math.min(listLength, NEWS_LIST.length)
  }, [listLength])

  const showedList = useMemo(()=>{
    return NEWS_LIST.slice(0, showIdx)
  },[showIdx])

  const hasMore =  useMemo(()=>listLength<NEWS_LIST.length,[listLength])

  const renderNews = ({ title, id, time, cover}) => (
    <Link href={`/about/news/${id}`}>
      <li className='text-black/90 w-full flex flex-row items-center mb-6 sm:mb-0 sm:py-6 sm:border-b sm:border-black/[.07]'>
        <RatioBox width={280} height={165} className={`w-2/5 bg-center bg-no-repeat bg-cover mr-4 flex-shrink-0 flex-grow-0 sm:min-w-[148px]  ${id==0?'sm:w-[43.75%]':'sm:w-[18.5%]'} sm:mr-6`} style={{backgroundImage: `url('${cover}')`}} />
        <div className='flex flex-col justify-center flex-1'>
          <span className={`text-xs text-black/[.55] sm:pb-1.5 sm:border-b sm:border-black/[.07] sm:w-min ${id==0?'sm:text-base':''}`}>{time}</span>
          <p className='mt-2 font-medium text-sm/[24px] line-clamp-3 sm:mt-3'>{title}</p>
          {id==0?<div className='hidden text-xs/[20p] mt-3 text-black/[.55] sm:line-clamp-3' dangerouslySetInnerHTML={{__html:firstNews}}></div>:null}
        </div>
      </li>
    </Link>
  )

  return (
    <div className='px-4 pb-10 sm:pl-6 sm:pb-14 '>
      <ul>
        {
          showedList.map(item=>renderNews(item))
        }
      </ul>
      {hasMore?
      <button onClick={()=>setListLength(val=>val+8)}>加载更多</button>
      :null}
    </div>
  )
}

NewsPage.getLayout = page => (
  <AboutLayout>
    {page}
  </AboutLayout>
)