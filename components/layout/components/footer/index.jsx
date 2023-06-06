import { MENU_FOOTER } from '@/utils/const'
import { useMedia } from '@/utils/hooks'
import { useState } from 'react';
import NoSSR from 'react-no-ssr';
import { LanguageSwitch, Link } from '@/components'

const phone = '4008-299-666'
const address = '福建省三明市宁化县城南乡工业园区3期6号'
const Index = () => {

  const [ submenuIdx, setSubmenuIdx] = useState(-1)
  const isPC = useMedia()

  const renderSubmenuPC = (submenu) => (
    <ul className='text-white/75'>
    {submenu.map(ele=>(
        <li key={ele.name} className='mt-4'>
            <Link href={ele.path}>
                  {ele.name}
          </Link>
          </li>
    ))}
  </ul>)

  const renderSubmenuMobile = (submenu, visible) => 
    (
      <ul className={`${visible?'max-h-[1000px]':'max-h-0'} text-white text-sm overflow-hidden duration-300 ease-in-out transition-all`}>
      {
        submenu.map(ele=>{
          const list = ele.list
          const hasList = list?.length
          return (
            <>
              <li key={ele.name} className={`${hasList?'text-white/[.45]':''} py-5 border-solid border-white/[.15] border-b`}>
                <Link href={ele.path}>{ele.name}</Link>
              </li>
              {
                hasList?
                <ul className='list-disc pl-5'>
                {
                    list.map(ele=>(
                      <>
                          <li key={ele.name} className='py-5'>
                              <Link href={ele.path}>
                                {ele.name}
                              </Link>
                            </li>
                          <div className='bg-white/[.15] h-px -ml-5'></div>
                      </>
                    ))
                }
                </ul>:null
              }
            </>
          )
        })
      }
    </ul>
    )
  

  const renderMenu = () => {
    return MENU_FOOTER.map((item, idx)=>{
      const submenu = item.submenu
      const visible = (!isPC)&&(submenuIdx === idx)
      return (
      <ul key={item.menu} className='text-white text-left sm:w-[208px] sm:text-sm'>
        <li className='py-[22px] border-solid border-white/[.15] border-b flex justify-between sm:border-none sm:py-4'>
          <Link href={item.path}>{item.menu}</Link>
          <img className='w-5 sm:hidden' src={visible?'/svg/minus.svg':'/svg/add.svg'} onClick={()=>setSubmenuIdx(visible?-1:idx)}/>
        </li>

        {isPC?renderSubmenuPC(submenu):renderSubmenuMobile(submenu, visible)}
      </ul>)
    })
  }
  return (
    <div className='bg-[#191B1E] text-center text-white/[0.65] pt-2 pb-6 px-4 sm:px-0 sm:py-6'>
      <div className='content-auto'>
        <nav className='sm:flex sm:flex-row sm:justify-start sm:mb-16'>
          {renderMenu()}
        </nav>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col items-center sm:flex-row sm:w-full'>
            <Link className='w-[25vw] mt-[44px] mb-4 sm:order-1 sm:w-[8%] sm:m-0' href='/'>
              <img className='' src='/images/logo-white.png'/>
            </Link>
            <span className="font-['Lato'] text-2xl font-normal sm:order-3 sm:mx-2 sm:font-light sm:text-white sm:text-sm">
              {phone}
            </span>
            <img className='w-[30vw] my-5 sm:hidden' src='/images/contact-us/wechat.png' alt="" />
            <p className='text-xs sm:order-2 sm:flex-1 sm:text-right'>地址:{address}</p>
            <svg className='hidden fill-white/[.65] w-4 h-4 order-4 sm:block' width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.9172 5.79688C10.7641 5.77187 10.6109 5.77187 10.4578 5.77187C8.13438 5.77187 6.32031 7.50937 6.31875 9.62969C6.31875 9.9875 6.37031 10.3188 6.47188 10.6516C6.29219 10.6766 6.13907 10.6766 5.98595 10.6766H5.98594C5.46105 10.6766 5.02911 10.5836 4.53081 10.4764C4.44763 10.4585 4.36261 10.4402 4.275 10.4219L2.56406 11.2641L3.05 9.80781C1.825 8.96406 1.10938 7.84062 1.10938 6.5125C1.10938 4.21406 3.30625 2.375 5.9875 2.375C8.38906 2.375 10.4844 3.83125 10.9172 5.79688ZM8.43906 5.05625C8.43906 4.69844 8.20938 4.44375 7.82656 4.44375C7.47031 4.44375 7.08594 4.67344 7.08594 5.05625C7.08594 5.4125 7.44375 5.66875 7.82656 5.66875C8.18438 5.66875 8.43906 5.41406 8.43906 5.05625ZM3.7 4.97969C3.7 5.33281 4.06094 5.58594 4.44688 5.58594C4.80781 5.58594 5.06563 5.33438 5.06406 4.97969C5.06406 4.62656 4.80781 4.37344 4.44688 4.37344C4.08594 4.37344 3.7 4.6 3.7 4.97969ZM10.7656 6.02813C12.9625 6.02813 14.9031 7.61094 14.9031 9.57812C14.9031 10.6766 14.1625 11.6469 13.1922 12.3875L13.55 13.6141L12.2219 12.8734L12.1999 12.8792C11.7213 13.0038 11.2442 13.1281 10.7656 13.1281C8.44062 13.1281 6.60156 11.5453 6.60156 9.57812C6.60156 7.6375 8.44062 6.02813 10.7656 6.02813ZM8.925 8.47969C8.925 8.73594 9.18125 8.96562 9.41094 8.96562C9.79375 8.96562 10.0234 8.73594 10.0234 8.47969C10.0234 8.24844 9.76875 7.99375 9.41094 7.99375C9.17969 7.99375 8.925 8.25 8.925 8.47969ZM11.7031 8.36719C11.7031 8.61875 11.9609 8.84688 12.1922 8.84688C12.5531 8.84688 12.8094 8.62031 12.8094 8.36719C12.8094 8.14062 12.5531 7.8875 12.1922 7.8875C11.9609 7.8875 11.7031 8.13906 11.7031 8.36719Z"/>
            </svg>
          </div>
          <div className='h-px bg-white/20 my-5 w-full sm:my-3'></div>
          <div className='sm:flex sm:justify-between sm:w-full sm:items-center'>
            <div className='text-xs leading-6'>
            COPYRIGHT©宁化月兔科技有限公司 | 闽ICP备
            <NoSSR>
              {isPC?null:<br/>}
            </NoSSR>
            2022014438号-1
            </div>
            <div className='hidden sm:block'>
              <LanguageSwitch className='ml-1 text-white text-xs'/>
            </div>
          </div>
        </div>
      </div>
    </div>
)}
 
export default Index;