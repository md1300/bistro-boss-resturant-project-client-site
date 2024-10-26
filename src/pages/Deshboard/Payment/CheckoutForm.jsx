import { CardElement,  useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCart';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError]=useState('')
    const [clientSecret,SetClientSecret]=useState('')
    const [transactionId,setTransactionId]=useState('')
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const [cart,refetch]=useCart()
    const navigate=useNavigate()

    const totalPrice=cart.reduce((total,item)=>total+item.price,0)

    
        useEffect(()=>{
            if(totalPrice>0){
                axiosSecure.post('/create-payment-intent',{price:totalPrice})
            .then(res=>{
              console.log(res.data.clientSecret)
              SetClientSecret(res.data.clientSecret)
            })
        }
      },[axiosSecure,totalPrice])
    

    const handleSubmit=async(event)=>{
        event.preventDefault()

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement)
         if(card === null){
            return
         }

         const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:'card',
            card
         })
         if(error){
            console.log('payment error :',error)
            setError(error.message)
            return
         }
         else{
            console.log('payment method :', paymentMethod)
            setError('')
         }
         const {paymentIntent, error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    email:user?.email || 'anonymous',
                    name:user?.displayName || 'anonymous'
                }
            }
         })
         if(confirmError){
            console.log('confirm error')
            return
         }
         else{
            console.log('payment intent',paymentIntent)
            if(paymentIntent.status==='succeeded'){
                console.log(paymentIntent.id)
                setTransactionId(paymentIntent.id)

                // now save the image in the database ---------
                const payment ={
                    email:user.email,
                    price:totalPrice,
                    date:new Date(), //utc date  convert , use moment js to
                     cartIds:cart.map(item=>item._id),
                     menuItemIds:cart.map(item=>item.menuId),
                     transactionIds:paymentIntent.id,
                     status:'pending',
                }
                const res=await axiosSecure.post('/payment',payment)
                console.log("payment saved",res.data)
                refetch()
                if(res?.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/dashboard/payment-history')
                }
            }
         }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
      <CardElement
      options={{
        style:{
            base:{
                fontSize:'16px',
                color:'#424770',
                '::placeholder':{
                    color:'#aab7c4',
                },
            },
            invalid:{
                color:'#9e2146',
            },
        },
      }}
      />
      <button className='btn btn-ghost' type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      {/* Show error message to your customers */}
      <p className='text-red-600'>{error}</p>
      {transactionId && <p className='text-green-600'>transactionId : {transactionId} </p>}
    </form>
        </div>
    );
};

export default CheckoutForm;