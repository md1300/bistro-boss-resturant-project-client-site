import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GAETWAY_PK);
const Payment = () => {
    

    return (
        <div>
            <SectionTitle heading="Payment" subHeading="please pay to eat"/>

            <Elements stripe={stripePromise} >
    <CheckoutForm />
  </Elements>

        </div>
    );
};

export default Payment;