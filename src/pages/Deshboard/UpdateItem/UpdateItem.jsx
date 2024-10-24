import React from 'react';
import {  useLoaderData, useNavigate } from 'react-router-dom';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateItem = () => {
    const {price,name,category,recipe,_id}=useLoaderData()
    const { register, handleSubmit,reset } = useForm();
    const axiosPublic=useAxiosPublic()
    const axiosSecure=useAxiosSecure()
    const navigate=useNavigate()
    
    const onSubmit = async(data)=> {
        console.log(data)
        // image upload in imgbb and then get an url
        const imageFile={image:data.image[0]}
        const res=await axiosPublic.post(image_hosting_api,imageFile,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        if(res.data.success){
           const menuItem={
            name:data.name,
            category:data.category,
            recipe:data.recipe,
            price:parseFloat(data.price),
            image:res.data.data.display_url,
           } 
        const menuRes=await axiosSecure.patch(`/menu/${_id}`,menuItem)
        console.log(menuRes.data)
        if(menuRes.data.modifiedCount>0){
            // reset()
            navigate('/dashboard/manage-items')
            // to show menu success popup
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
           }
        }
        console.log("with image url",res.data)
       
    };
   
    return (
        <div>
            <SectionTitle heading="update item"/>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <label className="form-control w-full mb-6">
                    <div className="label">
                        <span className="label-text">Recipe Name*</span>
                    </div>
                    <input defaultValue={name} {...register("name",{ required: true})} type="text" placeholder="Type here" className="input input-bordered w-full " />        
                </label>
                <div className='flex gap-6'>
                    {/* ---category part */}
                    <label className="form-control w-full mb-6">
                    <div className="label">
                        <span className="label-text">Category Name*</span>
                    </div>
                    <select defaultValue={category} {...register("category",{ required: true})}
                    className="select select-bordered w-full ">
                    <option disabled value='default'>category</option>
                    <option value="salad">salad</option>
                    <option value="pizza">pizza</option>
                    <option value="soup">soup</option>
                    <option value="desserts">desserts</option>
                    <option value="drink">drink</option>
                </select>        
                </label>
                    {/* ---------price part -------- */}
                    <label className="form-control w-full mb-6">
                    <div className="label">
                        <span className="label-text">Price*</span>
                    </div>
                    <input defaultValue={price} {...register("price",{ required: true})} type="number" placeholder="price " className="input input-bordered w-full " />        
                </label>
                </div>
{/*  ----------------Recipe details------------ */}
<label className="form-control">
  <div className="label">
    <span className="label-text">Recipe details</span>
    
  </div>
  <textarea defaultValue={recipe} {...register("recipe")} className="textarea textarea-bordered h-24" placeholder="Recipe details"></textarea>
</label>
<div className='my-6'>
<input {...register("image",{ required: true})} type="file" className="file-input w-full max-w-xs" />
</div>
               <button className='btn '>Update Items </button>
            </form>
        </div>
    );
};

export default UpdateItem;