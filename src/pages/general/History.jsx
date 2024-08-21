
import { ChevronLeft, ChevronRight, Eye, LeafyGreen, TreeDeciduous, Trees } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useData } from "@/calls/reads";
import { useAuth } from "@/store/auth";
import Diagnosis from './Diagnosis';

const History = () => {

  const [page, setPage] = useState(1);
  const [diagnoses, setDiagnoses] = useState([]);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [diagnosis, setDiagnosis] = useState({});
  const { data: { token } } = useAuth();

  const { data } = useData({
    target: "/diagnoses",
    data: { page }
  }, token);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) setDiagnoses(data);
  }, [data]);

  if(showDiagnosis) return <Diagnosis diagnosis={diagnosis} callback={setShowDiagnosis} />

  return (
    <div className='p-6'>
      <div className="top flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <div onClick={() => navigate(-1)} className="icon rounded-full h-[30px] w-[30px]  text-xs flex-center bg-white bg-opacity0 border border-gray-400 text-gray-500">
            <ChevronLeft />
          </div>
          <span className='font-bold text-lg'>History</span>
        </div>

        <button onClick={() => navigate('/camera')} className="border-2 border-green-500 text-green-600 hover:bg-green-500 active:bg-green-600 hover:text-white rounded-2xl px-3 py1.5 text-center">
          Diagnose
        </button>
      </div>


      <div className="mt-6">
        {data && diagnoses.map(item =>
          <div onClick={() => {
            setDiagnosis(item);
            setShowDiagnosis(true);
          }} key={item.id} className="my-2 relative  shadow rounded-xl overflow-hidden">
            <div className="image h-[250px] overflow-hidden rounded-xl">
              <img src={item.image} className="object-cover h-full w-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-max p-1.5 px-3 font-semibold bg-white z-10">{item.title}</div>
            <div className="absolute top-0 left-0 h-full w-full flex-center bg-black bg-opacity-20 hover:bg-green-500 hover:bg-opacity-20 text-white">
              <Eye  size={70} strokeWidth={0.5}/>
            </div>
          </div>
        )}
      </div>

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

export default History