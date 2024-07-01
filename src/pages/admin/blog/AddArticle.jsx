import { Image, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Post } from '@/calls/create';
import { Loading } from '@/components';
import { ImageUpload } from '../../../components/Uploads';
import { ArticleCategoriesSelect } from '../../../components/Selects';
import Swal from 'sweetalert2';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AddArticle = () => {

    const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm({
        defaultValues: {
          title: "",
          content: "",
          desc: "",
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

            console.log(data);

            Object.keys(data).forEach( key => {
                if(key == "categories") {
                    data[key].forEach((item) => {
                        formData.append(`${key}[]`, item)
                    });
                }
                else formData.append(key, data[key])
            });
            
            const response = await Post('/article', formData, '', {
                "Content-Type": "multipart/form-data"
            });

            if (response) {
                Swal.fire({
                    icon: "success",
                    title: "Create Successful"
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

    const checkValues = () => {
        let err = Object.values(errors);
    
        if(err.length > 0 && !isValid && isSubmitted) {
          err.map((err) => toast.error(err.message))
        }
    }

  return (
    <div>
        <Loading load={load}/>
        <form onSubmit={handleSubmit(handleArticle)} className="max-w-[700px] mx-auto">
            <div className="w-[300px] mb-6 mx-auto">
                <ImageUpload callback={(image) => setImage(image)} />
            </div>

            <div className="input flex flex-col mb-3">
                <label htmlFor="name" className="text-sm text-gray-500 font-medium mb-0.5">Title</label>
                <input
                    {...register("title", {
                        required: {
                          value: true,
                          message: "Please provide a title"
                        }
                    })}

                    type="text" 
                    name="title" 
                    placeholder='Title' 
                    className='border p-3 rounded-2xl' 
                />
            </div>

            <div className="input flex flex-col my-4">
                <label htmlFor="desc" className="text-sm text-gray-500 font-medium mb-0.5">Description</label>
                <textarea
                    {...register("desc", {
                        required: {
                          value: true,
                          message: "Please provide a simple description"
                        }
                    })}
                    type="text" 
                    placeholder='Type your description here...' 
                    className='border p-3 rounded-2xl min-h-[150px]' 
                />
            </div>

            <div className="input flex flex-col my-4">
                <ArticleCategoriesSelect callback={setCategories}/>
            </div>

            <div className="input flex flex-col my-4">
                <label htmlFor="content" className="text-sm text-gray-500 font-medium mb-0.5">Content</label>
                <textarea
                    {...register("content", {
                        required: {
                          value: true,
                          message: "Please provide some content"
                        }
                    })}
                    type="text" 
                    placeholder='Type your content here...' 
                    className='border p-3 rounded-2xl min-h-[500px]' 
                />
            </div>

            <button onClick={checkValues} className='bg-green-500 p-3 rounded-2xl border-green-600 text-center w-full mt-6 hover:text-white hover:font-medium active:bg-green-600'>Create Article</button>
        </form>
    </div>
  )
}

export default AddArticle