import { Leaf } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Table } from '@/components'
import { useNavigate } from 'react-router-dom';
import { useData } from "@/calls/reads";



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
    <div>
      <div className="top"></div>

      <Table 
        name="Recent Orders"
        // actions={<button className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>View All</button>}
        titles={{
          "Images":   1,
          "orders": 3,
          "Date":     2,
          "Quantity": 1,
          "Status":   2,
          "Action":   2,
        }}
        values={orders.map( item => ({
            image: 
            <>
              <div className="flex flex-wrap justify-center overflow-hidden max-h-[60px] w-full">
                {item.images.map((img, idx) => 
                  <div key={idx} className="image h-[30px] w-[30px] rounded-full overflow-hidden">
                    <img src={img} className="object-cover hw-full" />
                  </div>
                )}
              </div>
            </>,
            orders: item.products.reduce((names, item) => names + ` ${item} `, ''),
            date: item.created_at,
            quantity: item.quantity,
            status: <span className="capitalize">{item.status}</span>,
            action: <div onClick={() => navigate('/admin/orders/' + item.id)} className='text-sm font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600 mx-auto w-[70px]'>View</div>
          }))
        }
      />

    </div>
  )
}

export default Orders