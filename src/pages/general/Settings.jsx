import { ChevronLeft, User } from 'lucide-react'
import React from 'react'
import { useAuth } from '@/store/auth';
import { Link } from 'react-router-dom'

const Settings = () => {

     const { data: { firstName, lastName } } = useAuth();
     console.log(useAuth())
    const settings = [
        {
            name: 'FAQQ'
        },
        {
            name: 'Contact Us'
        },
        {
            name: 'Terms Of Use'
        },
        {
            name: 'Privacy Policy'
        },
    ];

  return (
    <div>
        <div className="fixed top-0 left-0 p-3 z-20">
            <Link to="/home">
                <div className="h-[40px] w-[40px] rounded-full border flex-center text-gray-500 bg-white">
                    <ChevronLeft />
                </div>
            </Link>
        </div>

        <div className="top flex-center flex-col border-b h-[30vh]">
            <div className="h-[120px] w-[120px] border-2 rounded-full flex-center">
                <User size={50}/>
            </div>
            <div className="font-semibold mt-1.5">{firstName+ " " + lastName}</div>
        </div>

        <div className="contents">
            {settings.map( item => 
                <div className="tab font-semibold text-lg border-b py-3 px-6">
                    {item.name}
                </div>
            )}
        </div>

        <div className="btns mt-3 p-6">
            <Link to={'/'}>
                <button className="btn-outline"> Log Out</button>
            </Link>
        </div>
    </div>
  )
}

export default Settings
