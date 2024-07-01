

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useData } from "@/calls/reads"
import { ChevronLeft } from 'lucide-react';
import { safeGet } from '../../utils';
import useCartStore from '../../store/cart';

const Product = () => {
    const { id } = useParams();

    const { data } = useData({
        target: "/product/product",
        data: { id },
    });

    const navigate = useNavigate();

    const { addToCart } = useCartStore();

    // console.log(data, safeGet(data, ["images", "0", "image"], ""));

    return (
        <div className="relative">
            <div className="top flex gap-1 p-3">
                <div onClick={() => navigate('/store')} className="icon rounded-full h-[30px] w-[30px]  text-xs flex-center bg-white bg-opacity0 border border-gray-400 text-gray-500">
                    <ChevronLeft />
                </div>
                <span className='font-bold text-lg'>Store</span>
            </div>

            <div className="image mx-auto h-[300px] overflow-hidden ">
                <img src={safeGet(data, ["images", "0", "image"], "")} className='img-cover hw-full' />
            </div>

            <div className="p-4">
                <div className="mb-3 font-medium bg-green-500 text-white w-max px-3 rounded-2xl">
                    <span>Ghc</span>
                    <span className="text-lg font-black">{data?.price}</span>
                </div>
                <div className="mb-3 font-medium text-2xl">{data?.name}</div>
                <p className="font-light text-gray-700 mb-12 leading-loose">{data?.short_desc}</p>
            </div>


            <div className="fixed bottom-0 left-0 w-full pb-1.5 bg-white">
                <button onClick={() => {addToCart(data); navigate("/checkout");}} className='scale-95 bg-green-500 text-white font-medium p-3 rounded-2xl border-green-600 text-center w-full mt-1 hover:text-white hover:font-medium active:bg-green-600'>Buy Now</button>
            </div>

        </div>
    );
}

export default Product