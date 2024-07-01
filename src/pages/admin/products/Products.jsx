
import React, { useEffect, useState } from 'react'
import { Table } from '../../../components'
import { useData } from '@/calls/reads'
import { Link, useNavigate } from 'react-router-dom'

const Products = () => {
    const [page, setPage] = useState(1);
    const [ products, setProducts ] = useState([])
    const { data } = useData({
        target: "/product",
        data: {page}
    });

    const navigate = useNavigate();

    useEffect(() => {
        if(data) setProducts(data);
    }, [data]);

  return (
    <div>
        
        <Table
            name="Products"
            actions={<Link to={'/admin/products/add'} className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>Add Product</Link>}
            titles={{
                "Images":   2,
                "Product Name": 3,
                "Price":     3,
                "Action":   2,
            }}
            values={products.map( item => ({
                image:
                <>
                  <div className="flex flex-wrap justify-center overflow-hidden max-h-[60px] w-full">
                    {item.images && item.images.map((img, idx) => 
                      <div key={idx} className="image h-[30px] w-[30px] rounded-full overflow-hidden">
                        <img src={img.image} className="object-cover hw-full" />
                      </div>
                    )}
                  </div>
                </>,
                name: item.name,
                price: item.price,
                action: <div onClick={() => navigate('/admin/products/' + item.id)} className='text-sm font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600 mx-auto w-[70px]'>Edit</div>
            }))}
      />

        <div className="flex items-center justify-end gap-3 mt-6">
            <button type="button" onClick={() => setPage( page - 1 < 1 ? 1 : page - 1)} className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>Prev</button>
            <button type="button" onClick={() => setPage( page + 1 )} className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>Next</button>
        </div>
    </div>
  )
}

export default Products