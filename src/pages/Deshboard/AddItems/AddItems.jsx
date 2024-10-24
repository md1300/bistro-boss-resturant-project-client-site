import React from 'react';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const { register, handleSubmit,reset } = useForm();
    const axiosPublic=useAxiosPublic()
    const axiosSecure=useAxiosSecure()

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
        const menuRes=await axiosSecure.post('/menu',menuItem)
        console.log(menuRes.data)
        if(menuRes.data.insertedId){
            reset()
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
            <SectionTitle heading="Add an item" subHeading={`What's new `} />
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <label className="form-control w-full mb-6">
                    <div className="label">
                        <span className="label-text">Recipe Name*</span>
                    </div>
                    <input {...register("name",{ required: true})} type="text" placeholder="Type here" className="input input-bordered w-full " />        
                </label>
                <div className='flex gap-6'>
                    {/* ---category part */}
                    <label className="form-control w-full mb-6">
                    <div className="label">
                        <span className="label-text">Category Name*</span>
                    </div>
                    <select defaultValue="default" {...register("category",{ required: true})}
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
                    <input {...register("price",{ required: true})} type="number" placeholder="price " className="input input-bordered w-full " />        
                </label>
                </div>
{/*  ----------------Recipe details------------ */}
<label className="form-control">
  <div className="label">
    <span className="label-text">Recipe details</span>
    
  </div>
  <textarea {...register("recipe")} className="textarea textarea-bordered h-24" placeholder="Recipe details"></textarea>
</label>
<div className='my-6'>
<input {...register("image",{ required: true})} type="file" className="file-input w-full max-w-xs" />
</div>
               <button className='btn '>AddItems <FaUtensils className='ml-3'/></button>
            </form>
        </div>
    );
};

export default AddItems;