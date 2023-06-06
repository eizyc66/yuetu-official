import { useState, useMemo } from 'react';
import { useMedia } from '@/utils/hooks'
import { useTranslation } from 'next-i18next'
import NoSSR from 'react-no-ssr';

const ParamsTable = ({ params = {} }) => {
  const { t } = useTranslation('product')
  const isPC = useMedia(true)
  const [open, setOpen ] = useState(false)

  const list = useMemo(()=>{
    return Object.entries(params).map(item=>({
      key: item[0],
      value: item[1]
    }))
  }, [params])

  const hasMore = useMemo(()=>{
    return (!isPC)&&(list.length>5)
  }, [list, isPC])

  const showedList = useMemo(()=>{
    return (open||isPC)?list:list.slice(0, 5)
  },[open, isPC, list])


  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-3 justify-stretch text-xs/[14px] sm:text-xs/[16px]'>
        {
          showedList.map(item=>(
            <div className='flex flex-row box-content mt-[-1px] ml-[-1px]' key={item.key}>
              <div className='flex items-center text-black/90 py-2.5 px-2 sm:p-3 bg-black/[.04] w-[28%] sm:w-[86px] border border-[#DCDCDC] font-medium flex-shrink-0'>
                  {t(item.key)}
              </div>
              <div className='flex items-center text-black/70 py-2.5 px-2 sm:p-3 flex-1 border border-[#DCDCDC] border-l-0'>{item.value}</div>
            </div>
          ))
        }
      </div>
      {hasMore?
      <div className='flex flex-row justify-center text-sm'>
        <div onClick={()=>setOpen(val=>!val)} className='flex flex-row items-center cursor-pointer text-black/70 mt-9'>
          <span className='mr-2'>{open?'收起内容':'展开更多'}</span>
          <img className={`w-3.5 h-3.5 inline-block ${open?'-rotate-90':'rotate-90'}`} src="/svg/arrow-right.svg" alt="" />
        </div>
      </div>:null}
    </div>
  )
}

export default ParamsTable