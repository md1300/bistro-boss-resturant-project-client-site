import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()

    const {data:payments=[]}=useQuery({
        queryKey:['payments',user.email],
        queryFn:async()=>{
           const res=await axiosSecure.get(`/payment/${user.email}`)
           console.log(res.data)
           return res.data
        }   
    })
   

    return (
        <div>
            <h1>total payment {payments.length}</h1>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>price </th>
        <th>transaaction id</th>
        <th>status</th>
      </tr>
    </thead>
    <tbody>
      {
        payments.map((payment,index)=> <tr key={payment._id}>
            <th>{index+1}</th>
            <td>{payment.price}</td>
            <td>{payment.transactionIds}</td>
            <td>{payment.status}</td>
          </tr>)
      }
     
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentHistory;