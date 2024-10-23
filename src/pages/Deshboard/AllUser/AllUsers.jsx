import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure=useAxiosSecure()
    const {data:users=[],refetch}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
           const res=await axiosSecure.get('/users')
           return res.data
        }
    })

    const handleMakeAdmin=(user)=>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount>0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} has been saved`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    const handleDeleteButton=(user)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        refetch()
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

                    .catch(error => console.log(error))
            }
        });
    }

    return (
        <div>
            <div className='flex justify-evenly my-4'>
                <h2 className='text-3xl'>all users</h2>
                <h2 className='text-3xl'>total users : {users.length} </h2>
            </div>
            <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>email</th>
        <th>role</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user,index)=><tr key={user._id}>
            <th>{index+1}</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>
                { user.role==='admin'?'admin' :  <button onClick={()=>handleMakeAdmin(user)}
             className="btn  bg-orange-500 "><FaUsers className='text-white text-2xl' /></button>}
             </td>
            <td>
               <button onClick={()=>handleDeleteButton(user)} 
            className="btn btn-ghost bg-red-500 "><RiDeleteBin5Line className='text-white text-2xl' /></button>
            </td>
          </tr>)
      }
      
    </tbody>
  </table>
</div>
            </div>
        </div>
    );
};

export default AllUsers;