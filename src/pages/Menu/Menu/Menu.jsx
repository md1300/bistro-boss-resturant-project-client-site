import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shares/Cover';
import menuImage from '../../../assets/menu/banner3.jpg';
import dessertImage from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImage from '../../../assets/menu/pizza-bg.jpg';
import saladImage from '../../../assets/menu/salad-bg.jpg';
import soupImage from '../../../assets/menu/soup-bg.jpg';
import MenuCategory from '../MenuCategory/MenuCategory';
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Menu = () => {
    const [menu]=useMenu()
    const desserts=menu.filter(item=>item.category==="dessert")
    const pizza=menu.filter(item=>item.category==="pizza")
    const salad=menu.filter(item=>item.category==="salad")
    const soup=menu.filter(item=>item.category==="soup")
    const offered=menu.filter(item=>item.category==="offered")
    
    return (
        <div>
            <Helmet>
                <title>bistro Boss | Menu</title>
            </Helmet>
            <Cover
            image={menuImage}
            title={"Our Menu"}/>
           <SectionTitle subHeading='do not miss' heading="todays offer"/>
           <MenuCategory items={offered}/>
           <MenuCategory
            items={desserts} 
            title="dessert" 
            image={dessertImage} />
           <MenuCategory
            items={pizza} 
            title="pizza" 
            image={pizzaImage} />
           <MenuCategory
            items={salad} 
            title="salad" 
            image={saladImage} />
           <MenuCategory
            items={soup} 
            title="soup" 
            image={soupImage} />
       
        </div>
    );
};

export default Menu;