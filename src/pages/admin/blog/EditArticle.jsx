import { Image, Trash2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Post } from '@/calls/create';
import { Loading } from '@/components';
import { ImageUpload } from '../../../components/Uploads';
import { ArticleCategoriesSelect } from '../../../components/Selects';
import Swal from 'sweetalert2';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from "@/calls/reads"
import { deleteItem } from '../../../calls/create';

const EditArticle = () => {

    const { id } = useParams();

    const { data } = useData({
        target: "/article" ,
        data: {id},
    });

    const [ form, setForm ] = useState({image: []});

    const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm({
        defaultValues: {
          title: "",
          desc: "",
          content: "",
        }
    });

    const [ image, setImage ] = useState();

    const [ load, setLoad ] = useState(false);

    const [ categories, setCategories ] = useState([]);

    const queryClient = useQueryClient();

    const navigate = useNavigate();


    const handleArticle = async (data) => {
        try {
            setLoad(true);


            if(image) data["image"] = image;
            if(categories) data["categories"] = categories;

            let formData = new FormData();

            Object.keys(data).forEach( key => {
                if(key == "categories") {
                    data[key].forEach((item) => {
                        formData.append(`${key}[]`, item)
                    });
                }
                else formData.append(key, data[key])
            });

            formData.append("id", id);
            formData.append("_method", "PUT");

            console.log(data);
            
            const response = await Post('/article', formData, '', {
                "Content-Type": "multipart/form-data"
            });

            if (response) {
                Swal.fire({
                    icon: "success",
                    title: "Update Successful"
                });

                queryClient.invalidateQueries();

                navigate(-1);
            }

            setLoad(false);
        }
        catch(error) {
            Swal.fire({
                icon: 'error',
                title: 'System Busy',
                text: 'Please try again later'
            });
        }
    }

    useEffect(() => {
        if(data) setForm(data);
    }, [data]);

  return (
    <div>
        <Loading load={load}/>
        <form onSubmit={handleSubmit(handleArticle)} className="max-w-[700px] mx-auto">
            <div className="w-[300px] mb-6 mx-auto">
                <ImageUpload callback={(image) => setImage(image)} preview={form.image} />
            </div>
            <div className="input flex flex-col mb-3">
                <label htmlFor="name" className="text-sm text-gray-500 font-medium mb-0.5">Article Name</label>
                <input
                    {...register("title")}
                    value={form.title}
                    onChange={(e) => setForm({...form, title: e.target.value})}
                    type="text" 
                    name="title" 
                    placeholder='Title' 
                    className='border p-3 rounded-2xl' 
                />
            </div>

            <div className="input flex flex-col my-4">
                <label htmlFor="desc" className="text-sm text-gray-500 font-medium mb-0.5">Description</label>
                <textarea
                    {...register("desc")}
                    name="desc"
                    value={form.desc}
                    onChange={(e) => setForm({...form, desc: e.target.value})}
                    type="text" 
                    placeholder='Type your description here...' 
                    className='border p-3 rounded-2xl h-[150px]' 
                />
            </div>

            <div className="input flex flex-col my-4">
                <ArticleCategoriesSelect callback={setCategories} init={form.categories}/>
            </div>

            <div className="input flex flex-col my-4">
                <label htmlFor="content" className="text-sm text-gray-500 font-medium mb-0.5">Content</label>
                <textarea
                    {...register("content")}
                    name="content"
                    value={form.content}
                    onChange={(e) => setForm({...form, content: e.target.value})}
                    type="text" 
                    placeholder='Type your content here...' 
                    className='border p-3 rounded-2xl h-[500px]' 
                />
            </div>

            <div className="flex items-center gap-1 mt-6">
                <button className='bg-green-500 p-3 rounded-2xl border-green-600 text-center w-full hover:text-white hover:font-medium active:bg-green-600'>Update Article</button>
                <button 
                    type='button' 
                    onClick={() => deleteItem({ 
                        target: "blog_articles",
                        id,
                        callback: (state) => {
                            if (!state) navigate(-1);
                                
                            setLoad(state);
                        }
                    })} 
                    className="h-[55px] w-[55px] rounded-2xl bg-red-500 text-white flex-center"
                >
                    <Trash2 />
                </button>
            </div>  
        </form>
    </div>
  )
}

export default EditArticle