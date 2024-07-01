import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Loading } from "@/components";
import { useNavigate } from 'react-router-dom';
import { useData } from '@/calls/reads'
import { NotFound, Shimmer } from '../../components';
import useCartStore from '../../store/cart';

const Store = () => {
  const [ products, setProducts ] = useState([]);

  const { cart, toggle, toggleCartVisibility } = useCartStore();

  const [ page, setPage ] = useState(1);

  const { data } = useData({
    target: "/product",
    data: {page}
  });

  const navigate = useNavigate();

  useEffect(() => {
      if(data) setProducts(data);
  }, [data]);

  return (
    <div className='p-6'>
      {/* <Loading load={load} /> */}
        <div className="top flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <div onClick={()=>navigate(-1)} className="icon rounded-full h-[30px] w-[30px]  text-xs flex-center bg-white bg-opacity0 border border-gray-400 text-gray-500">
              <ChevronLeft />
            </div>
            <span className='font-bold text-lg'>Store</span>
          </div>

          <button onClick={() => navigate('/orders')} className="border-2 border-green-500 text-green-600 hover:bg-green-500 active:bg-green-600 hover:text-white rounded-2xl px-3 py1.5 text-center">
            My Orders
          </button>
        </div>

        <div className="search-box flex items-center gap-1.5 h-[40px]">
            <input type="text" className="flex-grow border h-full rounded-xl px-3 w-full" style={{width: 'calc(100% - 45px)'}}/>
            <div onClick={toggleCartVisibility} className="icon rounded-full border h-full w-[40px] flex-center">
                <ShoppingBag />
            </div>

        </div>

        <div className="grid-box mt-3">
            {data && products.map( item => 
              <div key={item.id} className="card  relative scale-95">
                <div onClick={() => navigate("/product/" + item.id)} className="">
                  <div className="h-[200px] border rounded-2xl overflow-hidden p-6">
                    <img src={item.images[0]?.image} alt="" className="img-cover" />
                  </div>

                  <div className=" bottom-0 left-0 w-full p-1.5">
                    <div className="bg-white p-0.5 rounded-2xl">
                      <div className="name text-sm font-semibold leading-tight">{item.name}</div>
                      <div className="price w-full text-left mt-0.5"><span className="text-xs">Ghc</span> {item.price}</div>
                    </div>
                  </div>
                </div>

                <div className="cart absolute top-1 right-1 p-0.5">
                  <div onClick={() => toggle(item)} className={`icon rounded-full h-[40px] w-[40px] flex-center ${ cart.find(itm => itm.id == item.id) ? "bg-green-600 text-white" : "bg-white" } bg-opacity0 border-2 border-green-600 text-green-600`}>
                    <ShoppingBag />
                  </div>
                </div>
              </div>
            )}

            {!data && Array.from({length: 10}, (_, idx) => 
              <div key={idx} className="card  relative scale-95">
                <Shimmer />
                <div className="h-[200px] border rounded-2xl overflow-hidden p-6">
                  <img src="" alt="" className="img-contain" />
                </div>

                <div className=" bottom-0 left-0 w-full p-1.5">
                  <div className="bg-white p-0.5 rounded-2xl">
                    <div className="name text-sm font-semibold leading-tight">""</div>
                    <div className="price w-full text-left mt-0.5"><span className="text-xs">Ghc</span> ""</div>
                  </div>
                </div>

                <div className="cart absolute top-0 right-0 p-0.5">
                  <div className="icon rounded-full h-[40px] w-[40px] flex-center bg-white bg-opacity0 border-2 border-green-600 text-green-600">
                    <ShoppingBag />
                  </div>
                </div>
              </div>
            )}
        </div>

        <NotFound.Lg image="/images/empty_cart.jpg" load={data && products.length <= 0} title="No Items In Store"/>

        <div className="pagination flex gap-1 justify-end">
          <div onClick={() => setPage( page - 1 < 1 ? 1 : page - 1)} className="icon rounded-full h-[30px] w-[30px]  text-xs flex-center bg-white bg-opacity0 border border-gray-400 text-gray-500">
            <ChevronLeft />
          </div>
          <div onClick={() => setPage( page + 1 )} className="icon rounded-full h-[30px] w-[30px] text-xs flex-center bg-white bg-opacity0 border border-gray-400 text-gray-500">
            <ChevronRight />
          </div>
        </div>
    </div>
  )
}

export default Store