import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { useMediaQuery } from 'react-responsive'
import NoSSR from 'react-no-ssr';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './index.css'
import { Link } from '@/components';
import { owns } from '@/pages/[locale]/about/introduction'


const arrs = [
  {
    img: 'slide1.png',
    title: '耀系列圆柱柜',
    subtitle: '智能自学习 语音更懂你',
    // attrs: ['智能语音', '高效压缩机', '高温自清洁'], 
    attrs: ['新1级能效全新上市'],
    desc: '2匹 适用: 23-34m²',
    href: '/product/household-AC/KFR-72LW/DN2Y-QA(3)D'
  },
  {
    img: 'slide2.png',
    title: '芯更净 Q健康',
    subtitle: '高温银离子除菌',
    // attrs: ['银离子抑菌', '高温自清洁', 'ECO节能'], 
    attrs: ['新1级能效全新上市'],
    desc: '1.5匹 适用: 15-20m²',
    href: '/product/household-AC/KFR-35GW/DN2Y-QA(Z1)A'
  },
  {
    img: 'slide3.png',
    title: '新外观 V时尚',
    subtitle: '节能新潮净享健康风',
    // attrs: ['高颜值', '高品质', '高享受'], 
    attrs: ['新1级能效全新上市'],
    desc: '1.5匹 适用: 15-20m²',
    href: '/product/household-AC/KFR-35GW/DN2-VA(Z1)'
  },
  {
    img: 'slide4.png',
    title: '高品质 U生活',
    subtitle: '强劲除湿 变频冷暖好睡眠',
    attrs: ['强劲速冷暖', '高温自清洁'], 
    // attrs: ['新1级能效全新上市'],
    desc: '1.5匹 适用: 15-23m²',
    href: '/product/household-AC/KFR-35GW/DN2-UA(Z3)G'
  },
]
 
const Index = () => {
  const isPC = useMediaQuery({ minWidth: 640 })
  const { t , i18n} = useTranslation(['common'])


  const path = useMemo(()=>{
    return `/images/slide/${isPC?'':'mobile/'}`
  },[isPC])


  const isZH = useMemo(()=>{
    return i18n.language === 'zh'
  }, [i18n.language])

  const renderSildes = () => {
    return isZH?arrs.map(item=>(
      <SwiperSlide key={item.img}>
        <div className='relative text-black/90 sm:text-white min-h-[35vw]'>
            <NoSSR>
              <img src={`${path}${item.img}`} className='w-screen' alt={item.title}/>
            </NoSSR>
            <div className='text-center pt-8 pb-10 sm:text-left sm:absolute sm:left-[18%] sm:bottom-1/2 sm:translate-y-1/2 sm:py0'>
              <p className='text-xl font-medium sm:text-5xl'>{item.title}</p>
              <p className='text-sm font-medium text-black/[.55] pt-3 pb-5 sm:text-3xl sm:text-white sm:pb-8'>{item.subtitle}</p>
              <ul className='flex gap-x-2.5 justify-center sm:gap-x-3 sm:justify-start'>
                {item.attrs.map(text=>(
                <li key={text} className='inline-block font-medium border-solid py-1.5 px-2 border-black/15 border-[1.5px] text-sm sm:py-2 sm:px-3 sm:border-white sm:text-base'>
                  {text}
                </li>))}
              </ul>
              <p className='text-black/[.55] font-medium pt-2.5 pb-8 sm:text-white sm:pt-4 sm:pb-0'>{item.desc}</p>
              <div className='hidden sm:block h-px bg-white/50 w-[23vw] my-[1.7vw]'></div>
              <Link href={item.href} className='text-white font-medium text-base bg-primary py-3 px-10 sm:py-[0.55vw] sm:px-[1.7vw] sm:text-sm'>
                  {t('more.detail')}
              </Link>
            </div>
        </div>
      </SwiperSlide>
    )): (<SwiperSlide>
              <div className='relative text-black/90 sm:text-white min-h-[35vw]'>
                  <NoSSR>
                    <img src='/images/slide/EN/banner.png' className='w-screen'/>
                  </NoSSR>
                  <div className='text-center pt-8 text-black pb-10 sm:text-left sm:text-white sm:absolute sm:left-[18%] sm:bottom-1/2 sm:translate-y-1/3 md:translate-y-1/4 sm:py-0 '>
                    <p className='text-xl font-medium md:text-5xl'>2 Manufacturing Base</p>
                    <p className='my-5 md:text-base/[20px]'>2 manufacturing bases respectively in<br/> Fujian province and Anhui province</p>
                    <div className='w-full flex flex-row text-base/[1.75] md:text-xs/[20px] '>
                        {
                          owns.map(item=>(
                            <div className='w-1/3  xs:w-1/4  flex-inline flex-col' key={item.property}>
                              <div className='border-b inline-block'>
                                <span className='text-lg font-medium md:text-5xl'>{item.property}</span>
                                <span className='ml-1'>{item.unit}</span>
                              </div>
                              <div className='text-sm mt-1'>{item.attr}</div>
                            </div>
                          ))
                        }
                      </div>
                  </div>
              </div>
        </SwiperSlide>
  )
}


  return (
  <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      rewind
      pagination={{ 
        clickable: true,
      }}
      scrollbar={{ draggable: true }}
      autoplay= {{
        delay: 5000
      }}
      loop
    >
      {renderSildes()}
</Swiper>
)}
 
export default Index;