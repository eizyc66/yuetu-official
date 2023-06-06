import { ProductLayout } from '@/components/layout/index'
import { ParamsTable, ScrollView, RatioBox } from '@/components/index'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import NoSSR from 'react-no-ssr'
import { ReactSVG } from 'react-svg'
import { PRODUCT_TYPE_LIST } from '@/utils/const'
import { makeStaticPaths, makeStaticProps } from '@/utils/getStatic'
import { useMemo, useState } from 'react'

const paramArr = PRODUCT_TYPE_LIST.reduce((res,item)=>{
  const type = item.type
  const ids = item.ids
  res.push(...ids.map((id)=>({id, type})))
  return res
},[])
const getStaticPaths = makeStaticPaths(paramArr)
const getStaticProps = makeStaticProps(['common','product'], async (ctx) =>{
  const id = ctx?.params?.id
  const type = ctx?.params?.type
  let info = await import(`@/utils/json/product/info/${id}.json`)
        .then(module => module.default)
  return {
    info,
    id,
    type,
    detailMenu: info.name
  }
})

export { getStaticPaths, getStaticProps }


export default function ProcuctPage({ info, id, type }) {
  const { t } = useTranslation('product')
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)

  const coverImgs = useMemo(()=>{
    return info.coverImgs??[]
  }, [info])

  const detailImgs = useMemo(()=>{
    return info.detailImgs??[]
  }, [info])

  const showImg = useMemo(()=>{
    return coverImgs?.[activeIndex]??''
  }, [coverImgs, activeIndex])


  const divider = (classes) => (
    <div className={`bg-black/[.07] h-px w-full ${classes}`}>
    </div>
  )

  const renderTitle = (title, classes = '') => (
    <p className={`${classes} text-black/90 mb-6 relative pl-2 text-sm before:content-[""] before:left-0 before:w-[2px] before:h-full before:bg-primary before:absolute before:top-0 before:bottom-0 sm:font-medium`}>{title}</p>
  )

  const renderColor = ({value, label}) => (
    <div className='inline-flex items-center flex-row mr-6 text-xs sm:mr-8'>
      <div className='w-3 h-3 sm:w-4 sm:h-4 border-[0.5px] border-black/20 mr-2' style={{background: `${value}`}}></div>
      <span className='text-black/90'>{label}</span>
    </div>
  )

  const renderAttr = (item) => (
    <div className='py-2 px-3 bg-black/[.04] mr-3 inline-block text-black text-sm font-medium sm:text-xs'>{item}</div>
  )

  const renderItem = (svgPath, label, text, classes = '') => (
    <div className={`flex flex-row items-start sm:inline-flex ${classes}`}>
        <div className='flex flex-row items-center flex-shrink-0'>
          <NoSSR>
            <ReactSVG className='w-3 h-3 sm:w-4 sm:h-4 svg' key={label} src={svgPath} />
          </NoSSR>
          <span className='text-black/[.55] mx-2 flex-shrink-0'>{label}</span>
        </div>
        <span className='text-black/90 font-medium'>{text}</span>
    </div>
  )

  const leftArrow = (
    <div className="w-5 h-full bg-black/[.04] flex items-center justify-center">
      <img className="w-4 h-4" src="/svg/arrow-left.svg" alt="" />
    </div>)

  const rightArrow = (
      <div className="w-5 h-full bg-black/[.04] flex items-center justify-center">
        <img className="w-4 h-4" src="/svg/arrow-right.svg" alt="" />
      </div>
  )

  return (
    <div className='sm:py-6'>
      <div className='text-black/[.55] flex flex-col sm:flex-row'>
        <div className='w-screen bg-black/[.04] sm:w-[38%] sm:bg-transparent sm:mr-6'>
          <RatioBox width={330} height={330} className={`w-full bg-center bg-no-repeat bg-contain`} style={{backgroundImage: `url('${showImg}')`}} />
          <div className='w-full sm:mt-3'>
            <ScrollView rightArrow={rightArrow} leftArrow={leftArrow}>
              <div className='flex flex-row px-7'>
                {
                  coverImgs.map((item, index)=>(
                    <img className={`outline-primary outline w-12 h-12 mx-1 outline-offset-[-1px] ${index==activeIndex?'outline-1':'outline-0'}`} key={index} src={item} onClick={()=>setActiveIndex(index)}/>
                  ))
                }
              </div>
            </ScrollView>
          </div>
        </div>
        <div className='px-4 sm:px-0'>
          <p className='text-black/90 font-medium text-[22px]/[36px] mt-6 sm:mt-0 sm:text-[32px]'>{info.name}</p>
          <p className='text-xs mb-6 mt-2 sm:text-base sm:my-4'>型号： {info.model}</p>
          <div className='py-4 border-t border-black/[.07] text-[13px]/[24px] sm:text-xs/[22px] sm:pr-[8%]'>{info.desc}</div>
          <div className='py-4 border-t border-black/[.07] text-xs leading-3 sm:leading-4'>
            {renderItem('/svg/leaf.svg', ' 能效等级：', info.efficiency, 'mb-3 sm:mb-0 sm:mr-8')}
            {renderItem('/svg/square.svg', '适用面积：', info.area.join('，'))}

          </div>
          <div className='py-4 border-t border-black/[.07] sm:border-t-0 sm:pt-1'>
            {
              info.colors.map(item=>renderColor(item))
            }
            <div className='mt-6'>
              {
                info.attrs.map(item=>renderAttr(item))
              }
            </div>
          </div>
        </div>
      </div>
      <div className='px-4 pt-4 sm:px-0 sm:pt-10'>
        <p className='text-black/90 font-medium'>产品介绍</p>
        {divider('mt-4 mb-5 sm:mt-3 sm:mb-6')}
        {renderTitle('产品参数')}
        <ParamsTable params = {info.parameters}/>
        {divider('mt-4 mb-6 sm:hidden')}
        {renderTitle('产品参数', 'mt-8')}
        <div className='w-full flex flex-col items-center mt-6 sm:mt-4'>
          {
            detailImgs.map((item, idx)=>(
              <img key={idx} src={item} className='mb-4 w-full h-[100vw] object-contain sm:h-[36vw] sm:w-[36vw]'/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

ProcuctPage.getLayout = (page, {detailMenu}) => (
  <ProductLayout detailMenu={detailMenu}>
    {page}
  </ProductLayout>
)