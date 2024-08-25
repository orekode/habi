import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react'

import { useForm } from 'react-hook-form';
import Loading from '@/components/Loading';
import { signin } from '@/calls/auth';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '@/calls/auth';
import { useAuth } from '@/store/auth';

const Forgot = () => {
  const [ load, setLoad ] = useState(false);
  const [ formErrors, setErrors ] = useState({});
  const [ visible, setVisible ] = useState(false);
	const { data: { number, otp }} = useAuth();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm({
    defaultValues: {
      password_confirmation: "",
      password: "",
    }
  });

  const login = async (data) => {
    try {
      setLoad(true);

      
        let send = await resetPassword({number, ...data, otp });
        console.clear();
        console.log(send, "i got here");
        
        if(send.status == "200" || send.status == "201") {
          Swal.fire({
            icon: "success",
            title: "Password Reset Successful",
          });
          navigate("/");
        }
        else {
          if(!send.data.errors) 
            Swal.fire({
              icon: "error",
              title: "System Busy",
              text: "We are unable to reset your password at this time, please try again later",
            });
          else if(send.data.errors.otp || send.data.errors.number) {

            Swal.fire({
              icon: "error",
              title: "Number Verification",
              text: "We are unable to verify your account, please provide your number and try again",
            });
            navigate('/forgot')
          }
          else
            setErrors(send.data.errors);
        }
        
        setLoad(false);
    }
    catch(e) {
      console.log(e);
      return false;
    }
  }

  const checkValues = () => {
    let err = Object.values(errors);

    if(err.length > 0 && !isValid && isSubmitted) {
      err.map((err) => toast.error(err.message))
    }
  }

  return (
    <div className="fixed-screen flex-center flex-col">

        <Loading load={load} />

        <div className="logo h-[100px] w-[100px]">
            <img src="/images/logo_img_rm.png" className="img-cover"/>
        </div>

        <h1 className="font-medium text-2xl text-green-900">Password Reset</h1>

        <form onSubmit={handleSubmit(login)} className="w-full p-7">
            <div className="inputs">
              <div className="input flex flex-col">
                <label htmlFor="password" className="font-normal text-xs my-1.5 text-gray-600">Password</label>
                <input 
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please provide your password"
                    }
                  })} 
                  type="password" 
                  className="bg-gray-200 rounded-2xl p-2.5 outline-green-600" 
                />
                <div className="text-xs font-medium text-red-500 mt-1.5">{formErrors?.password}</div>
              </div>

              <div className="input flex flex-col mt-3">
                <label htmlFor="password_confirmation" className="font-normal text-xs my-1.5 text-gray-600">Confirm Password</label>
                <input 
                  {...register("password_confirmation", {
                    required: {
                      value: true,
                      message: "Please confirm your password"
                    }
                  })} 
                  type="password" 
                  className="bg-gray-200 rounded-2xl p-2.5 outline-green-600" 
                />
                <div className="text-xs font-medium text-red-500 mt-1.5">{formErrors?.password_confirmation}</div>
                </div>
              
              <div className="my-7">
                <button onClick={checkValues} className='btn-md text-sm'>Reset Password</button>
              </div>
            </div>
        </form>

    </div>
  )
}

export default Forgot