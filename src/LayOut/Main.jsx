import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shares/Footer';
import Navber from '../pages/Shares/Navber';

const Main = () => {
    return (
        <div>
            <Navber/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;