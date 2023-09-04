import Navbar from '../components/navbar/index';
import Footer from '../components/footer/index';
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
 
const Layout = ({ children }) => {

  const { t } = useTranslation('common')
  return (
    <>
      <Head>
          <title>{t('company')}</title>
      </Head>
      <Navbar transparent/>
      <main className='pt-[45px] sm:pt-0'>{children}</main>
      <Footer />
    </>
)}
 
export default Layout;