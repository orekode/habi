import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { ArticlesScroll } from '@/components'
import { useNavigate, useParams } from 'react-router-dom'
import { useData } from "@/calls/reads";
import { Shimmer } from '../../components';

const Article = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { data } = useData({
        target: "/article" ,
        data: {id},
    });

    console.log(data);

    if(!data)
    return (
        <div className='p-3'>
            <div className="top text-center relative">
                <span>Article titles</span>
                <div className="fixed top-0 left-0 z-20 p-1.5 px-3">
                    <div onClick={() => navigate(-1)} className="border rounded-xl flex-center p-1.5 bg-white ">
                        <ChevronLeft />
                    </div>
                </div>
                <Shimmer />
            </div>

            <div className="image h-[250px] rounded-2xl mt-6 overflow-hidden relative">
                <img src="/images/tomatos.jpeg" alt="" className="img-cover" />
                <Shimmer />
            </div>

            <div className="content ">
                <div className="font-bold text-xl mt-5 mb-1.5 relative"><Shimmer />Article Title Here Again</div>
                <p className="content leading-loose text-gray-700 relative" >
                    <Shimmer />
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, explicabo aliquid. Autem odit amet molestias eum quas reprehenderit minus nihil voluptatibus quidem. Excepturi molestias nemo assumenda dolores optio alias. Voluptatum.
                </p>
            </div>

            <div className="content">
                <div className="font-bold text-lg mt-4 mb-1.5">Related Articles</div>
                <ArticlesScroll />
            </div>


        </div>
    )

    return (
        <div className='p-3'>
            <div className="top text-center">
                <span>{data?.title}</span>
                <div className="fixed top-0 left-0 p-1.5 px-3">
                    <div onClick={() => navigate(-1)} className="border bg-white rounded-xl flex-center p-1.5">
                        <ChevronLeft />
                    </div>
                </div>
            </div>

            <div className="image h-[250px] rounded-2xl mt-6 overflow-hidden">
                <img src={data?.image} alt="" className="img-cover" />
            </div>

            <div className="content ">
                <div className="font-bold text-xl mt-5 mb-1.5">{data?.title}</div>
                <p className="content leading-loose text-gray-700" >
                    {data?.desc}
                </p>
            </div>

            <div className="content mt-3">
                <p className="content leading-loose text-gray-700 overflow-clip" >
                    {data?.content.replaceAll("0", " ").replaceAll("a", " ").replaceAll("3", " ")}
                </p>
            </div>

            <div className="content ">
                <div className="font-bold text-lg mt-4 mb-1.5">Related Articles</div>
                <ArticlesScroll categories={data.categories ?? []} ignore={data.id ?? 0} />
            </div>


        </div>
    )
}

export default Article