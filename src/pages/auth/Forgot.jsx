import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react'

import { useForm } from 'react-hook-form';
import Loading from '@/components/Loading';
import { signin } from '@/calls/auth';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp } from '@/calls/auth';
import { useAuth } from '@/store/auth';

const Forgot = () => {
  const [ load, setLoad ] = useState(false);
  const [ visible, setVisible ] = useState(false);
  const { setData } = useAuth();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm({
    defaultValues: {
      number: "",
    }
  });

  const login = async (data) => {
    try {
      setLoad(true);

        let send = await sendOtp(data.number);
        setData({number: data.number});
        
        if(send) {
          navigate("/verify2");
        }
        else {
          Swal.fire({
            icon: "error",
            title: "System Busy",
            text: "Please try again later"
          });
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

        <h1 className="font-medium text-2xl text-green-900 text-center">Password Recovery</h1>
        <p className="text-center max-w-[300px] text-xs mt-1 text-gray-400">provide your phone number and click the button bellow to recieve a verification code.</p>

        <form onSubmit={handleSubmit(login)} className="w-full p-7 -mt-3">
            <div className="inputs">
              <div className="input flex flex-col">
                {/* <label htmlFor="number" className="font-normal text-xs my-1.5 text-gray-600">Enter Your Number</label> */}
                <input 
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Please provide your phone number"
                    }
                  })} 
                  type="tel" 
                  className="bg-gray-200 rounded-2xl p-2.5 outline-green-600" 
                />
              </div>

              <div className="my-7">
                <button onClick={checkValues} className='btn-md text-sm'>Send Verification Code</button>
              </div>

              <div className="mt-12 text-xs text-center">
                Remember your password? <Link to="/" className='text-green-400 font-medium'>Log In</Link>
              </div>

            </div>
        </form>

    </div>
  )
}

export default Forgot