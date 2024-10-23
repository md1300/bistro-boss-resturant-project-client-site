import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, } from "react-hook-form";
import { Link, useNavigate, } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProdiver';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';


const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors },}=useForm();
  const {signUp,updateUserProfile}=useContext(AuthContext)
 const navigate=useNavigate()
 const axiosPublic=useAxiosPublic()

  const onSubmit = (data) => {
    signUp(data.email,data.password)
    .then(result=>{
     const loggedInUser=result.user;
     console.log(loggedInUser);
     const name=data.name;
     const photo=data.photo;
     updateUserProfile(name,photo)
     .then(()=>{
      const userInfo={
        name:name,
        email:data.email,
      }
      axiosPublic.post('/users',userInfo)
      .then(res=>{
        if(res.data.insertedId){
          reset()
          Swal.fire("SweetAlert2 is working!");
          navigate('/')
        }
      })
      .catch(error=>console.log(error.message))
     }) 
     .catch(error=>console.log(error)) 
    })
    
    .catch(error=>console.log(error.message))
    
    console.log(data)
  }



  return (
    <>
      <Helmet>
        <title>bistro Boss | sign up</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content grid lg:grid-cols-2 gap-3 p-10 ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">signUp now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: true })} name='name' placeholder="Your Name" className="input input-bordered" />
                {errors.name && <span className='text-red-600'>name is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">photoURL</span>
                </label>
                <input type="url" {...register("photo", { required: true })}  placeholder="Your photoUrl" className="input input-bordered" />
                {errors.photo && <span className='text-red-600'>photoURL is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" />
                {errors.name && <span className='text-red-600'>email is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", { required: true, minLength: 5, maxLength: 12, })} name='password' placeholder="password" className="input input-bordered" />
                {errors.password && <span className='text-red-600'>password is required</span>}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <p className='btn btn-link'><small><Link to='/logIn' >already register? go to login</Link></small></p>

              <div className="form-control mt-6">

                <input className="btn  btn-primary" type="submit"
                  value="sign up" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  );
};

export default SignUp;