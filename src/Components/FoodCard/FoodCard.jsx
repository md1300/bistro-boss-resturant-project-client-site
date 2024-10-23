import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";


const FoodCard = ({item}) => {
    const {name,recipe,image,price,_id}=item ;
    const {user}=useAuth();
    const navigate=useNavigate()
    const location=useLocation()
    const axiosSecure=useAxiosSecure()
    const [,refetch]=useCart()

    const handleAddToCart=()=>{
     if(user && user.email){
         const cartItem={
          menuId:_id,
          email:user.email,
          name,image,price
         }
         axiosSecure.post('/carts',cartItem)
         .then(res=>{
          console.log(res.data)
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name},successfully added to the cart`,
              showConfirmButton: false,
              timer: 1500
            });
            refetch()
          }
         
         })
     }
     else{
      Swal.fire({
        title: " you are not log in",
        text: "please log in to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log in !"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', {state:{from:location}})
        }
      });
     }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={image}
      alt="Foods photo" />
  </figure>
  <p className="bg-black text-white absolute right-0  mt-4 mr-4 px-4">$ {price}</p>
  <div className="card-body flex flex-col  items-center">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-end">
      <button onClick={handleAddToCart} className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400  my-4">Add to  cart</button>
    </div>
  </div>
</div>
    );
};

export default FoodCard;