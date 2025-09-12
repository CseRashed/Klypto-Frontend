import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Message from "../Components/Message/Message";
import Cart from "../Components/Cart/Cart";
import Checkout from "../Components/Checkout/Checkout";
import Profile from "../Dashboard/User/Profile/Profile";
import MyOrder from "../Dashboard/User/MyOrder/MyOrder";
import Notification from "../Dashboard/User/Notification/Notification";
import CustomerSupport from "../Dashboard/User/CustomerSupport/CustomerSupport";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import UserManagement from "../Dashboard/Admin/UserManagement/UserManagement";
import Order from "../Dashboard/Admin/Order/Order";
import Sales from "../Dashboard/Admin/Sales/Sales";
import Analytics from "../Dashboard/Admin/Analytics/Analytics";
import Offers from "../Dashboard/Admin/Offers/Offers";
import ProductManagement from "../Dashboard/CommonDashboard/ProductManagement/ProductManagement";
function EmptyLayout({ children }) {
  return <>{children}</>;
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
            
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
        path:"/message",
        element:<Message></Message>
      },
      {
        path:"/cart",
        element:<Cart></Cart>
      },
      {
        path:'/checkout',
        element:<Checkout></Checkout>
      },
      {
        path:'/profile',
        element:<Profile></Profile>
      },
      {
        path:'/myOrder',
        element:<MyOrder></MyOrder>
      },{
        path:'/notifications',
        element:<Notification></Notification>
      },
      {
        path:'/support',
        element:<CustomerSupport></CustomerSupport>
      },
       
    ]
  },
  {
        path:'/products/:id',
        element:<ProductDetails></ProductDetails>
    },
    {
      path:'/users',
      element:<UserManagement></UserManagement>
    },
    {
      path:'/orders',
      element:<Order></Order>
    },
    {
      path:'/sales',
      element:<Sales></Sales>
    },
    {
      path:'/analytics',
      element:<Analytics></Analytics>
    },
    {
      path:'/offers',
      element:<Offers></Offers>
    },
    {
      path:'/products',
      element:<ProductManagement></ProductManagement>
    }
])

export default router