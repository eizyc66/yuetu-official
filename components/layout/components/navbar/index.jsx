import { useMemo, useState, useEffect, forwardRef } from 'react';
import { useRouter } from 'next/router'
import { useWindowScroll } from 'react-use';
import { useMedia } from '@/utils/hooks'
import { MENU_HEADER } from '@/utils/const'
import RatioBox from '../ratioBox/index'
import { Link, Responsive, LanguageSwitch } from '@/components/index'
import NoSSR from 'react-no-ssr';

const Index = ({transparent:transparentProp = false}, ref) => {

  const router = useRouter()

  const {y} = useWindowScroll();

  const isPC = useMedia()

  const transparent = useMemo(()=>{
    return transparentProp&&isPC===true&&(y<20)
  }, [transparentProp, y, isPC])

  const [ open, setOpen ] = useState(false)

  const [ submenuIdx, setSubmenuIdx] = useState(-1)

  const showSubmenu = useMemo(()=>(isPC===false)&&(submenuIdx!=-1),[submenuIdx, isPC])

  const submenus = useMemo(()=>MENU_HEADER?.[submenuIdx]?.submenu,[submenuIdx])

  useEffect(()=>{
    setOpen(false)

  }, [isPC]) 

  useEffect(()=>{
    if(!open) setSubmenuIdx(-1)
  },[open])


  const menuHandler = () => {
    setOpen(val=>!val)
  }

  const renderMenu = () => MENU_HEADER.map((item, idx)=>
  (<div key={item.menu}>
    {item.menu}
  </div>))


  const renderMenuDetail = () => MENU_HEADER.map((item, idx)=> {
    const submenu = item.submenu
    return (<ul key={item.name} className='flex flex-col text-black/70 text-xs basis-16'>
      {submenu.map(menu=>(
        <li key={menu.name} className='mt-4 -mr-96'>
          {
            menu.external?(
              <a href={menu.path??''} target={menu.target??''}>{menu.name}</a>
            ):(
              <Link href={menu.path??''} target={menu.target??''}>{menu.name}</Link>
            )
          }
          {menu.list?.length?
            <ul className='leading-[22px] list-disc pl-5 mt-3'>
              {
                menu.list.map(ele=>(<Link key={ele.name} href={ele.path}><li >{ele.name}</li></Link>))
              }
            </ul>:null
          }
        </li>
      ))}
    </ul>)
  })

  const renderMenuMobile = () => MENU_HEADER.map((item, idx)=>
    (<div key={item.menu} className='text-[22px]/[22px] font-semibold text-black/90' onClick={()=>(!isPC)&&setSubmenuIdx(idx)}>
      {item.menu}
    </div>))

  const renderSubmenuMobile = () => submenus?.map(item=>
    (<div key={item.name} className='text-[22px]/[22px] font-semibold text-black/90'>
      {item.name}
    </div>))
  
  
  return (
    <div className={`${transparent?'sm:bg-transparent sm:text-white':'visible text-black/90'} group font-medium fixed w-screen bg-white/90 duration-300 ease-in-out z-10 sm:hover:text-black/90 sm:hover:bg-white/90`}>
      <div ref={ref}>
        <div className="content-auto px-5 py-3.5 sm:px-0 sm:py-5 flex justify-between items-center border-black/[.15] border-b sm:border-0">
          <Link href='/' className='w-20 sm:w-[11%]'>
            <RatioBox className="bg-[url('/images/logo.png')] bg-contain bg-no-repeat bg-center sm:bg-[url('/images/logo-white.png')] sm:group-hover:bg-[url('/images/logo.png')] sm:group-[.visible]:bg-[url('/images/logo.png')]"/>
          </Link>
          <nav className='hidden sm:block sm:flex-row sm:flex sm:justify-evenly sm:flex-1'>
            {renderMenu()}
          </nav>
          <div className='hidden sm:block flex items-center'>
            <span className=''>4008-299-666</span>
            <div className='w-6 h-6 bg-white/30 group-hover:bg-white group-[.visible]:bg-white  rounded-full inline-flex justify-center items-center ml-3'>
              <svg className='fill-white group-hover:fill-[#2CCD93] group-[.visible]:fill-[#2CCD93] w-4 h-4' width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.9172 5.79688C10.7641 5.77187 10.6109 5.77187 10.4578 5.77187C8.13438 5.77187 6.32031 7.50937 6.31875 9.62969C6.31875 9.9875 6.37031 10.3188 6.47188 10.6516C6.29219 10.6766 6.13907 10.6766 5.98595 10.6766H5.98594C5.46105 10.6766 5.02911 10.5836 4.53081 10.4764C4.44763 10.4585 4.36261 10.4402 4.275 10.4219L2.56406 11.2641L3.05 9.80781C1.825 8.96406 1.10938 7.84062 1.10938 6.5125C1.10938 4.21406 3.30625 2.375 5.9875 2.375C8.38906 2.375 10.4844 3.83125 10.9172 5.79688ZM8.43906 5.05625C8.43906 4.69844 8.20938 4.44375 7.82656 4.44375C7.47031 4.44375 7.08594 4.67344 7.08594 5.05625C7.08594 5.4125 7.44375 5.66875 7.82656 5.66875C8.18438 5.66875 8.43906 5.41406 8.43906 5.05625ZM3.7 4.97969C3.7 5.33281 4.06094 5.58594 4.44688 5.58594C4.80781 5.58594 5.06563 5.33438 5.06406 4.97969C5.06406 4.62656 4.80781 4.37344 4.44688 4.37344C4.08594 4.37344 3.7 4.6 3.7 4.97969ZM10.7656 6.02813C12.9625 6.02813 14.9031 7.61094 14.9031 9.57812C14.9031 10.6766 14.1625 11.6469 13.1922 12.3875L13.55 13.6141L12.2219 12.8734L12.1999 12.8792C11.7213 13.0038 11.2442 13.1281 10.7656 13.1281C8.44062 13.1281 6.60156 11.5453 6.60156 9.57812C6.60156 7.6375 8.44062 6.02813 10.7656 6.02813ZM8.925 8.47969C8.925 8.73594 9.18125 8.96562 9.41094 8.96562C9.79375 8.96562 10.0234 8.73594 10.0234 8.47969C10.0234 8.24844 9.76875 7.99375 9.41094 7.99375C9.17969 7.99375 8.925 8.25 8.925 8.47969ZM11.7031 8.36719C11.7031 8.61875 11.9609 8.84688 12.1922 8.84688C12.5531 8.84688 12.8094 8.62031 12.8094 8.36719C12.8094 8.14062 12.5531 7.8875 12.1922 7.8875C11.9609 7.8875 11.7031 8.13906 11.7031 8.36719Z"/>
              </svg>
            </div>
        </div>
        <img src='/svg/menu.svg' className='w-5 sm:hidden' onClick={menuHandler}/>
        <Responsive>
          <div className={`sm:hidden ${open?'fixed z-20 w-screen h-screen top-0 left-0 bg-white px-9 pt-16':'hidden'}`}>
            <nav className='flex flex-col gap-y-6'>
              {showSubmenu?renderSubmenuMobile():renderMenuMobile()}
            </nav>
            <img src='/svg/close.svg' className='w-6 absolute top-4 right-4' onClick={()=>setOpen(false)}/>
            {
              showSubmenu?
              <img src='/svg/arrow-left.svg' className='w-6 absolute top-4 left-4' onClick={()=>setSubmenuIdx(-1)}/>:
              <>
              <div className='sm:block h-[2px] bg-black/[.15] my-8'></div>
              <LanguageSwitch className='text-lg font-semibold text-black/90' showFull onClick={()=>setOpen(false)}></LanguageSwitch>
              </>
            }
          </div>
        </Responsive>
      </div>
      </div>
      <div className="hidden content-auto flex-row sm:group-hover:flex border-t border-black/[.07] border-solid">
        <div className='w-[11%]'></div>
        <nav className='flex-row pb-6 flex flex-1 justify-evenly'>
          {renderMenuDetail()}
        </nav>
        <div className='w-[151.5px]'></div>
      </div>
    </div>
)}
 
export default forwardRef(Index);