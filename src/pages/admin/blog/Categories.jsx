import React, { useEffect, useState } from 'react'
import { useData } from '@/calls/reads'
import { Shimmer } from '@/components';
import { Link } from 'react-router-dom';

const Categories = ({ callback = () => {} }) => {

    const [ categories, setCategories ] = useState([]);

    const [ page, setPage ] = useState(1);

    const { data } = useData({
        target: "/categories",
        data: {page}
    });

    const toggle = (id) => {
        if(categories.includes(id)) setCategories(categories.filter( item => item != id));
            else setCategories([...categories, id]);
    }

    console.log(data);

    useEffect(() => {
        callback(categories)
    }, [categories]);
  return (
    <div>
        <div className="top flex items-center justify-between mb-3">
            <div className="name text-sm font-bold">Categories</div>
            <Link to='/admin/blog/categories/add'>
                <button className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>Add Category</button>
            </Link>
        </div>
        <div className='grid-box gap-3'>
            
            {data && data.map( item => 
                <Link to={'/admin/blog/category/' + item.id} className="hover:scale-105 relative">
                    <div className="h-[180px] border rounded-2xl overflow-hidden">
                        <img src={item.image == "" ? "/images/category.png" : item.image} alt="" className="object-cover hw-full" />
                    </div>
                    <div className="name text-xs my-1.5 text-center">{item.name}</div>
                </Link>
            )}

            {(!data) && Array.from({length: 10}, (_, id) => 
                {Array.from({length: 10}, (_, idx) => 
                    <div className="hover:scale-105 relative rounded-2xl overflow-hidden">
                        <div className="h-[180px] border rounded-2xl"></div>
                        <div className="name text-xs my-1.5 text-center">This is your name</div>
                        <Shimmer />
                    </div>
                )}
            )}
        </div>

        <div className="flex items-center justify-between">
            <button type="button" onClick={() => setPage( page - 1 < 1 ? 1 : page - 1)} className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>Prev</button>
            <button type="button" onClick={() => setPage( page + 1 )}className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>Next</button>
        </div>
    </div>
  )
}

export default Categories