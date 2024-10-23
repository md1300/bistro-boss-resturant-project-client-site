import React from 'react';
import MenuItems from '../../../Components/MenuItems/MenuItems';
import Cover from '../../Shares/Cover';
import { Link } from 'react-router-dom';


const MenuCategory = ({ items,image, title }) => {


    return (
        <div>
           {title && <Cover image={image} title={title} />}
            <div className='grid md:grid-cols-2 gap-10 my-16'>
                {
                    items.map(item => <MenuItems
                        key={item._id}
                        item={item} />)
                }
            </div>
            <Link to={`/order/${title}`} className='btn btn-outline border-0 border-b-4 my-4'>order now</Link>
        </div>
    );
};

export default MenuCategory;