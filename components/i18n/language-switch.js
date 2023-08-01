import languageDetector from '@/utils/languageDetector'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ReactSVG } from 'react-svg';
import NoSSR from 'react-no-ssr';
import { useMemo } from 'react';

const fullNameMapping = {
  'zh': 'Mandarin',
  'en': 'English',
}

const LanguageSwitch = ({ className, showFull = false , onClick}) => {
  const router = useRouter()
  const currentLocale = router.query.locale || ''
  const locale = currentLocale=='zh'?'en':'zh'

  // const finalHref = useMemo(()=>{
  //   let path = router.pathname
  //   Object.keys(router.query).forEach((k) => {
  //     if (k === 'locale') {
  //       path = path.replace(`[${k}]`, locale)
  //       return
  //     }
  //     path = path.replace(`[${k}]`, router.query[k])
  //   })
  //   return path
  // }, [router])

  const href = useMemo(()=>{
    return `/${locale}`
  }, [locale])

  return (
    <Link
      href={href}
      onClick={() => {
        languageDetector.cache(locale)
        onClick?.()
      }}
      className='flex flex-row items-center'
    >
      {
        showFull?null:
        <NoSSR>
          <ReactSVG className='w-3.5 h-3.5 svg' src='/svg/global.svg'></ReactSVG>
        </NoSSR>
      }
      <button className={className}>{showFull?(fullNameMapping[locale]):locale?.toUpperCase()}</button>
    </Link>
  );
};

export default LanguageSwitch