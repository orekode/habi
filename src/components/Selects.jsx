
import { useEffect, useState } from 'react'
import { useData } from "@/calls/reads"
import { Shimmer } from '.';


export const CategorySelect = ({ callback=()=>{}, init }) => {
    const [ categories, setCategories ] = useState([]);
    const [ category, setCategory ] = useState(null);
    const [ page, setPage ]  = useState(1);
    const [ show, setShow ] = useState(false);

    const { data } = useData({
        target: "/product/categories",
        data: {page}
    });

    const toggle = (id) => {
        if(categories.includes(id)) setCategories(categories.filter( item => item != id));
            else setCategories([...categories, id]);
    }

    useEffect(() => {
        callback(categories)
    }, [categories]);

    useEffect(() => {
        if(category) callback(category.id);
    }, [category]);

    useEffect(() => {
        if(init) setCategory(init);
    }, [init])

    return (
        <div>
            <button type="button" onClick={() => setShow(!show)} className=' font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600 w-full my-3'>{ category ? category.name : "Select Parent Category" }</button>

            {show && 
                <div className="fixed top-0 left-0 hw-screen pt-12 bg-black bg-opacity-30">
                    <div onClick={() => setShow(!show)} className="absolute top-0 left-0 hw-full"></div>
                    <div className="relative z-10 bg-white max-w-[300px] min-h-[150px] max-h-[80vh] overflow-y-scroll rounded-3xl scrollbar-thin mx-auto p-3">

                        {data && data.map( item => 
                            <div onClick={() => {setCategory(item); setShow(!show);}} className="rounded-2xl hover:bg-green-400 hover:text-white px-3 py-2 flex border items-center gap-3 my-3 relative overflow-hidden">
                                <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                                    <img src={item.image} className="object-cover hw-full" />
                                </div>
                                <div className="name font-medium text-center">{item.name}</div>
                            </div>
                        )}

                        {(!data) && Array.from({length: 10}, (_, idx) => 
                            <div className="rounded-2xl hover:bg-green-400 hover:text-white px-3 py-2 flex border items-center gap-3 my-3 relative overflow-hidden">
                                <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                                    <img src="/images/category.png" className="object-cover hw-full" />
                                </div>
                                <div className="name font-medium text-center"> This is the name</div>
                                <Shimmer />
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <button type="button" onClick={() => setPage( page - 1 < 1 ? 1 : page - 1)} className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>Prev</button>
                            <button type="button" onClick={() => setPage( page + 1 )}className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>Next</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}


export const CategoriesSelect = ({ callback=()=>{}, init }) => {
    const [ categories, setCategories ] = useState([]);
    const [ page, setPage ]  = useState(1);
    const [ show, setShow ] = useState(false);

    const { data } = useData({
        target: "/product/categories",
        data: {page}
    });

    const toggle = (id) => {
        if(categories.includes(id)) setCategories(categories.filter( item => item != id));
            else setCategories([...categories, id]);
    }

    useEffect(() => {
        callback(categories)
    }, [categories]);

    useEffect(() => {
        callback(categories);
    }, [categories]);

    useEffect(() => {
        if(init) setCategories(init);
    }, [init])

    return (
        <div>
            <button type="button" onClick={() => setShow(!show)} className=' font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600 w-full my-3'>{ categories.length > 0 ? ` ${categories.length} ${categories.length > 1 ? 'categories' : 'category'} selected` : "Select Parent Category" }</button>

            {show && 
                <div className="fixed top-0 left-0 hw-screen pt-12 bg-black bg-opacity-30">
                    <div onClick={() => setShow(!show)} className="absolute top-0 left-0 hw-full"></div>
                    <div className="relative z-10 bg-white max-w-[300px] min-h-[150px] max-h-[80vh] overflow-y-scroll rounded-3xl scrollbar-thin mx-auto p-3">

                        {data && data.map( item => 
                            <div onClick={() => {toggle(item.id)}} className={`${categories.includes(item.id) && "bg-green-400 text-white "} rounded-2xl hover:bg-green-400 hover:text-white px-3 py-2 flex border items-center gap-3 my-3 relative overflow-hidden`}>
                                <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                                    <img src={item.image} className="object-cover hw-full" />
                                </div>
                                <div className="name font-medium text-center">{item.name}</div>
                            </div>
                        )}

                        {(!data) && Array.from({length: 10}, (_, idx) => 
                            <div className="rounded-2xl hover:bg-green-400 hover:text-white px-3 py-2 flex border items-center gap-3 my-3 relative overflow-hidden">
                                <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                                    <img src="/images/category.png" className="object-cover hw-full" />
                                </div>
                                <div className="name font-medium text-center"> This is the name</div>
                                <Shimmer />
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <button type="button" onClick={() => setPage( page - 1 < 1 ? 1 : page - 1)} className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>Prev</button>
                            <button type="button" onClick={() => setPage( page + 1 )}className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>Next</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export const ArticleCategoriesSelect = ({ callback=()=>{}, init }) => {
    const [ categories, setCategories ] = useState([]);
    const [ page, setPage ]  = useState(1);
    const [ show, setShow ] = useState(false);

    const { data } = useData({
        target: "/categories",
        data: {page}
    });

    const toggle = (id) => {
        if(categories.includes(id)) setCategories(categories.filter( item => item != id));
            else setCategories([...categories, id]);
    }

    useEffect(() => {
        callback(categories)
    }, [categories]);

    useEffect(() => {
        callback(categories);
    }, [categories]);

    useEffect(() => {
        if(init) setCategories(init);
    }, [init])

    return (
        <div>
            <button type="button" onClick={() => setShow(!show)} className=' font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600 w-full my-3'>{ categories.length > 0 ? ` ${categories.length} ${categories.length > 1 ? 'categories' : 'category'} selected` : "Select Parent Category" }</button>

            {show && 
                <div className="fixed top-0 left-0 hw-screen pt-12 bg-black bg-opacity-30">
                    <div onClick={() => setShow(!show)} className="absolute top-0 left-0 hw-full"></div>
                    <div className="relative z-10 bg-white max-w-[300px] min-h-[150px] max-h-[80vh] overflow-y-scroll rounded-3xl scrollbar-thin mx-auto p-3">

                        {data && data.map( item => 
                            <div onClick={() => {toggle(item.id)}} className={`${categories.includes(item.id) && "bg-green-400 text-white "} rounded-2xl hover:bg-green-400 hover:text-white px-3 py-2 flex border items-center gap-3 my-3 relative overflow-hidden`}>
                                <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                                    <img src={item.image ?? "/images/category.png"} className="object-cover hw-full" />
                                </div>
                                <div className="name font-medium text-center">{item.name}</div>
                            </div>
                        )}

                        {(!data) && Array.from({length: 10}, (_, idx) => 
                            <div className="rounded-2xl hover:bg-green-400 hover:text-white px-3 py-2 flex border items-center gap-3 my-3 relative overflow-hidden">
                                <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                                    <img src="/images/category.png" className="object-cover hw-full" />
                                </div>
                                <div className="name font-medium text-center"> This is the name</div>
                                <Shimmer />
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <button type="button" onClick={() => setPage( page - 1 < 1 ? 1 : page - 1)} className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>Prev</button>
                            <button type="button" onClick={() => setPage( page + 1 )}className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>Next</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}