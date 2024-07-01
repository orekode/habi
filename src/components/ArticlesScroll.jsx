import React from 'react'
import { useData } from '@/calls/reads'
import { NotFound, Shimmer } from '.';
import { Link } from 'react-router-dom';

const ArticleScroll = ({ categories = [], ignore=0 }) => {
    const { data } = useData({
        target: "/articles",
        data: {categories},
    });

    // console.log(data);
  return (
    <>
        <div className=" my-6 w-full overflow-x-scroll scrollbar-none">
            <div className="flex items-center gap-3 w-max">
                {data && data.filter( item => item.id !== ignore).map( item => 
                    <Link to={'/article/' + item.id} key={item.id} className="border rounded-3xl overflow-hidden w-[200px] ">
                        <div className="image h-[200px]">
                            <img src={item.image} alt="" className="img-cover" />
                        </div>
                        <div className="content p-3 h-[80px] flex-col justify-center">
                            <h2 className="text font-medium">{item.title}</h2>
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
  )
}

export default ArticleScroll