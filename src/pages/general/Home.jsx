import { useState } from 'react'
import { useAuth } from '@/store/auth';
import { greet } from "@/utils"
import { ChevronRight } from 'lucide-react';
import { CategoryScroll, ArticlesScroll } from '@/components';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [ categories, setCategories ] = useState([]);
    const { data: { firstName } } = useAuth();
    const navigate = useNavigate()
  return (
    <div className='p-6'>
        <div className="top">
            <div className="font-bold text-xl">
                Hi {firstName},
            </div>
            <div className="">
              {greet()}
            </div>
        </div>

        <div className="card h-[150px] bg-green-700 rounded-2xl my-6 overflow-hidden">
          <img src="/images/greetings.png" alt="" className="img-cover" />
        </div>

        <div className="bg-gray-100 p-3 rounded-2xl">

          <div onClick={() => navigate('/camera')} className="bg-white hover:bg-green-500 group h-[70px] shadow-sm flex rounded-2xl overflow relative">
            <div className="w-[70px] flex-center p-2">
              <img src="/images/iphone.png" alt="" className="img-contain" />
            </div>
            <div className="p-3" style={{width: "calc(100% - 70px)"}}>
              <div className="font-bold text-lg group-hover:text-white">Plant Check</div>
              <div className="font-medium text-gray-500 text-sm group-hover:text-white">Identify a plant</div>
            </div>
            <div className="absolute top-1/2 right-0 px-0.5 -translate-y-1/2 text-gray-400 group-hover:text-white">
              <ChevronRight size={50} strokeWidth={1}/>
            </div>
          </div>

          <div onClick={() => navigate('/history')} className="bg-white hover:bg-green-500 group h-[70px] shadow-sm flex rounded-2xl overflow relative mt-3">
            <div className="w-[70px] flex-center p-4">
              <img src="/images/diagnosis.png" alt="" className="img-contain" />
            </div>
            <div className="p-3" style={{width: "calc(100% - 70px)"}}>
              <div className="font-bold text-lg group-hover:text-white">History</div>
              <div className="font-medium text-gray-500 text-sm group-hover:text-white ">Past diagnosis of plant</div>
            </div>
            <div className="absolute top-1/2 right-0 px-0.5 -translate-y-1/2 text-gray-400 group-hover:text-white">
              <ChevronRight size={50} strokeWidth={1}/>
            </div>
          </div>

        </div>

        <div className="my-6">
          <CategoryScroll callback={setCategories} />
        </div>

        <div className="my-6">
          <ArticlesScroll categories={categories} />
        </div>

        
    </div>
  )
}

export default Home;