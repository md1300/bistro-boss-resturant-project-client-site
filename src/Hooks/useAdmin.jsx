import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const axiosSecure=useAxiosSecure()
    const {user,loading}=useAuth()
   const {data:isAdmin,isPending:isAdminLoading}=useQuery({
    queryKey:[user?.email,'isAdmin'],
    enabled: !loading ,
    queryFn:async()=>{
        console.log('asking and checking is admin ')
        console.log(user.email)
       const res=await axiosSecure.get(`/users/admin/${user?.email}`)
       console.log(res.data)
        return res.data?.admin
    }
    
   })
    //  console.log(isAdmin)
   return [isAdmin,isAdminLoading]
};

export default useAdmin;