import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shares/Footer';
import Navber from '../pages/Shares/Navber';

const Main = () => {
    const location =useLocation()
   const noHeaderAndFooter=location.pathname.includes('login') || location.pathname.includes('signUp')
   
    return (
        <div>
            {noHeaderAndFooter || <Navber/> }
            
            <Outlet/>
            {noHeaderAndFooter || <Footer/> }
            
        </div>
    );
};

export default Main;