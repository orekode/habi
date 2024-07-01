import { Image, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Post } from '@/calls/create';
import { Loading } from '@/components';
import { ImageUpload } from '@/components/Uploads';
import { CategoriesSelect } from "@/components/Selects"
import Swal from 'sweetalert2';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm({
        defaultValues: {
          name: "",
          price: "",
          short_desc: "",
        }
    });

    const [ images, setImages ] = useState({});

    const [ load, setLoad ] = useState(false);

    const [ categories, setCategories ] = useState([]);

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const handleImage = (image, idx) => {

        if(image) {
            images[idx] = image;
        }
        else {
            delete images[idx];
        }

        setImages(images);
        console.log(images);
    }

    const handleProduct = async (data) => {
        try {
            setLoad(true);


            if(images) data["images"] = Object.values(images);
            if(categories) data["categories"] = categories;

            let formData = new FormData();

            console.log(data);

            Object.keys(data).forEach( key => {
                if(key == "images" || key == "categories") {
                    data[key].forEach((item) => {
                        formData.append(`${key}[]`, item)
                    });
                }
                else formData.append(key, data[key])
            });
            
            const response = await Post('/product', formData, '', {
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
        <form onSubmit={handleSubmit(handleProduct)} className="max-w-[700px] mx-auto">
            <div className="input flex flex-col mb-3">
                <label htmlFor="name" className="text-sm text-gray-500 font-medium mb-0.5">Product Name</label>
                <input
                    {...register("name", {
                        required: {
                          value: true,
                          message: "Please provide a product name"
                        }
                    })}

                    type="text" 
                    name="name" 
                    placeholder='Product Name' 
                    className='border p-3 rounded-2xl' 
                />
            </div>

            <div className="input flex flex-col my-4">
                <label htmlFor="price" className="text-sm text-gray-500 font-medium mb-0.5">Product Price</label>
                <input
                    {...register("price", {
                        required: {
                          value: true,
                          message: "Please provide a product price"
                        }
                    })}

                    type="text" 
                    placeholder='40.00'
                    className='border p-3 rounded-2xl' 
                />
            </div>

            <div className="input flex flex-col my-4">
                <CategoriesSelect callback={setCategories}/>
            </div>

            <div className="input flex flex-col my-4">
                <label htmlFor="short_desc" className="text-sm text-gray-500 font-medium mb-0.5">Product Description</label>
                <textarea
                    {...register("short_desc", {
                        required: {
                          value: true,
                          message: "Please provide a product description"
                        }
                    })}
                    type="text" 
                    placeholder='Type your description here...' 
                    className='border p-3 rounded-2xl' 
                />
            </div>

            <div className="input flex flex-col gap-1.5">
                <label htmlFor="images" className="text-sm text-gray-500 font-medium">Click a box to upload an image</label>

                <div className="images grid grid-cols-3 gap-3">
                    {Array.from({length: 6}, (_, idx) => 
                        <ImageUpload key={idx} callback={(image) => handleImage(image, idx)} />
                    )}
                </div>
            </div>

            <button onClick={checkValues} className='bg-green-500 p-3 rounded-2xl border-green-600 text-center w-full mt-6 hover:text-white hover:font-medium active:bg-green-600'>Create Product</button>
        </form>
    </div>
  )
}

export default AddProduct