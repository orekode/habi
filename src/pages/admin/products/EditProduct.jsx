import { Image, Trash2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Post } from '@/calls/create';
import { Loading } from '@/components';
import { ImageUpload } from '../../../components/Uploads';
import { CategoriesSelect } from '../../../components/Selects';
import Swal from 'sweetalert2';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from "@/calls/reads"
import { deleteItem } from '../../../calls/create';

const EditProduct = () => {

    const { id } = useParams();

    const { data } = useData({
        target: "/product/product" ,
        data: {id},
    });

    const [ form, setForm ] = useState({images: []});

    const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm({
        defaultValues: {
          name: "",
          price: "",
          short_desc: "",
        }
    });

    const [ images, setImages ] = useState({});

    const [ removedImages, setRemovedImages ] = useState([]);

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
    }

    const handleProduct = async (data) => {
        try {
            setLoad(true);


            if(images) data["images"] = Object.values(images);
            if(categories) data["categories"] = categories;

            let formData = new FormData();

            Object.keys(data).forEach( key => {
                if(key == "images" || key == "categories") {
                    data[key].forEach((item) => {
                        formData.append(`${key}[]`, item)
                    });
                }
                else formData.append(key, data[key])
            });

            removedImages.forEach((item) => {
                formData.append(`removed_images[]`, item)
            });

            formData.append("id", id);
            formData.append("_method", "PUT");

            console.log(data);
            
            const response = await Post('/product', formData, '', {
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

    const checkValues = () => {
        let err = Object.values(errors);
    
        if(err.length > 0 && !isValid && isSubmitted) {
          err.map((err) => toast.error(err.message))
        }
    }

    useEffect(() => {
        if(data) setForm(data);
    }, [data]);

  return (
    <div>
        <Loading load={load}/>
        <form onSubmit={handleSubmit(handleProduct)} className="max-w-[700px] mx-auto">
            <div className="input flex flex-col mb-3">
                <label htmlFor="name" className="text-sm text-gray-500 font-medium mb-0.5">Product Name</label>
                <input
                    {...register("name")}
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    type="text" 
                    name="name" 
                    placeholder='Product Name' 
                    className='border p-3 rounded-2xl' 
                />
            </div>

            <div className="input flex flex-col my-4">
                <label htmlFor="price" className="text-sm text-gray-500 font-medium mb-0.5">Product Price</label>
                <input
                    {...register("price")}
                    name="price"
                    value={form.price}
                    onChange={(e) => setForm({...form, price: e.target.value})}
                    type="text" 
                    placeholder='40.00'
                    className='border p-3 rounded-2xl' 
                />
            </div>

            <div className="input flex flex-col my-4">
                <CategoriesSelect callback={setCategories} init={form.categories}/>
            </div>

            <div className="input flex flex-col my-4">
                <label htmlFor="short_desc" className="text-sm text-gray-500 font-medium mb-0.5">Product Description</label>
                <textarea
                    {...register("short_desc")}
                    name="short_desc"
                    value={form.short_desc}
                    onChange={(e) => setForm({...form, short_desc: e.target.value})}
                    type="text" 
                    placeholder='Type your description here...' 
                    className='border p-3 rounded-2xl' 
                />
            </div>

            <div className="input flex flex-col gap-1.5">
                <label htmlFor="images" className="text-sm text-gray-500 font-medium">Click a box to upload an image</label>

                <div className="images grid grid-cols-3 gap-3">
                    {form.images.map((image, idx) => 
                        <ImageUpload key={idx} callback={(image) => handleImage(image, idx)} preview={image.image} removeCallback={() => setRemovedImages([...removedImages, image.id])}/>
                    )}
                    {Array.from({length: 6 - (form.images.length ?? 0)}, (_, idx) => 
                        <ImageUpload key={idx} callback={(image) => handleImage(image, idx)}/>
                    )}
                </div>
            </div>


            <div className="flex items-center gap-1 mt-6">
                <button className='bg-green-500 p-3 rounded-2xl border-green-600 text-center w-full hover:text-white hover:font-medium active:bg-green-600'>Update Product</button>
                <button 
                    type='button' 
                    onClick={() => deleteItem({ 
                        target: "products",
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

export default EditProduct