
import { ArticlesScroll } from "@/components";
import { useNavigate } from "react-router-dom";
import User from "@/layouts/User"
import { ChevronLeft, Volume, Volume2 } from "lucide-react";
const Diagnosis = ({diagnosis, callback=()=>{}}) => {

  console.log(diagnosis);

  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 h-screen w-screen overflow-y-scroll">
      <User>
        <div className='p-6'>
            <div className="top flex items-center justify-between mb-5">
              <div className="flex items-center gap-1">
                <div onClick={()=>callback(false)} className="icon rounded-full h-[30px] w-[30px]  text-xs flex-center bg-white bg-opacity0 border border-gray-400 text-gray-500">
                  <ChevronLeft />
                </div>
                <span className='font-bold text-lg'>Diagnosis</span>
              </div>


              <div className="flex-center h-[40px] w-[40px] border rounded-full">
                <Volume2 />
              </div>

              
            </div>
            <div className="image h-[250px] rounded-xl overflow-hidden">
              <img src={diagnosis?.image} className="hw-full" />
            </div>
            <div className="mt-6 mb-2 font-bold text-xl">{diagnosis?.title}</div>
            <p className='text-gray-800 leading-loose'>{diagnosis?.content}</p>

            {diagnosis.buy_link && 
              <div className="my-6">
                <p className="italic font-medium">{diagnosis.suppliment_name ?? "We have a product that"} could help you treat or prevent this</p>
                <button className="bg-green-500 text-white w-full text-center px-3 py-2 mt-3 rounded-xl" onClick={() => location.href=diagnosis.buy_link }>Click To Buy</button>
              </div>
            }
        </div>
      </User>
    </div>
  )
}

export default Diagnosis