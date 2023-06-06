import { useTranslation } from 'next-i18next'
import { JoinusLayout } from '@/components/layout/index'
import { useMemo } from 'react';
import { useMedia } from '@/utils/hooks'
import NoSSR from 'react-no-ssr';

export default function Page({common}) {
  // const { t } = useTranslation('common')
  const isPC = useMedia()


  return (
    <JoinusLayout>
      joinus
    </JoinusLayout>
  )
}