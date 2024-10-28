import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProdiver';
import { HiShoppingCart } from "react-icons/hi";
import useCart from '../../Hooks/useCart';
import useAdmin from '../../Hooks/useAdmin';


const Navber = () => {
  const { user, logOut } = useContext(AuthContext)
  const [cart]=useCart()
  const [isAdmin]=useAdmin()
  const navOptions = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/menu'>Our Menu</NavLink></li>
    <li><NavLink to='/order/salad'>Order Food</NavLink></li>
    {/* <li><NavLink to='/dashboard/user-home'>dashboard</NavLink></li> */}
    
    {/* <li><NavLink to='/dashboard/admin-home'>dashboard</NavLink></li> */}
    {
      // user? 'true':'false'
      // user? isadmin? 'double true':'true':'false'
    }
    {
      user && isAdmin && <li><NavLink to='/dashboard/admin-home'>dashboard</NavLink></li>
    }
    {
      user&& !isAdmin && <li><NavLink to='/dashboard/user-home'>dashboard</NavLink></li>
    }
    <li>
      <NavLink to='/dashboard/cart'><button className='flex gap-2 items-center'>
      <HiShoppingCart />
        <div className="badge badge-secondary">+{cart.length}</div>
      </button>
      </NavLink>
    </li>
    {
      user ? <>
        <li><button onClick={() => logOut()} >Log Out</button></li></>
        :
        <>
          <li><NavLink to='/login'>Log in</NavLink></li>
        </>
    }


  </>
  
  return (
    <div>
      <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navber;