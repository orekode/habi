
import { Book, Boxes, ChevronDown, LayoutDashboard, LeafyGreen, LogOut, Menu, Settings, ShoppingCart, Store, User } from 'lucide-react'
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const links = [
    { name: "Dashboard",    icon: <LayoutDashboard  size={20} strokeWidth={1.8}/>, link: "/admin" },
    { name: "Store",        icon: <Store            size={20} strokeWidth={1.8}/>, subs: [
        {name: "Products",  icon: <LeafyGreen       size={20} strokeWidth={1.8} />, link: "/admin/products" },
        {name: "Categories",icon: <Boxes            size={20} strokeWidth={1.8} />, link: "/admin/categories" },
        {name: "Orders",    icon: <ShoppingCart     size={20} strokeWidth={1.8} />, link: "/admin/orders" },
    ]},
    { name: "Blog",         icon: <Book     size={20} strokeWidth={1.8}/> , subs: [
        {name: "Articles",  icon: <LeafyGreen       size={20} strokeWidth={1.8} />, link: "/admin/articles" },
        {name: "Categories",icon: <LeafyGreen       size={20} strokeWidth={1.8} />, link: "/admin/blog/categories" },
    ]},
    { name: "Log Out",     icon: <LogOut         size={20} strokeWidth={1.8}/>, link: "/" },
];

const navItem = ({ name, icon, subs=[], link}) => {
    const [ show, setShow ] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="">
            <div onClick={() => { if(link) navigate(link); setShow(!show)}}  key={name} className="flex items-center my-1.5 hover:bg-green-600 hover:bg-opacity-60 hover:text-white rounded-xl relative transition-all duration-200">
                <div className="icon w-10 h-10 flex-center">
                    {icon}
                </div>
                <div className="text">
                    {name}
                </div>

                {subs.length > 0 && 
                    <div className={`absolute right-0 top-1/2 px-3 h-full -translate-y-1/2 flex-center ${show && 'rotate-180'}`}>
                        <ChevronDown />
                    </div>
                }
            </div>

            <div className={`${ show ? `h-[${subs.length * 55}px]` : `h-0`}  overflow-hidden bg-slate-200 rounded-2xl bg-opacity-50 ${(subs.length > 0 && show) && 'py-0.5'}`}>
                {subs.map( item => 
                    <div key={item.name} className="scale-95 text-md">
                        {navItem(item)}
                    </div>
                )}
            </div>
        </div>
    );
}

const Admin = () => {
    
  const [ show, setShow ] = useState(false);

  return (
    <div className={`panel ${show && 'active'} flex`}>
        <div className="left h-screen text-slate-800  border-r bg-white">
            <div className="logo h-[100px]  w-[100px] mx-auto border border-slate-500 border-opacity-30 my-3 rounded-full flex-center">
                <img src="/images/logo_rm.png" className="hw-full object-contain" />
            </div>

            <div className="links p-6">
                {links.map( item => 
                    <div key={item.name}>
                        {navItem(item)}
                    </div>
                )}
            </div>
        </div>
        <div className="right h-screen">
            <div className="top shadow p-3 flex items-center justify-between h-[60px]">
                <div onClick={() => setShow(!show)} className="menu flex-center">
                    <Menu />
                </div>

                <div className="flex items-center gap-3">
                    <div className="name text-md">David Shalom</div>
                    <div className="dp h-[35px] w-[35px] rounded-full border flex-center">
                        <User size={20} />
                    </div>
                </div>
            </div>

            <div className="bottom overflow-y-scroll scrollbar-thin p-6" style={{height: 'calc(100vh - 60px)'}}>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Admin