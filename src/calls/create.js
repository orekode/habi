import { toast } from "sonner";
import axios, { BASE } from "./axios";
import Swal from "sweetalert2";


export const Post = async (target = '', data = {}, token='', headers={}) => {
    console.log(data, token);
    try {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
        axios.defaults.baseURL = BASE;

        await axios.get('/sanctum/csrf-cookie');

        axios.defaults.baseURL  = BASE + "/api";

        const result = await axios.post(target, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                ...headers
            }
        });

        if (result.status == 200) {
            return result.data;
        }

        

        return false;
    }
    catch(e) {
        console.log(e);
        if (e?.response?.status == 422) {
            Object.values(e.response.data.errors ?? {}).map(error => {
                error.map( err => {
                    console.log(err);
                    toast.error(err);
                })
            });
        }
        return false;
    }
}


export const deleteItem = async ({ target, id, token="", callback=()=>{} }) => {
    try {

        let result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (!result.isConfirmed) return false;

        callback(true);
          
        const response = await Post('/delete', {target, id, _method: "DELETE"}, token);

        if(response) Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
        });

        else Swal.fire({
            icon: "error",
            title: "System Busy",
            text: "Please try again later"
        });

        callback(false);

        return response;
    }
    catch (e) {
        console.log(e);
    }
}


let tester = async () => {
    let result = await fetch("http://192.168.42.236:8000/api/user", {
        headers: {
            Authorization: `Bearer ${'1|xbUMV8l43WhpbyTKp25UYBe0si4pkJFzLS4EkyA1f6b519d3'}`,
            Accept: "application/json"
        }
    })

    console.log(result);
}