import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import Secret from "../pages/Shares/Secret";
import Deshboard from "../LayOut/Deshboard";
import Cart from "../pages/Deshboard/Cart/Cart";
import AllUsers from "../pages/Deshboard/AllUser/AllUsers";
import AddItems from "../pages/Deshboard/AddItems/AddItems";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../pages/Deshboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Deshboard/UpdateItem/UpdateItem";
import Payment from "../pages/Deshboard/Payment/Payment";
import PaymentHistory from "../pages/Deshboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Deshboard/UserHome/UserHome";
import AdminUser from "../pages/Deshboard/AdminUser/AdminUser";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
       {
        index:true,
        element:<Home/>
       },
       {
        path:'/menu',
        element:<Menu/>
       },
       {
        path:'/order/:category',
        element:<Order/>
       },
       {
        path:'/login',
        element:<Login/>
       },
       {
        path:'/signup',
        element:<SignUp/>
       },
       {
        path:'/secret',
        element:<PrivateRoutes><Secret/></PrivateRoutes>
       }
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoutes><Deshboard/></PrivateRoutes>,
      children:[
        // ------------client routes ----------
        {
          path:'user-home',
          element:<UserHome/>
        },
        {
          path:'cart',
         element:<Cart/>
        },
        {
          path:'payment',
          element:<Payment/>
        },
        {
          path:'payment-history',
          element:<PaymentHistory/>
        },
        // admin routes
        {
          path:'admin-home',
          element:<AdminRoutes><AdminUser/></AdminRoutes>
        },
        {
          path:'users',
          element:<AdminRoutes><AllUsers/></AdminRoutes>
        },
        {
           path:'manage-items',
           element:<AdminRoutes><ManageItems/></AdminRoutes>
        },
        {
          path:'update-items/:id',
          loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`),
          element:<UpdateItem/>
        },
        {
          path:'addItems',
          element:<AdminRoutes><AddItems/></AdminRoutes>
        }

      ]
    }
  ]);