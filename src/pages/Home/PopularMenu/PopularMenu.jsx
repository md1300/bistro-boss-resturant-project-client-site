import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuItems from '../../../Components/MenuItems/MenuItems';

const PopularMenu = () => {
    const [menu,setMenu]=useState([])
    useEffect(()=>{
        fetch('menu.json')
    .then(res=>res.json())
    .then(data=>{
        const popularItems=data.filter(item=>item.category==='popular')
        setMenu(popularItems)
    })
    },[])
    
    return (
        <section className='mb-12'>
            <SectionTitle
            subHeading="check it out"
            heading="from our menu"/>
            <div className='grid md:grid-cols-2 gap-10'>
               {
                menu.map(item=><MenuItems 
                    key={item._id}
                    item={item}/>)
               }
            </div>
        </section>
    );
};

export default PopularMenu;