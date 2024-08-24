import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react'

import { useForm } from 'react-hook-form';
import Loading from '@/components/Loading';
import { signin } from '@/calls/auth';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '@/calls/auth';
import { useAuth } from '@/store/auth';

const Login = () => {
  const [ load, setLoad ] = useState(false);
  const [ visible, setVisible ] = useState(false);
  const { setData } = useAuth();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm({
    defaultValues: {
      number: "",
      password: "",
    }
  });

  const login = async (data) => {
    try {
      setLoad(true);

      const result = await signin(data);

      if(!result) {
        setLoad(false);
         Swal.fire({
          icon: "error",
          title: "Invalid Credentials"
        });
        setLoad(false);

        return false;

      }

      if(result == "signup") {
        let send = await sendOtp(data.number);
        setData({number: data.number});
        
        if(send) {
          navigate("/verify");
        }
        else {
          Swal.fire({
            icon: "error",
            title: "System Busy",
            text: "Please try again later"
          });
        }
        
        setLoad(false);

        return false
      }
      

      setData({token: result.token, ...result.data, number: data.number, loggedIn: true, role: data.number == "0508809987" ? "admin": "user"});
      navigate('/admin')

      setLoad(false);

      return false;
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
            <img src="/images/logo.png" className="img-cover"/>
        </div>

        <form onSubmit={handleSubmit(login)} className="w-full p-7">
            <div className="inputs">
              <div className="input flex flex-col">
                <label htmlFor="number" className="font-normal text-xs my-1.5 text-gray-600">Enter Your Number</label>
                <input 
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Please provide your phone number"
                    }
                  })} 
                  type="text" 
                  className="bg-gray-200 rounded-2xl p-2.5 outline-green-600" 
                />
              </div>

              <div className="input flex flex-col my-3">
                <label htmlFor="password" className="font-normal text-xs my-1.5 text-gray-600">Enter Your Password</label>
                <div className="relative w-full">
                  <input 
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Please provide your password"
                      }
                    })} 
                    type={visible ? "text" : "password"} 
                    className="bg-gray-200 rounded-2xl p-2.5 outline-green-600 w-full" 
                  />
                  <div onClick={()=>setVisible(!visible)} className="abs-y-center right-0 px-3 text-gray-500">
                    {!visible ? <Eye size={20}/> : <EyeOff size={20} />}
                  </div>
                </div>
                <span className="text-xs text-right my-1.5 text-green-700">Forgot Password?</span>
              </div>

              <div className="my-7">
                <button onClick={checkValues} className='btn-md text-sm'>Sign In</button>
              </div>

              <div className="mt-12 text-xs text-center">
                If you are signing in for the first time, make sure your device is with you for verification
              </div>
            </div>
        </form>

    </div> 
  )
}

export default Login