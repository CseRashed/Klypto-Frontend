import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Message from "../Components/Message/Message";
import Cart from "../Components/Cart/Cart";

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
      }
    ]
  }
])

export default router