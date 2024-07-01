import React from 'react'
import { useData } from '@/calls/reads'
import { NotFound, Shimmer } from '@/components';
import { Link } from 'react-router-dom';

const Articles = ({ categories = [] }) => {
    const { data } = useData({
        target: "/articles",
        data: {categories},
    });

    // console.log(data);

    return (
        <>
            <div className=" my-6 w-full overflow-x-scroll scrollbar-none">
                <div className="top flex items-center justify-between py-3">
                    <div className="name text-green-600">Articles</div>
                    <div className="actions">
                        <Link to={'/admin/articles/add'} className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>New Article</Link>
                    </div>
                </div>
                <div className="grid-box gap-3">
                    {data && data.map( item => 
                        <Link to={'/admin/articles/' + item.id} key={item.id} className="border rounded-3xl overflow-hidden ">
                            <div className="image h-[200px]">
                                <img src={item.image} alt="" className="img-cover" />
                            </div>
                            <div className="content p-3 h-[80px] flex-col justify-center">
                                <h2 className="text-sm font-medium">{item.title.slice(0, 40)}{item.title.length > 40 && "..."}</h2>
                            </div>
                        </Link>
                    )}

                    {(!data) && Array.from({length: 10}, (_, id) => 
                        <div key={id} className=" rounded-3xl overflow-hidden w-[200px] relative">
                            <div className="image h-[200px]">
                                {/* <img src="/images/tomatos.jpeg" alt="" className="img-cover" /> */}
                            </div>
                            <div className="content p-3 h-[80px] flex-col justify-center">
                                <h2 className="text font-medium">This is a test title oer here</h2>
                            </div>
                            <Shimmer />
                        </div>
                    )}

                </div>
            </div>
            <NotFound.Lg load={data && data.length <= 0}/>
        </>
    );
}

export default Articles