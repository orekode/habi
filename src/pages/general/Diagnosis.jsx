
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useNavigate } from "react-router-dom";
import User from "@/layouts/User"
import {
  ChevronDownIcon,
} from '@heroicons/react/16/solid'
import { ChevronLeft, Volume, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
const Diagnosis = ({diagnosis, callback=()=>{}}) => {

  const [allVoices, setAllVoices] = useState(window.speechSynthesis.getVoices());
  const [selectedVoice, setSelectedVoice] = useState(null);

  const navigate = useNavigate();
  const speakText = (text) => {
    if (window.speechSynthesis.speaking){
      window.speechSynthesis.cancel()
      return
    }
    if (window.speechSynthesis.paused){
      window.speechSynthesis.resume
      return
    }
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);
        setAllVoices(speechSynthesis.getVoices());
        speech.voice = selectedVoice;
        window.speechSynthesis.speak(speech);
    }
};

useEffect(() => {
  setAllVoices(window.speechSynthesis.getVoices().slice(0, 15)); // max 15 voices
})

  return (
    <div className="fixed top-0 left-0 h-screen w-screen overflow-y-scroll">
      <User>
        <div className='p-6'>
            <div className="top flex items-center justify-between mb-5">
              <div className="flex items-center gap-1">
                <div onClick={()=>callback(false)} className="icon rounded-full h-[30px] w-[30px]  text-xs flex-center bg-white bg-opacity0 border border-gray-400 text-gray-500">
                 { <ChevronLeft />}
                </div>
                <span className='font-bold text-lg'>Diagnosis</span>
              </div>


              <div className="flex-center gap-2">{
                window.speechSynthesis.speaking ? <Volume size={40} className="hover:bg-slate-200 bg-slate-200 p-2 rounded-full" onClick={()=>window.speechSynthesis.cancel()} /> : <Volume2
                size={40}
                className=" hover:bg-slate-200 p-2 rounded-full"
                onClick={()=>speakText(diagnosis?.content)}
                />
              }
                 <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
         {selectedVoice?.lang ?? "Select Voice"}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {
            allVoices.map(voice => (
              <MenuItem
                key={voice.name}
                onClick={() => setSelectedVoice(voice)}
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  {voice.name}
                </a>
              </MenuItem>
            ))
          }
        </div>
      </MenuItems>
    </Menu>
              </div>

              
            </div>
            <div className="image h-[250px] rounded-xl overflow-hidden">
              <img src={diagnosis?.image} className="hw-full" />
            </div>
            <div className="mt-6 mb-2 font-bold text-xl">{diagnosis?.title}</div>
            <p className='text-gray-800 leading-loose'>{diagnosis?.content}</p>

            {(diagnosis.buy_link && diagnosis.buy_link !== "nan") && 
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