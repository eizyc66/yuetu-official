import { Link, RatioBox } from '@/components/index'
import { ReactSVG } from 'react-svg'
import { useTranslation } from 'next-i18next'
import { Responsive, Swiper } from '@/components/index'
import { IndexLayout } from '@/components/layout'
import { useMemo, useState } from 'react';
import { useMedia } from '@/utils/hooks'
import { RECOMMEND_NEWS, NEWS_LIST, PRODUCT_TYPE_LIST } from '@/utils/const'
import NoSSR from 'react-no-ssr';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

// const getInfo = async (id) => import(`@/utils/json/product/info/${id}.json`).then(module => ({
//   ...module.default,
//   id
// }))
const reg = /[class, style]\w*?={?[`"'](.*?)[`"']}?/g

const getNewsContent = async (list) => {
  let data = await Promise.allSettled(
    list.map((item)=>import(`@/utils/json/news/article/${item.id}.json`)
      .then(module => ({ 
        content: module.default.replace(reg, ''),
        ...item
      })
    )))
  return data.map(item=>item.value)
}

const getList = async (list) => {
  let data = await Promise.allSettled(
    list.map((id)=>import(`@/utils/json/product/info/${id}.json`)
      .then(module => {
        const { coverImgs, nameInList, subnameInList } = module.default
        return {
          id,
          coverImg: coverImgs?.[0]??'', 
          nameInList, 
          subnameInList
        }
      }
    )))
  return data.map(item=>item.value)
}

const getProductListContent = async (list) => {
  let data = await Promise.allSettled(
    list.map((ids)=>getList(ids)))
  return data.map(item=>item.value)
}

const getStaticProps = makeStaticProps(['index'], async (ctx) =>{
  const recommendNewsList = NEWS_LIST.filter(item=>RECOMMEND_NEWS.includes(item.id))
  const recommendProductList = PRODUCT_TYPE_LIST.map(item=>{
    let recommendList = item.recommend
    let idList = item.ids
    return recommendList.filter(id=>idList.includes(id))
  })
  const newsList = await getNewsContent(recommendNewsList)
  const productList = await getProductListContent(recommendProductList)
  return {
    newsList,
    productList
  }
})
export { getStaticPaths, getStaticProps }


export default function IndexPage({ newsList, productList}) {
  const { t } = useTranslation('index')
  const isPC = useMedia()
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ form, setForm ] = useState({
    name: '',
    phone: '',
    company: '',
    'consult-content': ''
  })

  const updateForm = (key, val) => setForm((data)=>({...data, [key]:val}))

  const type = useMemo(()=>{
    return PRODUCT_TYPE_LIST?.[activeIndex]?.type
  },[activeIndex])

  const text = useMemo(()=>{
    return isPC===true?'6年保修 全国预约上门服务':'送货上门，免费安装'
  },[isPC])

  const showList = useMemo(()=>{
    return productList?.[activeIndex]
  },[productList, activeIndex])

  const renderButton = (text, path, classes) => (
    <Link href={path} className={`${classes} w-fit`}>
      <button className={`border text-base font-medium border-inherit py-3 px-10 sm:py-2 sm:px-6`}>
        {text}
      </button>
    </Link>
  )

  const divider = (
    <div className={'bg-black/[.07] h-px w-full sm:hidden'}>
    </div>
  )

  const renderInput = (key, classes = '', rowNumber = 1) => (
  <div className={`${classes} inline-flex flex-row p-4 sm:p-3 border-[0.5px] sm:border border-black/[.07] bg-white mt-4 text-left text-base ${rowNumber==1?'sm:text-sm':'sm:text-sm/[20px]'}`}>
    <div className='w-16 mr-4 flex-shrink-0 text-black/70 font-medium sm:font-normal'>{t(key)}</div>
    {
      rowNumber === 1?(
        <input type="text" className='flex-1' value={form[key]} onChange={(e)=>updateForm(key, e.target.value)} placeholder={t(`placeholder.${key}`)} />
      ):(
        <textarea name="" className='flex-1' value={form[key]}  rows={rowNumber} onChange={(e)=>updateForm(key, e.target.value)} placeholder={t(`placeholder.${key}`)}></textarea>
      )
    }
  </div>
  )

  const renderNews = ({ title, id, time, cover, content}) => (
    <Link href={`/about/news/${id}`}>
      <li className='text-black/90 w-full flex flex-row items-center mb-5 sm:mb-10 sm:py-0'>
        <RatioBox width={280} height={165} className={`w-2/5 bg-center bg-no-repeat bg-cover mr-4 flex-shrink-0 flex-grow-0 sm:min-w-[148px] ${id==0?'sm:w-[43.75%]':'sm:w-[18.5%]'} sm:mr-6`} style={{backgroundImage: `url('${cover}')`}} />
        <div className='flex flex-col justify-center flex-1'>
          <p className='text-sm/[24px] line-clamp-3 sm:line-clamp-1 sm:text-base'>{title}</p>
          <div className='hidden text-xs/[20p] mt-2 text-black/[.55] sm:line-clamp-2 sm:mt-4' dangerouslySetInnerHTML={{__html:content}}></div>
        </div>
      </li>
    </Link>
  )

  return (
    <>
      <Swiper/>
      <div className='bg-white text-black/90'>
        <div className='content-auto'>
        <div>
          <div className='w-[68vw] sm:w-[420px] flex flex-row justify-between items-end m-auto sm:my-14'>
              { 
              PRODUCT_TYPE_LIST.map((item, idx)=>{
                const divider = (
                  <div className='bg-black/[.07] w-[0.5px] h-[44px] sm:w-[1px] sm:h-[88px]'></div>
                )

                return (
                  <>
                    {idx==0?null:divider}
                    <div className={`text-center flex flex-col items-center ${item.type===type?'':'opacity-50'}`} key={item.name} onClick={()=>setActiveIndex(idx)}>
                      <NoSSR>
                        <ReactSVG className='w-10 h-10 sm:w-16 sm:h-16 svg' key={item} src={item.logo} />
                      </NoSSR>
                      <span className='text-xs mt-2.5 sm:mt-5 sm:text-sm'>{item.name}</span>
                    </div>
                  </>
                )
              })
              }
          </div>
          <div className='w-full grid grid-cols-[repeat(2,44%)] mt-10 text-center justify-around sm:grid-cols-[repeat(4,22%)] sm:justify-between sm:h-min-[25%]'>
            <Responsive>
              {
                showList.map(item=>(
                  <Link href={`/product/${type}/${item.id}`} key={item.id} className='mb-8 sm:mb-10'>
                    <RatioBox width={100} height={100} className={`bg-center bg-no-repeat bg-cover`} style={{backgroundImage: `url('${item.coverImg}')`}} />
                    <p className='text-base mt-5 mb-3 text-black/90 font-medium'>{item.nameInList}</p>
                    <p className='text-xs text-black/[.55]'>{item.subnameInList}</p>
                  </Link>
                ))
              }
            </Responsive>
          </div>
          {renderButton('查看更多', `/product/${type}`, 'text-black/90 my-10 m-auto block border-black/[.15]')}
        </div>



            <div className="relative">
              <img className='w-screen my-10' src={`/images/index/building${isPC?'':'-mobile'}.png`}/>
              <div className="sm:absolute bottom-0 top-0 left-0 right-0 flex items-center">
                <div className='min-content-auto text-left'>
                  <div className="px-4 sm:w-[40%] sm:px-0">
                      <p className='text-xl font-medium mb-3 sm:text-white'>宁化月兔科技有限公司</p>
                      <p className='text-xs/[22px] text-black/[.55] sm:text-white/80'>宁化月兔科技有限公司成立于2015年3月22日，总部位于福建省三明市宁化县工业园，月兔是专业致力于空调产品的研发、生产、销售和服务的大型综合性白电集团。</p>
                      {renderButton('了解更多', '/about/introduction', 'my-8 m-auto block sm:border-white/40 sm:text-white/90 sm:mx-0 sm:mb-0')}
                  </div>
                </div>
              </div>
            </div>
            {divider}
            <div className="px-4">
              <p className='text-lg text-center font-medium mt-10 sm:text-[22px]/[22px]'>新闻资讯</p>
              <p className='text-black/[.55] text-xs text-center mt-3 mb-8 sm:mb-16'>最新企业动态</p>
              <ul className='sm:grid sm:grid-cols-[repeat(2,46%)] sm:justify-around'>
                {
                  newsList.map(item=>(
                    renderNews(item)
                  ))
                }
              </ul>
              {renderButton('查看更多', `/about/news`, 'text-black/90 my-10 m-auto block border-black/[.15]')}
            </div>
          </div>
      </div>
      <div className='bg-[#34485D] text-center sm:text-left'>
        <div className='content-auto'>
          <div className='relative flex flex-col justify-center items-center px-9 py-11 sm:flex-row sm:justify-start sm:py-[6.7%] sm:px-0'>
            <img src='/images/index/vin.png' alt='送货上门，免费安装'  className='w-[44vw] sm:absolute sm:w-auto sm:h-[76%] sm:bottom-0 sm:right-[6.4%] '/>
            <div>
              <NoSSR>
                <p className='text-white font-medium pt-10 pb-5 text-lg sm:pt-0 sm:pb-4 sm:text-[22px]'>{text}</p>
              </NoSSR>
              <p className='text-white/80 font-medium text-xs/4 sm:w-[45.3%] sm:right-0 '>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#F6F6F6]'>
        <div className='content-auto'>
          <Responsive>
            <div className='sm:flex sm:flex-row sm:justify-between sm:items-end'>
              <img className='hidden w-2/5 sm:block sm:max-w-md' src='/images/index/support.png'></img>
              <div className='px-4 pt-10 pb-8 text-center sm:text-left sm:w-[50%] sm:px-0 sm:py-20'>
                <p className='text-black/90 text-lg font-medium sm:text-[22px]/[22px]'>商务合作</p>
                <p className='text-black/[.55] text-xs mt-3 mb-8'>留下您的联系方式我们会在第一时间联系您</p>
                {renderInput('name','w-full sm:w-[48%]')}
                {renderInput('phone','w-full sm:w-[48%] sm:ml-[4%]')}
                {renderInput('company', 'w-full')}
                {renderInput('consult-content','w-full' , 7)}
                <button className='w-full sm:w-auto py-3 sm:py-2 sm:px-6 sm:text-sm bg-primary text-white text-base font-medium mt-11 sm:mt-8'>
                  {t('send')}
                </button>
              </div>
            </div>
          </Responsive>
        </div>
      </div>
    </>
  )
}

IndexPage.getLayout = page => (
  <IndexLayout>
    {page}
  </IndexLayout>
)