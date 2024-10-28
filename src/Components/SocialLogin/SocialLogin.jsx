import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {googleSignIn,}=useAuth()
    const axiosPublic=useAxiosPublic()
    const navigate=useNavigate()

    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(result=>{
            const userInfo={
                name:result.user.displayName,
                email:result.user.email,
            }
            // console.log(result)
            axiosPublic.post('/users',userInfo)
            .then(res=>console.log(res.data))
            .catch(error=>console.log(error.message))
            navigate('/')
        })
        .catch(error=>console.log(error))
    }
    return (
        <div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                   <FaGoogle/>
                   google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;