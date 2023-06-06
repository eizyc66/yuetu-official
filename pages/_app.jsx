import { appWithTranslation } from 'next-i18next'

import '@/app/globals.css';

const MyApp = ({ Component, pageProps, router }) => {

  const getLayout = Component.getLayout || (page => page)

  return ( getLayout(<Component {...pageProps}></Component>, pageProps)
  )
  
}

export default appWithTranslation(MyApp)