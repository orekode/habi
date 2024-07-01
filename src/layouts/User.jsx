import { Home, Settings, Stethoscope, Store } from 'lucide-react';
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const User = ({children}) => {

  const location = useLocation();

  const navs = [
    {
        icon: <Home />,
        title: "Home",
        link: "/home"
    },
    {
        icon: <Stethoscope />,
        title: "Diagnose",
        link: "/camera"
    },
    {
        icon: <Store />,
        title: "Store",
        link: "/store"
    },
    {
        icon: <Settings />,
        title: "Settings",
        link: "/settings"
    },
  ];

  return (
    <div>
        <div className="top overflow-y-scroll" style={{height: "calc(100vh - 65px)"}}>
            <Outlet />
            {children}
        </div>
        
        <div className="bottom h-[65px] border-t flex items-center">
            {navs.map( item => 
                <Link key={item.name} to={item.link} className={`${item.link.includes(location.pathname) ? "text-green-600" : "text-gray-500"} relative h-full flex-center flex-col gap-1.5 flex-grow`}>
                    <div className="icon">{item.icon}</div>
                    <div className="name text-xs font-semibold">{item.title}</div>
                    {item.link.includes(location.pathname) &&
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-0.5 bg-green-600 rounded-es-xl rounded-ee-xl"></div>
                    }
                </Link>
            )}
        </div>
    </div>
  )
}

export default User