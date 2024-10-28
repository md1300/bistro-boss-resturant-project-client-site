import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";


const Deshboard = () => {
    const [cart]=useCart()
    // const isAdmin=true;
    const [isAdmin]=useAdmin();
    // console.log({isAdmin})
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin? <>
                          <li>
                        <NavLink to='/dashboard/admin-home'>
                        <FaHome/>
                            Admin Home</NavLink>
                        </li>
                    <li>
                        <NavLink to='/dashboard/addItems'>
                        <FaUtensils/>
                            Add items</NavLink>
                        </li>
                    <li>
                        <NavLink to='/dashboard/manage-items'>
                        <FaList />
                            Manage items ({cart.length}) </NavLink>
                        </li>
                    <li>
                        <NavLink to='/dashboard/bookings'>
                        <FaBook/>
                            Manage Bookings</NavLink>
                        </li>
                    <li>
                        <NavLink to='/dashboard/users'>
                        <FaUsers/>
                            All Users</NavLink>
                        </li>
                        </>
                        :
                        <>
                          <li>
                        <NavLink to='/dashboard/user-home'>
                        <FaHome/>
                            User Home</NavLink>
                        </li>
                    <li>
                        <NavLink to='/dashboard/reservation'>
                        <FaCalendar/>
                            Reservaton</NavLink>
                        </li>
                    <li>
                        <NavLink to='/dashboard/cart'>
                        <FaShoppingCart />
                            my cart ({cart.length}) </NavLink>
                        </li>
                    <li>
                        <NavLink to='/dashboard/review'>
                        <FaAd/>
                            Add Review</NavLink>
                        </li>
                    <li>
                        <NavLink to='/dashboard/payment-history'>
                        <FaList/>
                            Payment History</NavLink>
                        </li>
                        </>
                    }
                  

                        <div className="divider"></div>

                        <li>
                        <NavLink to='/'>
                        <FaHome/>
                            Home</NavLink>
                        </li>  
                        <li>
                        <NavLink to='/order/salad'>
                        <FaSearch/>
                            menu</NavLink>
                        </li>  
                        <li>
                        <NavLink to='/order/contact'>
                       <FaEnvelope/>
                            contact </NavLink>
                        </li>  
                         
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>

    );
};

export default Deshboard;