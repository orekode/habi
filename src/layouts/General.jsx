

import { Delete, Minus, Plus, Trash, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import useCartStore from '../store/cart';

const General = () => {
    const [ show, setShow ] = useState(false);

    const { cart, increaseQuantity, decreaseQuantity, cartVisible, toggleCartVisibility, removeFromCart } = useCartStore();

    const navigate = useNavigate();

    // why tf do we need this? why would you want to wait 7s on purpose?????
    // useEffect(() => {
    //     setTimeout(() => setShow(false), 7000)
    // }, []);

  return (
    <div>
        <div className="relative z-0">
            <Outlet />
        </div>
        <Toaster expand richColors />
        {show &&
            <div className="hw-screen flex-center fixed top-0 left-0 bg-white">
                <div className="h-[150px] w-[150px]">
                    <img src="/images/logo.png" className="img-cover" />
                </div>
            </div>
        }

        <div className={`cart fixed ${cartVisible ? "top-0" : "top-[120vh]"} left-0 hw-screen bg-white p-3`}>
            <div className="flex items-center justify-between mb-6">
                <div className="font-medium text-xl">Cart</div>
                <div onClick={toggleCartVisibility} className="icon h-[30px] w-[30px] flex-center opacity-50 border-2 border-black rounded-full">
                    <X />
                </div>
            </div>

            <div className="items">
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

                {(cart && cart.length <= 0) && 
                    <div className=" flex-center flex-col justify-center my-12 max-w-[350px] px-3">
                        <div className="h-[300px] w-[300px]">
                            <img src="/images/empty_cart.jpg" className="object-cover hw-full" />
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-xl text-green-700 text-opacity-70 mb-1.5">Empty Cart</div>
                            <p className="text-gray-500">Browser our list of products, add to cart and checkout to purchase</p>
                        </div>
                    </div>
                }
            </div>

            {(cart && cart.length > 0) &&
                <div className="absolute bottom-0 left-0 w-full bg-white">
                    <button onClick={() => {toggleCartVisibility(); navigate('/checkout')}} className='bg-green-500 text-white font-medium p-3 border-green-600 text-center w-full hover:text-white hover:font-medium active:bg-green-600'>Proceed to Checkout</button>
                </div>
            }
        </div>

    </div>
  )
}

export default General