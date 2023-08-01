import { useTranslation } from 'next-i18next'
import { SupportLayout } from '@/components/layout/index'
import { ErrorCodeTable } from '@/components/index'
import { useMemo } from 'react';
import { useMedia } from '@/utils/hooks'
import { Responsive } from '@/components/index'
import { FIXED_FREQUENCY_ERR_CODE, FREQUENCY_ERR_CODE, HOT_AIR_BLOWER_ERR_CODE } from '@/utils/const'
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps([])
export { getStaticPaths, getStaticProps }

export default function DocsPage() {
  const { t } = useTranslation('common')
  const isPC = useMedia()

  const renderTitle = (title) => (
    <div className='pb-4 text-black/90 text-lg border-b border-black/[.07] font-medium mb-6'>
      {title}
    </div>
  )

  const renderDownload = (name, path) => (
    <li className='flex flex-row font-medium text-base bg-black/[.04] border-black/[.04] border items-center text-black/[.55] p-4 mb-3 sm:w-[32%] sm:flex-col sm:font-normal'>
      <img className='w-6 h-6 sm:w-8 sm:h-8' src='/images/docs/pdf.png' />
      <span className='flex-1 ml-3 sm:text-black/90 sm:text-sm text-center sm:mt-4 sm:mb-3 sm:ml-0'>{name}</span>
      <a href={path} download={name} target='_blank' >
        <Responsive>
          { isPC? <span className='sm:text-xs'>点击下载</span>:<img className='w-5 h-5' src='/svg/download.svg' />}
        </Responsive>
      </a>
    </li>
  )

  const renderTable = (order, name, table) => (
    <li className='mt-6 mb-8'>
      <p className='font-medium text-base mb-4 sm:text-xs'>
        <span className='text-black/[.35] mr-2'>{order}</span>
        <span className='text-black'>{name}</span>
      </p>
      <ErrorCodeTable list={table}/>
    </li>
  )


  return (
    <>
      <div className='px-4 pb-10 sm:pl-6 sm:pb-14'>
        {renderTitle('遥控器说明书')}
        <ul className='mb-7 sm:flex sm:flex-row sm:justify-between'>
          {renderDownload('月兔圆柱柜说明书', '/docs/月兔圆柱柜说明书.pdf')}
          {renderDownload('月兔语音指令说明书', '/docs/月兔语音指令说明书.pdf')}
          {renderDownload('月兔挂机系列说明书', '/docs/月兔挂机系列说明书.pdf')}
        </ul>
        {renderTitle('故障代码')}
        <ul>
          {renderTable('01', '定频故障代码参考',FIXED_FREQUENCY_ERR_CODE)}
          {renderTable('02', '变频故障代码参考',FREQUENCY_ERR_CODE)}
          {renderTable('03', '热风机故障代码参考',HOT_AIR_BLOWER_ERR_CODE)}
        </ul>
      </div>
    </>
  )
}

DocsPage.getLayout = page => (
  <SupportLayout>
    {page}
  </SupportLayout>
)