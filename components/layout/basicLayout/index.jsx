import { useMeasure } from "react-use";
import {
  useWindowHeight
} from '@react-hook/window-size'
import Navbar from '../components/navbar/index';
import Footer from '../components/footer/index';
import TopMenuMobile from '../components/topMenuMobile/index';
import { useMedia } from '@/utils/hooks'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react';
import './index.css'
import { Link } from "@/components";

const Layout = ({ children, config }) => {

  const { 
    title, 
    background, 
    routeArray, 
    darkMode = false, 
    customizeMenu = false, 
    detailMenu
  } = config
  
  const clientHeight = useWindowHeight()
  const [footerRef, { height:footerHeight }] = useMeasure();
  const { t } = useTranslation('common')
  const [ref, { height }] = useMeasure();
  const isPC = useMedia()
  const router = useRouter()

  const [titleColor, descColor] = useMemo(()=>{
    return [darkMode?'text-black/90':'text-white', darkMode?'text-black/[0.35]':'text-white/80']
  }, [darkMode])

  const activeIndex = useMemo(()=>{
    return routeArray.findIndex(item=>router.asPath.indexOf(item.path)!=-1)
  }, [routeArray, router.asPath])

  const name = useMemo(()=>{
    return routeArray?.[activeIndex]?.name
  }, [routeArray, activeIndex])

  const path = useMemo(()=>{
    return routeArray?.[activeIndex]?.path
  }, [routeArray, activeIndex])



  const divider = (
    <span className="mx-2">/</span>
  )


  const renderNav = () => (
    <div className='text-black/[.55] text-xs flex items-center py-4 border-b border-black/[.07] border-solid'>
      <Link href='/' className='flex flex-row items-center'>
        <img src='/svg/home.svg' className="w-3.5 h-3.5 mr-1"/>
        <span>{t('home')}</span>
      </Link>
      {divider}
      <span>{title}</span>
      {divider}
      {
        detailMenu?(
          <Link href={path}><span>{name}</span></Link>
        ):(<span className='text-black/90'>{name}</span>)
      }
      {detailMenu?(
        <>
         {divider}
         <span className='text-black/90'>{detailMenu}</span>
        </>
      ):null}
    </div>
  )

  const renderMenuPC = () => (
    <div className='flex flex-col text-black/[.55] text-sm w-48 shrink-0'>
      {
        routeArray.map((item, idx)=>(
          <Link key={item.name} href={item.path} className={`${idx==activeIndex?'text-black/90 font-medium bg-black/[.04] before:content-[""] before:absolute before:left-2 before:top-[9px] before:w-[2px] before:h-3 before:bg-primary':'' } py-2 px-[18px] relative`}>
          {item.name}
          </Link>
        ))
      }
    </div>
  )

  const renderMenuMobile = () => (
    <TopMenuMobile routeArray={routeArray} activeIndex={activeIndex} />
  )

  return (
    <>
      <Navbar ref={ref}/>
      <main style={{paddingTop : `${height}px`, minHeight: `${clientHeight- footerHeight}px`}}>
        <div className="hidden sm:block relative group">
        <div className='overflow-hidden'>
            <img className='w-screen transition-default sm:group-hover:scale-[1.03]' src={background}/>
        </div>
          <div className="absolute bottom-0 top-0 left-0 right-0 flex items-center">
            <div className='min-content-auto text-left'>
              <div className="w-6/12 font-medium">
                  <p className={`${titleColor} text-[32px] sm:mb-2 lg:mb-3 xl:mb-4`}>{title}</p>
                  <p className={`${descColor} text-xs/[22px] sm:line-clamp-2 md:line-clamp-3 lg:line-clamp-4 xl:line-clamp-5`}>
                    {t('desc')}
                  </p>
              </div>
            </div>
          </div>
        </div>
        <div className="min-content-auto">
          {isPC?renderNav():null}
          {
            customizeMenu?
            children:
            isPC?
              (
                <div className="flex flex-col sm:flex-row pt-4">
                  {renderMenuPC()}
                  <div className="flex-1">
                    {children}
                  </div>
                </div>
              )
              :(
                <>
                {renderMenuMobile()}
                {children}
                </>
              )
              
          }
        </div>
      </main>
      <Footer ref={footerRef}/>
    </>
)}
 
export default Layout;