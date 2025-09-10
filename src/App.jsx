import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
import Navbar from './Layout/Navbar/Navbar'

function App() {
  const location = useLocation();

// If go to these routes, the main layout will not show.
  const hideLayoutRoutes = ["/login", "/register","/message","/cart","/checkout","/profile","/myOrder","/notifications","/support"];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {!shouldHideLayout && <Header />}

      <Outlet />

      {!shouldHideLayout && <Footer />}
    </>
  )
}

export default App
