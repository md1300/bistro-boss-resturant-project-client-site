import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import featuredImage from '../../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
    return (
        <section className='featured-item bg-fixed text-white pt-8 my-20'>
            <SectionTitle
                subHeading="check it out"
                heading="Form our menu" />
            <div className='md:flex items-center justify-center bg-slate-500 bg-opacity-60 pb-20 pt-12 px-36'>
                <div>
                    <img src={featuredImage} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>30 march 2032</p>
                    <h1 className='uppercase'>where can i get some</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum voluptate veniam repellat saepe numquam perspiciatis possimus quaerat necessitatibus id nesciunt pariatur atque, corporis sapiente esse, accusamus aliquam nihil, nostrum odio ipsum eos nobis hic et! Nam, ipsa nesciunt cum cumque quidem quia quisquam similique temporibus vero inventore. Necessitatibus, incidunt mollitia.</p>
                    <button className='btn btn-outline border-0 border-b-4 mt-4'>order now</button>
                </div>

            </div>
        </section>
    );
};

export default Featured;