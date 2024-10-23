import React, { useState } from 'react';
import Cover from '../../Shares/Cover';
import orderCoverImage from '../../../assets/shop/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../Hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const [menu] = useMenu()
    const {category}=useParams()
    const categories=['salad','pizza','soup','dessert','drinks']
    const initialIndex=categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const desserts = menu.filter(item => item.category === "dessert")
    const pizza = menu.filter(item => item.category === "pizza")
    const salad = menu.filter(item => item.category === "salad")
    const soup = menu.filter(item => item.category === "soup")
    const drink = menu.filter(item => item.category === "drinks")

    return (
        <div>
            <Helmet>
                <title>bistro Boss | Order Food</title>
            </Helmet>
            <Cover image={orderCoverImage} title="order food" />
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>SALAD</Tab>
                    <Tab>PIZZA</Tab>
                    <Tab>SOUPS</Tab>
                    <Tab>DESSERTS</Tab>
                    <Tab>DRINKS</Tab>

                </TabList>
                <TabPanel>
                    <OrderTab items={salad} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={desserts} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drink} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;