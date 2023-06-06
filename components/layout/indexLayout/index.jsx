import Navbar from '../components/navbar/index';
import Footer from '../components/footer/index';
 
const Layout = ({ children }) => {
  return (
    <>
      <Navbar transparent/>
      <main className='pt-[45px] sm:pt-0'>{children}</main>
      <Footer />
    </>
)}
 
export default Layout;