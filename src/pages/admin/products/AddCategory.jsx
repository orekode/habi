
import { useState } from 'react'
import { ImageUpload } from '../../../components/Uploads'
import { Loading } from '../../../components'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Post } from "@/calls/create";
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { CategorySelect } from '../../../components/Selects';



const AddCategory = () => {

    const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm({
        defaultValues: {
          name: "",
        }
    });

    const [ image, setImage ] = useState();

    const [ load, setLoad ] = useState(false);

    const [ parent, setParent ] = useState(null);

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const handleCategory = async (data) => {
        try {
            setLoad(true);

            if(image) data["image"] = image;
            if(parent) data["parent"] = parent;

            let formData = new FormData();

            Object.keys(data).forEach( key => formData.append(key, data[key]));

            const response = await Post('/product/category', formData, '', {
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
                <ImageUpload callback={setImage} />
            </div>

            <form onSubmit={handleSubmit(handleCategory)} className='mx-auto w-max mt-3'>
                <input
                    {...register("name", {
                        required: {
                        value: true,
                        message: "Please provide a product name"
                        }
                    })}
                    type="text"
                    placeholder='Category Name' 
                    className='border p-3 rounded-2xl w-full'  
                />

                <CategorySelect callback={setParent} />


                <button onClick={checkValues} className='bg-green-500 p-3 rounded-2xl border-green-600 text-center w-full mt-6 hover:text-white hover:font-medium active:bg-green-600'>Create Category</button>
        
            </form>
        </div>
    )
}

export default AddCategory