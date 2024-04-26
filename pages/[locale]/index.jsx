import { Link, RatioBox } from '@/components/index'
import { useForm as useFormSpree, ValidationError } from '@formspree/react';
import { useForm } from "react-hook-form";
import { ReactSVG } from 'react-svg'
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import { Responsive, Swiper } from '@/components/index'
import { IndexLayout } from '@/components/layout'
import { useMemo, useState, useLayoutEffect } from 'react';
import { useMedia } from '@/utils/hooks'
import { RECOMMEND_NEWS, NEWS_LIST, PRODUCT_TYPE_LIST_ZH, PRODUCT_TYPE_LIST_EN } from '@/utils/const'
import NoSSR from 'react-no-ssr';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const typeMapping = {
  phone: 'phone'
}
const reg = /[class, style]\w*?={?[`"'](.*?)[`"']}?/g
const maker = /<\S+?>/g

const getNewsContent = async (list) => {
  let data = await Promise.allSettled(
    list.map((item)=>import(`@/utils/json/news/article/${item.id}.json`)
      .then(module => ({ 
        content: module.default.replace(reg, '').replace(maker,''),
        ...item
      })
    )))
  return data.map(item=>item.value)
}

const getList = async (list) => {
  let data = await Promise.allSettled(
    list.map((id)=>import(`@/utils/json/product/info/${id}.json`)
      .then(module => {
        const { cover, coverImgs, nameInList, subnameInList } = module.default
        return {
          id,
          coverImg: cover??coverImgs?.[0]??'', 
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

const getStaticProps = makeStaticProps(['feedback','index'], async (ctx) =>{
  const locale = ctx?.params?.locale
  const PRODUCT_TYPE_LIST = locale === 'zh'?PRODUCT_TYPE_LIST_ZH:PRODUCT_TYPE_LIST_EN
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


export default function IndexPage({ newsList =[], productList = []}) {
  const router = useRouter()
  const { t, i18n } = useTranslation(['common', 'feedback', 'index'])
  const isPC = useMedia()
  const [ activeIndex, setActiveIndex ] = useState(0)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      company: "",
      "consult-content": "",
    }
  });

  const t_feedback = (key)=>{
    return t(key, {ns: 'feedback'})
  }

  const t_index = (key)=>{
    return t(key, {ns: 'index'})
  }

  const nameRegister = register('name',{
    required: 'validate.name-empty',
  });
  const phoneRegister = register('phone',{
    required: 'validate.phone-empty',
    pattern: {
      value: /^[0-9]*$/,
      message: 'validate.phone-invalid',
    }
  }); 
  const companyRegister = register('company',{
    required: 'validate.company-empty',
  }); 
  const consultContentRegister = register('consult-content',{
    required: 'validate.consult-content-empty',
  }); 

  
  const [ form, sendToFormSpree] = useFormSpree("xrgvndwn");


  const onSubmit = (data) => {
    sendToFormSpree(data);
  };

  const isZH = useMemo(()=>{
    return i18n.language === 'zh'
  }, [i18n.language])

  const PRODUCT_TYPE_LIST = useMemo(()=>{
    return isZH?PRODUCT_TYPE_LIST_ZH:PRODUCT_TYPE_LIST_EN
  }, [isZH])

  const type = useMemo(()=>{
    return PRODUCT_TYPE_LIST?.[activeIndex]?.type
  },[activeIndex, PRODUCT_TYPE_LIST])

  const text = useMemo(()=>{
    return isPC===true?'6年保修 全国预约上门服务':'送货上门，免费安装'
  },[isPC])

  const showList = useMemo(()=>{
    return productList?.[activeIndex]
  },[productList, activeIndex])

  useLayoutEffect(()=>{
    const path = router.asPath
    if(path.indexOf('#online_feedback')!=-1) {
      setTimeout(()=>{
        window.scrollTo(0, document.documentElement.scrollHeight)
      },300)
    }
  },[])

  const renderButton = (text, path, classes) => (
    <Link href={path} className={`${classes} w-fit`}>
      <button className={`border text-base font-medium border-inherit py-3 px-10 sm:py-2 sm:px-6`}>
        {t(text)}
      </button>
    </Link>
  )

  const divider = (
    <div className={'bg-black/[.07] h-px w-full sm:hidden'}>
    </div>
  )

  const renderInput = (key, classes = '', register , showText = key ,rowNumber = 1) => (
  <div className={`${classes} relative inline-flex flex-row p-4 sm:p-3 border-[0.5px] sm:border border-black/[.07] bg-white mt-4 text-left text-base ${rowNumber==1?'sm:text-sm':'sm:text-sm/[20px]'}`}>
    <div className='w-16 mr-4 flex-shrink-0 text-black/70 font-medium sm:font-normal'>{t_feedback(showText)}</div>
    {
      rowNumber === 1?(
        <input {...register} id={key} className='flex-1' type={typeMapping[key]??'text'} placeholder={t_feedback(`placeholder.${key}`)} />
      ):(
        <textarea {...register} id={key} className='flex-1' type={typeMapping[key]} rows={rowNumber} placeholder={t_feedback(`placeholder.${key}`)}></textarea>
      )
    }
    <p className='absolute text-xs left-1 top-full pt-1 text-red-600'>{t_feedback(errors[key]?.message)}</p>
  </div>
  )

  const renderNews = ({ title, id, time, cover, content}) => (
    <Link href={`/about/news/${id}`}>
      <li className='text-black/90 w-full group flex flex-row items-center mb-5 sm:mb-10 sm:py-0'>
        <RatioBox width={280} height={165} src={cover} imgClassName='transition-default object-cover sm:group-hover:scale-[1.03]' className={`w-2/5 bg-center mr-4 flex-shrink-0 flex-grow-0 sm:min-w-[148px] ${id==0?'sm:w-[43.75%]':'sm:w-[18.5%]'} sm:mr-6`} />
        <div className='flex flex-col justify-center flex-1'>
          <p className='text-sm/[24px] line-clamp-3 sm:line-clamp-1 sm:text-base'>{title}</p>
          <div className='hidden text-xs/[20px] mt-2 text-black/[.55] sm:line-clamp-2 sm:mt-4' dangerouslySetInnerHTML={{__html:content}}></div>
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
              PRODUCT_TYPE_LIST&&PRODUCT_TYPE_LIST.map((item, idx)=>{
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
                      <span className='text-xs mt-2.5 sm:mt-5 sm:text-sm'>{ t(`AC_type.${item.name}`) }</span>
                    </div>
                  </>
                )
              })
              }
          </div>
          <div className='w-full grid grid-cols-[repeat(3,28%)] mt-10 text-center justify-around sm:grid-cols-[repeat(3,24%)] sm:mt-20 sm:justify-evenly sm:h-min-[25%]'>
            <Responsive>
              {
                showList&&showList.map(item=>(
                  <Link href={`/product/${type}/${item.id}`} key={item.id} className='mb-8 sm:mb-10 group transition-default sm:hover:shadow-[0_0_5px_0_rgb(0,0,0,0.08)]'>
                    <RatioBox width={100} height={100} src={item.coverImg} imgClassName='transition-default object-contain sm:group-hover:scale-[1.03]' />
                    <p className='text-sm/4 sm:text-base/5 mt-5 mb-3 text-black/90 font-medium'>{item.nameInList}</p>
                    <p className='text-xs text-black/[.55] sm:mb-5'>{item.subnameInList}</p>
                  </Link>
                ))
              }
            </Responsive>
          </div>
          {renderButton('more.see', `/product/${type}`, 'text-black/90 my-10 m-auto block border-black/[.15] hover:text-white hover:bg-primary transition-default')}
        </div>



            <div className="relative group sm:mb-20">
              <div className='overflow-hidden'>
                <img className='w-full transition-default sm:group-hover:scale-[1.03]' src={`/images/index/building${isPC?'':'-mobile'}.png`}/>
              </div>
              <div className="sm:absolute bottom-0 top-0 left-0 right-0 flex items-center">
                <div className='min-content-auto text-left'>
                  <div className="px-4 pt-10 sm:w-[56%] sm:px-0 sm:pt-0">
                      <p className='text-xl font-medium mb-3 sm:text-white'>{t_index('title')}</p>
                      <p className='text-xs/[22px] text-black/[.55] sm:text-white/80 sm:line-clamp-2 md:line-clamp-3 lg:line-clamp-4 xl:line-clamp-5'>{t_index('desc')}</p>
                      {renderButton('more.learn', '/about/introduction', 'my-8 m-auto block sm:border-white/40 sm:text-white/90 sm:mx-0 sm:mb-0 sm:mt-4 lg:mt-8')}
                  </div>
                </div>
              </div>
            </div>
            {divider}
            {isZH?(
              <div className="px-4">
                <p className='text-lg text-center font-medium mt-10 sm:text-[22px]/[22px]'>新闻资讯</p>
                <p className='text-black/[.55] text-xs text-center mt-3 mb-8 sm:mb-16'>最新企业动态</p>
                <ul className='sm:grid sm:grid-cols-[repeat(2,46%)] sm:justify-around'>
                  {
                    newsList&&newsList.map(item=>(
                      renderNews(item)
                    ))
                  }
                </ul>
                {renderButton('more.see', `/about/news`, 'text-black/90 my-10 m-auto block border-black/[.15] hover:text-white hover:bg-primary transition-default')}
              </div>
            ):null}
          </div>
      </div>
      {
        isZH?(
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
        ):null
      }
      <div className='bg-[#F6F6F6]'>
        <div className='content-auto'>
          <Responsive>
            <div className='sm:flex sm:flex-row sm:justify-between sm:items-end'>
              <img className='hidden w-2/5 sm:block sm:max-w-md' src='/images/index/support.png'></img>
              <div className='px-4 pt-10 pb-8 text-center sm:text-left sm:w-[50%] sm:px-0 sm:py-20'>
                <p className='text-black/90 text-lg font-medium sm:text-[22px]/[22px]'>{t_feedback('feedback')}</p>
                <p className='text-black/[.55] text-xs mt-3 mb-8'>{t_feedback('desc')}</p>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  {renderInput('name','w-full sm:w-[48%]', nameRegister)}
                  {renderInput('phone','w-full sm:w-[48%] sm:ml-[4%]', phoneRegister)}
                  {renderInput('company', 'w-full', companyRegister)}
                  {renderInput('consult-content','w-full' , consultContentRegister ,isPC?'consult-content':'consult-content-abbr',7)}
                  <button type="submit" disabled={form.succeeded||form.submitting} id='online_feedback' className='w-full sm:w-auto py-3 sm:py-2 sm:px-6 sm:text-sm bg-primary text-white text-base font-medium mt-11 sm:mt-8'>
                    {t_feedback('send')}
                  </button>
                  {
                    form.succeeded?(<span className='text-xs text-green-600 mx-4'>{t_feedback('send_success')} !</span>)
                    :form.errors.length?<span className='text-xs text-red-600 mx-4'>{t_feedback('send_failure')} !</span>
                    :null
                  }
                </form>
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