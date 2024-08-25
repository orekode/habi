import axios from "@/calls/axios";
import { safeGet } from "../utils";
import { toast } from "sonner";


export const signin = async ({ number, password }) => {
    try {

      const result = await axios.post('/signin', {
        number,
        password
      });

      if(result.status == 200) {
        if(result.data.token) return result.data;
        return "signup";
      }

      return false;
    }
    catch(e) {
      console.log(e);
      return false;
    }
}

export const createUser = async (data) => {
  try {

    const result = await axios.post('/signup', data);

    return safeGet(result, ["data", "token"], false);
  }
  catch(e) {

    console.log(e);

    let result = safeGet(e, ["response", "data", "errors"], false)
    
    if(result) {
      Object.values(result).forEach( item => toast.error(item[0]))
    }
    else {
      Swal.fire({
        icon: "error",
        title: "System Busy",
        text: "Please try again later"
      });
    }

    return false;
  }
}

export const sendOtp = async (number) => {
    try {

      console.log("i got here")
      const result = await axios.post('/sendOtp', {
        number
      });

      return result.status == 200;

    }
    catch(e) {
      console.log(e);
      return false;
    }
}

export const confirmOtp = async (otp, number) => {
    try {

      const result = await axios.post('/confirmOtp', {
        otp,number
      });

      return result.status == 200;
      
    }
    catch(e) {
      console.log(e);
      return false;
    }
}

export const resetPassword = async (data) => {
  try {

    const result = await axios.post('/auth/reset', {
      ...data
    });

    return result;

  }
  catch(e) {
    console.log(e);
    return e?.response;
  }
}
