
import { useEffect, useState } from 'react'
import { ImageUpload } from '../../../components/Uploads'
import { Loading, Shimmer } from '../../../components'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Post } from "@/calls/create";
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from "@/calls/reads"
import { useQueryClient } from 'react-query';
import { CategorySelect } from '../../../components/Selects';
import { Trash2 } from 'lucide-react';
import { deleteItem } from '../../../calls/create';




const EditCategory = () => {

    const { id } = useParams();


    const { data } = useData({
        target: "/product/category" ,
        data: {id},
    });

    const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm({
        defaultValues: {
          name: "",
        }
    });

    const [ form, setForm ] = useState({});

    const [ image, setImage ] = useState();

    const [ parent, setParent ] = useState(null);

    const [ load, setLoad ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setForm(data);
    }, [data]);

    const queryClient = useQueryClient();

    const handleCategory = async (data) => {
        try {
            setLoad(true);

            if(image)  data["image"] = image;
            if(parent) data["parent"] = parent;

            let formData = new FormData();

            Object.keys(data).forEach( key => formData.append(key, data[key]));

            formData.append('id', id);
            formData.append('_method', "PUT");

            const response = await Post('/product/category', formData, '', {
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
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'System Busy',
                text: 'please try again later',
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
            <div className="max-w-[200px] mx-auto">
                <ImageUpload callback={setImage} preview={data?.image} />
            </div>

            <form onSubmit={handleSubmit(handleCategory)} className='mx-auto w-max mt-3'>
                <input
                    {...register("name", {
                        required: {
                        value: true,
                        message: "Please provide a product name"
                        }
                    })}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    value={form?.name}
                    type="text"
                    placeholder='Category Name' 
                    className='border p-3 rounded-2xl w-full'  
                />

                <CategorySelect callback={setParent} init={data?.parent}/>

                <div className="flex items-center gap-1 mt-6">
                    <button onClick={checkValues} className='bg-green-500 p-3 rounded-2xl border-green-600 text-center w-full hover:text-white hover:font-medium active:bg-green-600'>Update Category</button>
                    <button 
                        type='button' 
                        onClick={() => deleteItem({ 
                            target: "product_categories",
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



export default EditCategory