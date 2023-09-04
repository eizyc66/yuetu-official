import { useMeasure } from "react-use";
import Head from 'next/head';
import { useTranslation } from 'next-i18next'
import {
  useWindowHeight
} from '@react-hook/window-size'
import Navbar from '../components/navbar/index';
import Footer from '../components/footer/index';

const Layout = ({ children }) => {

  const [ref, { height }] = useMeasure();
  const clientHeight = useWindowHeight()
  const [footerRef, { height:footerHeight }] = useMeasure();
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
          <title>{`${t('company')} - Global`}</title>
      </Head>
      <Navbar ref={ref}/>
      <main style={{paddingTop : `${height}px`, minHeight: `${clientHeight- footerHeight}px`}}>
        {children}
      </main>
      <Footer ref={footerRef}/>
    </>
)}
 
export default Layout;