import { Eye, EyeOff, Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react'

import { useForm } from 'react-hook-form';
import Loading from '@/components/Loading';
import { Post } from '@/calls/create';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '@/calls/auth';
import { useAuth } from '@/store/auth';
import useCartStore from '../../store/cart';

const Login = () => {
  const [ load, setLoad ] = useState(false);
  const [ visible, setVisible ] = useState(false);
  const { setData } = useAuth();

  const navigate = useNavigate();

  const { cart, increaseQuantity, decreaseQuantity, cartVisible, toggleCartVisibility, removeFromCart, reset } = useCartStore();

  const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm({
    defaultValues: {
      number: "",
      name: "",
      address: "",
    }
  });

  const login = async (data) => {
    try {

      if(cart.length <= 0) {
        Swal.fire({
          icon: "error",
          title: "Empty Cart",
          text: "Add an item to cart, and try again",
        });

        navigate("/store");
        return false;
      }
      setLoad(true);

      const result = 
      await Post('/orders', {
        ...data, 
        cart, 
        quantity: cart.reduce( (sum, item) => sum + item.quantity, 0),
        cost: cart.reduce( (sum, item) => sum + (parseFloat(item.price) * item.quantity), 0), 
      });

      if(!result) {

        setLoad(false);

          Swal.fire({
            icon: "error",
            title: "System Busy",
            text: "Please try again later"
          });

        setLoad(false);

        return false;

      }
      else {
        Swal.fire({
          icon: "success",
          title: "Order Made"
        });

        reset();

        navigate("/store");
      }

      // navigate('/orders');

      setLoad(false);

      return false;
    }
    catch(e) {
      console.log(e);
      return false;
    }
  }

  const checkValues = () => {
    let err = Object.values(errors);

    if(err.length > 0 && !isValid && isSubmitted) {
      err.map((err) => toast.error(err.message))
    }
  }

  return (
    <div className=" flex-center flex-col py-12">
        <Loading load={load} />
        <div className="logo h-[100px] w-[100px]">
            <img src="/images/logo.png" className="img-cover"/>
        </div>

        <form onSubmit={handleSubmit(login)} className="w-full p-7">
            <div className="inputs">
              <div className="input flex flex-col">
                <label htmlFor="name" className="font-normal text-xs my-1.5 text-gray-600">Full Name</label>
                <input 
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Please provide your full name"
                    }
                  })} 
                  type="text" 
                  className="bg-gray-200 rounded-2xl p-2.5 outline-green-600" 
                />
              </div>

              <div className="input flex flex-col">
                <label htmlFor="number" className="font-normal text-xs my-1.5 text-gray-600">Contact</label>
                <input 
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Please provide your phone number"
                    }
                  })} 
                  type="text" 
                  className="bg-gray-200 rounded-2xl p-2.5 outline-green-600" 
                />
              </div>

              <div className="input flex flex-col">
                <label htmlFor="address" className="font-normal text-xs my-1.5 text-gray-600">Address</label>
                <input 
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Please provide your pickup address"
                    }
                  })} 
                  type="text"
                  className="bg-gray-200 rounded-2xl p-2.5 outline-green-600" 
                />
              </div>

              <div className="my-7">
                <button onClick={checkValues} className='btn-md text-sm'>Make Payment</button>
              </div>

              <div className="summary rounded-xl">
                  <div className="top flex gap-6 mb-3">
                    <div className="font-medium text-sm"> Quantity: {cart.reduce((sum, item) => sum + item.quantity, 0)} items</div>
                    <div className="font-medium text-sm"> Cost: Ghc {cart.reduce( (sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)}</div>
                  </div>

                  {cart.map(item => 
                    <div key={item.id} className="item border rounded-xl overflow-hidden flex gap-4 p-3 mb-3 relative">
                        <div onClick={() => removeFromCart(item.id)} className="absolute top-0 right-0 flex-center h-[35px] w-[35px] rounded-bl-2xl border bg-white text-gray-300 z-10">
                            <Trash2 size={18} />
                        </div>
                        <div className="h-[100px] w-[100px] overflow-hidden rounded-xl">
                            <img src={item.images[0]?.image}className='object-cover hw-full'/>
                        </div>
                        <div className="content">
                            <div className="name font-semibold">{item.name.slice(0, 22)}{item.name.length > 22 && "..."}</div>
                            <div className="font-bold text-gray-500">
                                <span>Ghc</span>
                                <span className='text-lg'>{item.price}</span>
                            </div>
                            <div className="flex my-1 items-center mt-3">
                                <div onClick={() => increaseQuantity(item.id)} className="icon h-[30px] w-[30px] border-2 border-green-600 text-green-500 rounded-full flex-center">
                                    <Plus />
                                </div>

                                <div className="number min-w-[40px] flex-center font-semibold">{item.quantity.toString().padStart(2, "0")}</div>

                                <div onClick={() => decreaseQuantity(item.id)} className="icon h-[30px] w-[30px] border-2 border-orange-500 text-orange-500 rounded-full flex-center">
                                    <Minus />
                                </div>
                            </div>

                        </div>
                    </div>
                )}
              </div>

            </div>
        </form>

    </div> 
  )
}

export default Login