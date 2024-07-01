import { Leaf } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Table, Loading } from '@/components'
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from "@/calls/reads";
import { Post } from "@/calls/create";
import Swal from 'sweetalert2';
import { useQueryClient } from 'react-query';


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
    <div>
      <div className="top"></div>
      <Loading load={load} />
      <Table 
        name={data && data.status == "completed" ? "Completed Order" : "Recent Order"}
        actions={<button className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>{data?.created_at}</button>}
        titles={{
          "Image":   1,
          "Product": 3,
          "Price":     2,
          "Quantity": 1,
          // "Status":   2,
          // "Action":   2,
        }}
        values={order.map( item => ({
            image: 
            <>
              <div className="flex flex-wrap justify-center overflow-hidden max-h-[60px] w-full">
                {item?.product?.images?.map((img, idx) => 
                  <div key={idx} className="image h-[30px] w-[30px] rounded-full overflow-hidden">
                    <img src={img.image} className="object-cover hw-full" />
                  </div>
                )}
              </div>
            </>,
            order: item?.product?.name ?? "Deleted Product",
            price: item?.price,
            quantity: item?.quantity,
            // status: <span className="capitalize">{item.status}</span>,
            // action: <div onClick={() => navigate('/admin/products/' + 1)} className='text-sm font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600 mx-auto w-[70px]'>Edit</div>
          }))
        }
      />

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