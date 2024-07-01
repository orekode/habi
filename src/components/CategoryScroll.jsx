import React, { useEffect, useState } from 'react'
import { useData } from '@/calls/reads'
import { Shimmer } from '.';

const CategoryScroll = ({ callback = () => {} }) => {

    const [ categories, setCategories ] = useState([]);

    const { data } = useData({
        target: "/categories"
    });

    const toggle = (id) => {
        if(categories.includes(id)) setCategories(categories.filter( item => item != id));
            else setCategories([...categories, id]);
    }

    useEffect(() => {
        callback(categories)
    }, [categories]);

    return (
        <div className=" my-6 w-full overflow-x-scroll scrollbar-none">
            <div className="flex items-center gap-3 w-max">
                {data && data.map( item => 
                    <div onClick={() => toggle(item.id)} key={item.id} className={` ${categories.includes(item.id) ? "text-white bg-green-600" : "text-gray-600"} border-green-400 border rounded-xl p-1.5 text-xs font-medium hover:bg-green-600 hover:text-white`}>{item.name}</div>
                )}

                {(!data) && Array.from({length: 10}, (_, id) => 
                    <div onClick={() => toggle(item.id)} key={id} className={` ${"text-white bg-green-600"} border-green-400  rounded-xl p-1.5 text-xs font-medium hover:bg-green-600 hover:text-white relative`}>
                    testname oer here
                    <Shimmer />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryScroll