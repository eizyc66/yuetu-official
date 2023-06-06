import { useState, useMemo } from 'react';
import { useMedia } from '@/utils/hooks'

const ErrorCodeTable = ({list}) => {
  const isPC = useMedia(true)
  const [open, setOpen ] = useState(false)
  const hasMore = useMemo(()=>{
    return (!isPC)&&(list.length>5)
  }, [list, isPC])

  const showedList = useMemo(()=>{
    return (open||isPC)?list:list.slice(0, 5)
  },[open, isPC, list])

  const borderStyle = 'border border/[#DCDCDC] py-2.5 px-2'


  return (
    <div>
      <table className='text-black/70 font-normal w-full text-xs'>
        <thead>
          <tr className='text-black/90 font-medium bg-black/[.04]'>
            <th className={`${borderStyle} w-[28.8vw] sm:w-1/4`} >故障代码</th>
            <th className={borderStyle} >故障名称</th>
          </tr>
        </thead>
        <tbody>
          {
            showedList.map((item,idx)=>(
              <tr key={idx}>
                <td className={`${borderStyle} w-[28.8vw] sm:w-1/4`} >{item.code}</td>
                <td className={borderStyle}>{item.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {hasMore?
      <div className='flex flex-row justify-center border-b border-black/[.07] pb-4 text-sm'>
        <div onClick={()=>setOpen(val=>!val)} className='flex flex-row items-center cursor-pointer text-black/70 mt-9'>
          <span className='mr-2'>{open?'收起内容':'展开更多'}</span>
          <img className={`w-3.5 h-3.5 inline-block ${open?'-rotate-90':'rotate-90'}`} src="/svg/arrow-right.svg" alt="" />
        </div>
      </div>:null}
    </div>
  )
}

export default ErrorCodeTable