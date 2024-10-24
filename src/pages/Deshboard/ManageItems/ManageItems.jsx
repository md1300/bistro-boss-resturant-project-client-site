import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../Hooks/useMenu';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const ManageItems = () => {
 const [menu,,refetch]=useMenu()
 const axiosSecure=useAxiosSecure()

 const handleDeleteItems=(item)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
           const res=await axiosSecure.delete(`/menu/${item._id}`)
           console.log(res.data)
           if(res.data.deletedCount>0){
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${item.name} has been deleted successfully`,
                showConfirmButton: false,
                timer: 1500
              });
           }
    
        }
      });
 }


    return (
        <div>
            <SectionTitle heading="manage all items" subHeading="Hurry up" />
            <div className="overflow-x-auto">
                <h1>total items : {menu.length}</h1>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                               #
                            </th>
                            <th>Item image</th>
                            <th>Item name</th>
                            <th>Price </th>
                            <th> Action</th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item,index)=><tr key={item._id}>
                                <th>
                                    {index+1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </td>
                                <td>
                                 {item.name}
                                </td>
                                <td>
                                    {item.price}
                                </td>
                                <th>
                                    <Link to={`/dashboard/update-items/${item._id}`}>
                                    <button className="btn btn-ghost "><FaEdit/></button>
                                   
                                 </Link>                                 
                                </th>
                                <th>
                                    <button 
                                    onClick={()=>handleDeleteItems(item)}
                                     className="btn btn-ghost "><FaTrashAlt/></button>
                                </th>
                            </tr>)
                        }
                        

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageItems;