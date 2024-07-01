import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Table } from '@/components'
import { useNavigate } from 'react-router-dom';
import { useData } from "@/calls/reads";
import { NotFound, Shimmer } from '../../components';



const Orders = () => {
  const [page, setPage] = useState(1);
  const [ orders, setOrders ] = useState([])
  const { data } = useData({
      target: "/orders",
      data: {page}
  });

  const navigate = useNavigate();

  useEffect(() => {
      if(data) setOrders(data);
  }, [data]);

  console.log(data);
  
  return (
    <div className="p-6">
        <div className="top flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <div onClick={()=>navigate(-1)} className="icon rounded-full h-[30px] w-[30px]  text-xs flex-center bg-white bg-opacity0 border border-gray-400 text-gray-500">
              <ChevronLeft />
            </div>
            <span className='font-bold text-lg'>My Orders</span>
          </div>
        </div>

        {orders.map( item =>  
            <div onClick={() => navigate('/order/' + item.id)} className="flex items-center gap-3 border rounded-2xl mb-3 p-3">
              <div className="flex flex-wrap justify-center overflow-hidden h-[70px] w-[70px] border rounded-xl">
                {item.images.map((img, idx) => 
                  <div key={idx} className="image h-[60px] w-[60px] rounded-full overflow-hidden">
                    <img src={img} className="object-cover hw-full" />
                  </div>
                )}
              </div>
              <div>
                <div className="name py-0.5">
                    {item.products.reduce((names, item) => names + ` ${item}, `, '')}
                </div>

                <div className="flex items-center gap-3">
                    <div className="border rounded-xl p-0.5 px-3 text-sm w-max">{item.created_at}</div>
                    <div className={`border rounded-xl p-0.5 px-3 text-sm w-max ${item.status == "pending" ?  "bg-orange-400" : item.status == "processing" ? "bg-green-500" : "bg-green-800"} text-white`}>{item.status}</div>
                </div>
              </div>
            </div>
        )}
      
        {!data && Array.from({length: 10}, item =>  
            <div className="flex items-center gap-3 border rounded-2xl mb-3 p-3 relative">
              <div className="flex flex-wrap justify-center overflow-hidden h-[70px] w-[70px] border rounded-xl"></div>
              <div>
                <div className="name py-0.5"></div>
                <div className="flex items-center gap-3">
                    <div className="border rounded-xl p-0.5 px-3 text-sm w-max"></div>
                    <div className={`border rounded-xl p-0.5 px-3 text-sm w-max text-white`}></div>
                </div>
              </div>
              <Shimmer />
            </div>
        )}

        <NotFound.Lg image="/images/empty_cart.jpg" load={data && orders.length <= 0} title="No Orders Made" text="please visit the store and make orders"/>

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

export default Orders