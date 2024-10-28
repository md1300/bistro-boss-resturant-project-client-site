import React from 'react';
import axios from "axios" ;
import {useNavigate} from 'react-router-dom'
import useAuth from '../Hooks/useAuth'

 const axiosSecure=axios.create({
    baseURL:'http://localhost:5000'

}) 
const useAxiosSecure = () => {
   const {logOut}=useAuth()
   const navigate=useNavigate()
   // request interceptors to add authorization header for every secure call to the api
   axiosSecure.interceptors.request.use(function (config) {
      const token=localStorage.getItem('access-token')
      console.log('request stopped by interceptors',token)
      config.headers.authorization=`bearer ${token}`
      // console.log(config)
      return config

   }, function(error){
      console.log(error)
      return Promise.reject(error)
   })
   // interceptors 401,403 status
   axiosSecure.interceptors.response.use(function(response){
      return response
   },async(error)=>{
      const status=error.response.status; 
      console.log(error.response)
      console.log('status error in  the interceptors',status)
      // for 401 and 403 log out the user and move the user to login page
      if(status===401 || status===403){
         await logOut()
         navigate('/login')      
      }
      return Promise.reject(error)
   })
   return axiosSecure
};

export default useAxiosSecure;