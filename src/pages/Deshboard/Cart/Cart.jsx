import React from 'react';
import useCart from '../../../Hooks/useCart';
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Cart = () => {
    const [cart,refetch] = useCart()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure()

    const handleDeleteButton = id => {
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

                axiosSecure.delete(`/carts/${id}`)
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
            <div className='flex justify-evenly'>
                <h1 className='text-4xl'>items :{cart.length} </h1>
                <h1 className='text-4xl'>total price :{totalPrice} </h1>
                <button className='btn btn-primary'>pay</button>
            </div>
            {/* -----------table section-------- */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>item image</th>
                            <th>name</th>
                            <th>price</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={item.image}
                                                    alt="no items picture" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.name}

                                </td>
                                <td>{item.price}</td>
                                <th>
                                    <button
                                        onClick={() => handleDeleteButton(item._id)}
                                        className="btn btn-ghost text-red-500 "><RiDeleteBin5Line /></button>
                                </th>
                            </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Cart;