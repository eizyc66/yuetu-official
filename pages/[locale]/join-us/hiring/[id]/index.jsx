import { useTranslation } from 'next-i18next'
import { JoinusLayout } from '@/components/layout/index'
import { useMemo } from 'react';
import { useRouter } from 'next/router'
import { useMedia } from '@/utils/hooks'
import { makeStaticPaths, makeStaticProps, createParams } from '@/utils/getStatic'
import { JOB_LIST } from '@/utils/const' 
import { Responsive } from '@/components';

const params = {
  id: JOB_LIST.map(item=>item.id)
}
const getStaticPaths = makeStaticPaths(createParams(params))
const getStaticProps = makeStaticProps([], (ctx)=>{
  const id = ctx?.params?.id
  return {
    detailMenu: JOB_LIST.find(item=>item.id==id)?.title??'',
    id
  }
})
export { getStaticPaths, getStaticProps }

export default function JobPage() {
  const { t } = useTranslation('common')
  const isPC = useMedia()
  const router = useRouter()
  const id = router.query.id
  const info = useMemo(()=>{
    return JOB_LIST.find(item=>item.id==id)
  },[id])

  const mapping = {
    name: '联系人',
    phone: '联系电话',
    email: '简历投递邮箱'
  }

  const renderContact = (data)=>(
    <div className='border-y-2 border-[#232732]/90 mt-6 mb-7 text-base sm:border-t sm:mb-0 sm:mt-4 sm:border-black/[.07]' >
      {
        Object.keys(data).map((key,idx)=>(
          <div key={key} className={`flex flex-row justify-between pt-4 pb-5 sm:pb-4 sm:border-0 sm:text-sm sm:inline-block ${idx==0?'':'border-t border-black/[.07]'}`}>
            <span className='sm:mr-2 sm:text-black/[.55]'>{mapping[key]}{isPC?': ':''}</span>
            <span className='text-black/90 font-medium sm:mr-10 sm:font-normal'>{data[key]}</span>
          </div>
        ))
      }

    </div>
  )

  const renderList = (name, list)=> (
    <>
    <p className='font-medium text-black/90 text-base mb-4 sm:text-sm'>{name}:</p>
    <ul className='list-disc pl-5 leading-7 sm:text-xs sm:leading-5'>
      {
        list.map(item=>(
          <li key={item}>{item}</li>
        ))
      }
    </ul>
    </>
  )

  return (
    <div className='px-4 pb-10 sm:pl-6 sm:pb-14 sm:pt-6'>
      <div className='text-black/70 sm:pl-28 relative'>
        <p className='font-medium text-[22px]/[36px] sm:inline-block sm:text-xl'>{info.title} {info.count?` (${info.count})`:''}</p>
        <p className='text-primary font-medium mt-2 mb-4 text-xl sm:inline-block sm:m-0 sm:ml-3'>{info.salary}</p>
        <p className='text-[13px]/[13px] sm:mt-3'>{info.basic}</p>
        {renderContact(info.contact)}
        <div className='sm:border-y-2 sm:border-[#232732]/90 sm:py-6 sm:mb-5'>
          {renderList('岗位职责',info.jobContent)}
          <div className='bg-black/[.07] h-px w-full my-6 sm:h-0'></div>
          {renderList('岗位要求',info.requires)}
        </div>
        <a href={`mailto:${info.contact.email}`} className='my-11 block sm:m-0 sm:absolute sm:right-0 sm:top-0'>
          <button className='bg-primary text-white w-full py-3 text-center font-medium text-base sm:py-2 sm:px-8 sm:w-auto sm:text-sm'>投递简历</button>
        </a>
        <p className='font-medium text-black/90 text-base mb-4 sm:text-sm'>工作地址:</p>
        <p className='text-sm sm:text-xs'>{info.address}</p>
        <Responsive>
          <img className='w-full mt-6' src={isPC===true?info.addressImgPC:info.addressImgMobile} alt="" />
        </Responsive>
      </div>
    </div>
  )
}


JobPage.getLayout = (page, {detailMenu}) => (
  <JoinusLayout customizeMenu detailMenu={detailMenu}>
    {page}
  </JoinusLayout>
)