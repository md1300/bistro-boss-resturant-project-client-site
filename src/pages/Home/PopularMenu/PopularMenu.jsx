import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuItems from '../../../Components/MenuItems/MenuItems';
import useMenu from '../../../Hooks/useMenu';



const PopularMenu = () => {
   const [menu]=useMenu()
   const popular=menu.filter(item=>item.category==='popular')
   
    
    return ( 
       
        <section className='mb-12'>
            <SectionTitle
            subHeading="check it out"
            heading="from our menu"/>
            <div className='grid md:grid-cols-2 gap-10 mt-16'>
               {
               popular.map(item=><MenuItems 
                    key={item._id}
                    item={item}/>)
               }
            </div>
        </section>
        
    );
};

export default PopularMenu;