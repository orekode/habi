import axios from "axios";

// export let BASE = "http://192.168.43.151:8000/api";
export let BASE  = "https://habiapi.rapidcrewtech.com";

axios.defaults.baseURL  = BASE + "/api";

export default axios;