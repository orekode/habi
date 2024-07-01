import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/auth.js";
import { createUser } from "@/calls/auth.js";
import { useForm } from "react-hook-form";
import { Loading } from "@/components"
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";

const PersonalInfo = () => {

  const [ load, setLoad ] = useState(false);
  const [ visible, setVisible ] = useState(false);
  const { setData, data: { number } } = useAuth();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      location: "",
      password: "",
    }
  })

  const signup = async (data) => {
    try {

      setLoad(true);

      const result = await createUser({...data, number});
      
      if(result) {
        setData({token: result, loggedIn: true, firstName: data.firstName, lastName: data.lastName, role: number == "0508809987" ? "admin": "user"});
        navigate("/home")

      }

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
        <Loading load={load}/>
        <div className="logo h-[100px] w-[100px]">
            <img src="/images/logo.png" className="img-cover"/>
        </div>

        <form onSubmit={handleSubmit(signup)} className="w-full p-7">
            <div className="inputs">

              <div className="input flex flex-col my-3">
                <label htmlFor="firstName" className="font-normal text-xs my-1.5 text-gray-600">First Name</label>
                <input 
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "Please provide your first name"
                    }
                  })}
                  type="text" 
                  className="bg-gray-200 rounded-2xl p-2.5 outline-green-600" 
                />
              </div>

              <div className="input flex flex-col my-3">
                <label htmlFor="number" className="font-normal text-xs my-1.5 text-gray-600">Last Name</label>
                <input 
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "Please provide your last name"
                    }
                  })}
                  type="text" 
                  className="bg-gray-200 rounded-2xl p-2.5 outline-green-600" 
                />
              </div>

              <div className="input flex flex-col my-3">
                <label htmlFor="number" className="font-normal text-xs my-1.5 text-gray-600">Locations</label>
                <input 
                  {...register("location", {
                    required: {
                      value: true,
                      message: "Please provide your location"
                    }
                  })}
                  type="text" 
                  className="bg-gray-200 rounded-2xl p-2.5 outline-green-600" 
                />
              </div>

              <div className="input flex flex-col my-3">
                <label htmlFor="number" className="font-normal text-xs my-1.5 text-gray-600">Password</label>
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
              </div>

             

              <div className="mt-7">
                <button onClick={checkValues} className='btn-md text-sm'>Complete Registration</button>
              </div>


              <div className="text-sm text-center mt-12">
                Already have an account? <Link to={'/'} className="text-green-500">Click Me</Link> to log in.
              </div>


            </div>
        </form>

    </div> 
  )
}

export default PersonalInfo