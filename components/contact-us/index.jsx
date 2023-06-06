import { useTranslation } from 'next-i18next'
import { SupportLayout } from '@/components/layout/index'
import { Responsive } from '@/components/index'
import { useMemo } from 'react';
import { useCopyToClipboard } from "react-use";
import { useMedia } from '@/utils/hooks'
import NoSSR from 'react-no-ssr';
// import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

// const getStaticProps = makeStaticProps(['common'])
// export { getStaticPaths, getStaticProps }

export default function ContactUs({common}) {
  // const { t } = useTranslation('common')
  const isPC = useMedia()
  const [state, copyToClipboard] = useCopyToClipboard();

  const divider = (classes) => (
    <div className={`hidden sm:block bg-black/[.07] h-[2px] w-full ${classes}`}>
    </div>
  )

  const phone = (classes)=> (
    <div className={`w-8 h-8 rounded-full border-black/[.15] border-solid border-2 flex items-center justify-center sm:w-10 sm:h-10 sm:border-2 ${classes}`}>
      <img className='w-5 h-5 sm:w-6 sm:h-6' src="/svg/phone.svg" alt="" />
    </div>
  )

  const callTel = (phone) => {
    phone = phone.replace('-','')
    window.location.href = `tel:${phone}`;
  }

  const itemRender = (title, list) => (
    <>
    <ul className='flex flex-col'>
        {list.map((item, idx)=>(
          <>
            {idx==0?null:divider('sm:ml-16 sm:w-auto')}
            <li key={item} className='group rounded flex flex-row p-5 text-xs font-medium bg-black/[.04] border-black/[.04] border items-center mb-3 sm:p-0 sm:py-5 sm:text-sm sm:border-0 sm:m-0 sm:bg-transparent'>
              {phone('sm:hidden sm:group-first:flex')}
              <div  className={`flex-1 pl-4 ${idx === 0 ?'sm:pl-6':'sm:pl-16'}`}>
                <p className='mb-2 text-black/[.55] sm:hidden sm:group-first:block'>{title}</p>
                <p className='text-lg sm:text-sm'>{item}</p>
              </div>
              <Responsive>
                  <div className='border-0 flex-0 cursor-pointer text-black/[.35] text-center border-black/[.15] sm:px-6 sm:border sm:py-2 sm:text-black/90' onClick={()=>isPC?copyToClipboard(item):callTel(item)}>
                    { isPC? '复制电话':'拨打电话'}
                  </div>
              </Responsive>
            </li>
          </>
        ))
      }
    </ul>
    {divider()}
    </>
  )

  const renderQRCode = (img, icon, name) => (
    <div className='flex flex-col items-center'>
      <img src={img} alt="" className='w-36 sm:w-40'/>
      <p className='text-xs sm:text-base mt-4 flex items-center flex-row'>
        <img src={icon} className='w-3 h-3 mr-1 inline-block sm:w-5 sm:h-5' alt="" />
        <span className='text-black/[.55]'>{name}</span>
      </p>
    </div>
  )

  return (
      <div className='px-4 pb-10 sm:pl-6 sm:pb-14'>
        <div className='flex flex-col flex-1'>
          {itemRender('全国售后热线',['4008-299-666'])}
          {itemRender('官方合作热线',['0598-6509566', '15859816961'])}
        </div>
        <div className='flex flex-row justify-around mb-11 mt-8 sm:justify-evenly sm:mt-10'>
          {renderQRCode('/images/contact-us/tiktok.png', '/images/contact-us/tiktok-icon.png', '月兔空调官方抖音号')}
          {renderQRCode('/images/contact-us/wechat.png', '/images/contact-us/wechat-icon.png', '月免空调官方微信公众号')}
        </div>
        {divider('my-8')}
        <p className='mb-6 text-sm sm:mb-4'>
          <span className='block font-medium text-black/90 text-base mr-4 sm:inline-block sm:text-sm sm:text-black/[.35]'>联系地址：</span>
          <span className='block text-black/70 mt-4 sm:mt-0 sm:inline-block sm:font-medium sm:text-black/90 '>福建省三明市宁化县城南乡工业园3期6号</span>
        </p>
        <img className='w-full' src={`/images/contact-us/location${isPC===true?'':'-mobile'}.png`}/>
      </div>
  )
}