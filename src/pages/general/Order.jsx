import { Leaf, ShoppingBag } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Table, Loading } from '@/components'
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from "@/calls/reads";
import { Post } from "@/calls/create";
import Swal from 'sweetalert2';
import { useQueryClient } from 'react-query';
import { Shimmer } from '../../components';
import { safeGet } from "@/utils";

const Order = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [ order, setOrder ] = useState([])
  const [ load, setLoad ] = useState(false);
  const { data } = useData({
      target: "/orders/order",
      data: {page, id}
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  useEffect(() => {
      if(data && data.products && data.products.length) setOrder(data.products);
      console.log(data);
  }, [data]);


  const updateOrder = async (status) => {
    try {

      setLoad(true);

      const response = await Post("/orders", {id, status, _method: 'PUT'});

      if (response) {
        Swal.fire({
          icon: 'success',
          title: "Update Successful",
        });

        queryClient.invalidateQueries();
      }
      else {
        Swal.fire({
          icon: "error",
          title: "System Busy",
          text: "Please try again later",
        })
      }

      setLoad(false);

    } catch(error) {
      console.log(error);
    }
  }
  
  return (
    <div className='p-6'>
      <div className="top">Order Products</div>
        <Loading load={load} />

        <div className="grid-box mt-3">
            {data && order.map( item => 
              <div key={item.id} className="card  relative scale-95">
                <div className="">
                  <div className="h-[200px] border rounded-2xl overflow-hidden p-6">
                    <img src={safeGet(item, ['product', 'images', '0', 'image'], '/images/icon.png')} className="object-cover hw-full" />
                  </div>

                  <div className=" bottom-0 left-0 w-full p-1.5">
                    <div className="bg-white p-0.5 rounded-2xl">
                      <div className="name text-sm font-semibold leading-tight">{item?.name}</div>
                      <div className="price w-full text-left mt-0.5"><span className="text-xs">Ghc</span> {item?.price}</div>
                    </div>
                  </div>
                </div>

                {/* <div className="cart absolute top-1 right-1 p-0.5">
                  <div onClick={() => toggle(item)} className={`icon rounded-full h-[40px] w-[40px] flex-center ${ cart.find(itm => itm.id == item.id) ? "bg-green-600 text-white" : "bg-white" } bg-opacity0 border-2 border-green-600 text-green-600`}>
                    <ShoppingBag />
                  </div>
                </div> */}
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

      <div className="flex items-center justify-end">
        {data && data.status !== "completed" &&
          <button onClick={() => updateOrder(data.status == "pending" ? "processing" : "completed")} className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600 mt-6'>{
            data.status == "pending" ? "Accept Order" : "Complete Order"
          }</button>
        }
      </div>

    </div>
  )
}

export default Order